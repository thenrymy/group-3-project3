// Initialize the map center and zoom level
let perthCoords = [-31.953512, 115.857048];
let mapZoomLevel = 9.5;

// Create a tile layer for the map using OpenStreetMap tiles
let basemap = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

// Initialize the LayerGroups for different map layers
let layers = {
  SUBURB_BOUNDARIES: new L.LayerGroup(),
  PROPERTY_PRICE: new L.LayerGroup(),
  CRIME_RATE: new L.LayerGroup(),
};

// Create the map object and set default layers
let map = L.map("map", {
  center: perthCoords,
  zoom: mapZoomLevel,
  layers: [basemap, layers.SUBURB_BOUNDARIES],
});

// Add the basemap to the map
basemap.addTo(map);

// Custom search box control
let searchBox = L.control({ position: "topright" });

searchBox.onAdd = function (map) {
  let div = L.DomUtil.create("div", "search-box");
  div.innerHTML = `
    <input type="text" id="searchInput" placeholder="Search Suburb" />
    <ul id="suggestions" class="suggestions"></ul>
  `;
  return div;
};

// Add the search box to the map
searchBox.addTo(map);

// Define overlay layers and add them to the layer control
let overlays = {
  "Suburb Boundaries": layers.SUBURB_BOUNDARIES,
  "Average Property Price": layers.PROPERTY_PRICE,
  "Average Crime Rate": layers.CRIME_RATE,
};

// Create a control for the layers and add it to the map
let layerControl = L.control.layers(null, overlays).addTo(map);

// Create a custom home button control
let homeButton = L.control({ position: "topleft" });

homeButton.onAdd = function (map) {
  let div = L.DomUtil.create(
    "div",
    "leaflet-bar leaflet-control leaflet-control-custom"
  );
  div.innerHTML = '<i class="fa-solid fa-house"></i>';
  div.style.backgroundColor = "white";
  div.style.width = "30px";
  div.style.height = "30px";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.cursor = "pointer";
  div.title = "Home";
  div.onclick = function () {
    map.setView(perthCoords, mapZoomLevel);
    // Remove all markers
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  };
  return div;
};

// Add the home button to the map
homeButton.addTo(map);

// Legend control
let legend = L.control({ position: "bottomleft" });

function updateLegend(title, limits, colors) {
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let labels = [];
    let legendInfo =
      "<h1>" +
      title +
      "</h1>" +
      '<div class="label s">' +
      '<div class="min">' +
      limits[0] +
      "</div>" +
      '<div class="max">' +
      limits[limits.length - 1] +
      "</div>" +
      "</div>";
    div.innerHTML = legendInfo;
    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>');
    });
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };
  // Remove the existing legend and add the new one
  if (legend._map) {
    legend.remove();
  }
  legend.addTo(map);
}

map.on("overlayadd", function (eventLayer) {
  if (eventLayer.name === "Suburb Boundaries") {
    let geojson = layers.SUBURB_BOUNDARIES.getLayers()[0];
    let limits = geojson.options.limits.map((limit) =>
      (limit / 1e6).toFixed(0)
    );
    let colors = geojson.options.colors;
    updateLegend("Suburb Size (km²)", limits, colors);
  } else if (eventLayer.name === "Average Property Price") {
    let limits = [
      0, 250000, 500000, 750000, 1000000, 1500000, 2000000, 2500000,
    ];
    let colors = limits.map(getColor);
    updateLegend(
      "Average Property Price",
      limits.map((limit) => "$" + limit.toLocaleString()),
      colors
    );
  } else if (eventLayer.name === "Average Crime Rate") {
    let limits = [0, 600, 1200, 1800, 2400, 3000, 3600, 4200];
    let colors = limits.map(getColor2);
    updateLegend(
      "Average Crime Rate",
      limits.map((limit) => limit.toLocaleString()),
      colors
    );
  }
});

map.on("overlayremove", function (eventLayer) {
  if (
    eventLayer.name === "Suburb Boundaries" ||
    eventLayer.name === "Average Property Price" ||
    eventLayer.name === "Average Crime Rate"
  ) {
    map.removeControl(legend);
  }
});

// Fetch GeoJSON data for suburb boundaries
let geoData =
  "https://public-services.slip.wa.gov.au/public/rest/services/SLIP_Public_Services/Boundaries/MapServer/16/query?where=1%3D1&outFields=*&f=geojson";

d3.json(geoData).then(function (data) {
  // Filter the data to include only specific suburbs
  data.features = data.features.filter((feature) => {
    return metroSuburbs.includes(feature.properties.name);
  });
  // Create a choropleth layer for suburb boundaries
  let geojson = L.choropleth(data, {
    valueProperty: "land_area",
    scale: ["#deebf7", "#3182bd"],
    steps: 10,
    mode: "q",
    style: {
      color: "#08519c",
      weight: 1,
      fillOpacity: 0.8,
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "<strong>" +
          feature.properties.name +
          "</strong><br>Postcode: " +
          feature.properties.postcode +
          "<br />Area: " +
          (feature.properties.land_area / 1e6).toFixed(2) +
          " km&#178;"
      );
    },
  }).addTo(layers.SUBURB_BOUNDARIES);
  // Set up the initial legend for suburb boundaries
  let limits = geojson.options.limits.map((limit) => (limit / 1e6).toFixed(0));
  let colors = geojson.options.colors;
  updateLegend("Suburb Size (km²)", limits, colors);
});

// Fetch property price data and create the corresponding layer
let priceDataUrl =
  "https://raw.githubusercontent.com/thenrymy/real-estate-analysis/main/Resources/all_perth_310121.csv";

let propertyMarkers = L.layerGroup().addTo(map);

Papa.parse(priceDataUrl, {
  download: true,
  header: true,
  complete: function (results) {
    let priceData = results.data;
    console.log("Price data loaded:", priceData); // Debugging statement

    // Ensure all records have a SUBURB property
    let suburbNames = [
      ...new Set(
        priceData.map((d) => (d.SUBURB ? d.SUBURB.trim() : "")).filter(Boolean)
      ),
    ];
    console.log("Suburb names:", suburbNames); // Debugging statement
    suburbNames.sort();

    let searchInput = document.getElementById("searchInput");
    let suggestions = document.getElementById("suggestions");

    searchInput.addEventListener("input", function () {
      console.log("Input event triggered"); // Debugging statement
      let input = this.value.toLowerCase();
      suggestions.innerHTML = "";
      if (input.length > 0) {
        let filteredSuburbs = suburbNames.filter((suburb) =>
          suburb.toLowerCase().includes(input)
        );
        console.log("Filtered suburbs:", filteredSuburbs); // Debugging statement
        filteredSuburbs.forEach((suburb) => {
          let li = document.createElement("li");
          li.textContent = suburb;
          li.addEventListener("click", function () {
            console.log("Suburb selected: " + suburb); // Debugging statement
            searchInput.value = suburb;
            suggestions.innerHTML = "";
            zoomToSuburb(suburb, priceData);
          });
          suggestions.appendChild(li);
        });
      }
    });

    let pricesLayer = L.geoJSON(null, {
      style: function (feature) {
        let price = getPriceForSuburb(feature.properties.name, priceData);
        return {
          fillColor: getColor(price),
          weight: 1,
          opacity: 1,
          color: "white",
          fillOpacity: 0.8,
        };
      },
      onEachFeature: function (feature, layer) {
        let price = getPriceForSuburb(feature.properties.name, priceData);
        layer.bindPopup(
          "<strong>" +
            feature.properties.name +
            "</strong><br>Average Price: $" +
            price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      },
    });

    d3.json(geoData).then(function (data) {
      data.features = data.features.filter((feature) => {
        return metroSuburbs.includes(feature.properties.name);
      });

      pricesLayer.addData(data).addTo(layers.PROPERTY_PRICE);
    });
  },
});

// Fetch crime data and create the corresponding layer
let crimeDataUrl =
  "https://raw.githubusercontent.com/thenrymy/real-estate-analysis/b20ef5b09af0318dc6095d4dc71d07026661b9ea/Resources/suburb_crime/crime_mean.csv";

Papa.parse(crimeDataUrl, {
  download: true,
  header: true,
  complete: function (results) {
    let crimeData = results.data;
    console.log("Crime data loaded:", crimeData); // Debugging statement

    let crimeLayer = L.geoJSON(null, {
      style: function (feature) {
        let crime = getCrimeForSuburb(feature.properties.name, crimeData);
        return {
          fillColor: getColor2(crime),
          weight: 1,
          opacity: 1,
          color: "white",
          fillOpacity: 0.8,
        };
      },
      onEachFeature: function (feature, layer) {
        let crime = getCrimeForSuburb(feature.properties.name, crimeData);
        layer.bindPopup(
          "<strong>" +
            feature.properties.name +
            "</strong><br>Average crime: " +
            crime.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      },
    });

    d3.json(geoData).then(function (data) {
      data.features = data.features.filter((feature) => {
        return metroSuburbs.includes(feature.properties.name);
      });

      crimeLayer.addData(data).addTo(layers.CRIME_RATE);
    });
  },
});

// Helper function to zoom to a suburb and add property markers
function zoomToSuburb(suburb, data) {
  // Remove existing markers
  propertyMarkers.clearLayers();

  let suburbData = data.filter((d) => d.SUBURB && d.SUBURB.trim() === suburb);
  if (suburbData.length > 0) {
    let bounds = new L.LatLngBounds();
    suburbData.forEach((d) => {
      let lat = parseFloat(d.LATITUDE);
      let lng = parseFloat(d.LONGITUDE);
      if (!isNaN(lat) && !isNaN(lng)) {
        let marker = L.marker([lat, lng]);
        let popupContent = `
          <strong>Address:</strong> ${d.ADDRESS}<br>
          <strong>Price:</strong> $${parseFloat(d.PRICE).toLocaleString()}<br>
          <strong>Bedrooms:</strong> ${d.BEDROOMS}<br>
          <strong>Bathrooms:</strong> ${d.BATHROOMS}<br>
          <strong>Garage:</strong> ${d.GARAGE}<br>
          <strong>Land Area:</strong> ${d.LAND_AREA} m²<br>
          <strong>Floor Area:</strong> ${d.FLOOR_AREA} m²<br>
          <strong>Build Year:</strong> ${d.BUILD_YEAR}<br>
          <strong>Distance to CBD:</strong> ${d.CBD_DIST} km<br>
          <strong>Nearest Train Station:</strong> ${d.NEAREST_STN}<br>
          <strong>Date Sold:</strong> ${d.DATE_SOLD}<br>
          <strong>Nearest School:</strong> ${d.NEAREST_SCH}<br>
          <strong>Nearest School Rank:</strong> ${d.NEAREST_SCH_RANK}
        `;
        marker.bindPopup(popupContent);
        marker.addTo(propertyMarkers);
        bounds.extend(marker.getLatLng());
      }
    });
    map.fitBounds(bounds);
  }
}

// Helper function to get the average price for a suburb
function getPriceForSuburb(suburb, data) {
  if (!suburb) return 0;
  let suburbData = data.filter(
    (d) =>
      d.SUBURB && d.SUBURB.trim().toLowerCase() === suburb.trim().toLowerCase()
  );
  if (suburbData.length === 0) {
    return 0;
  }
  let total = suburbData.reduce((sum, d) => sum + parseFloat(d.PRICE || 0), 0);
  let average = total / suburbData.length;
  return average;
}

// Helper function to get the color based on price
function getColor(price) {
  return price > 2500000
    ? "#4B000F" // Dark Maroon
    : price > 2000000
    ? "#7F000F" // Dark Red
    : price > 1500000
    ? "#B22222" // Firebrick
    : price > 1000000
    ? "#FF4500" // Orange Red
    : price > 750000
    ? "#FF8C00" // Dark Orange
    : price > 500000
    ? "#FFD700" // Gold
    : price > 250000
    ? "#ADFF2F" // Green Yellow
    : "#7FFF00"; // Chartreuse
}

// Helper function to get the mean crime rate for a suburb
function getCrimeForSuburb(suburb, data) {
  if (!suburb) return 0;

  let suburbData = data.find(
    (d) =>
      d.suburb && d.suburb.trim().toLowerCase() === suburb.trim().toLowerCase()
  );

  if (!suburbData) {
    return 0;
  }

  return parseFloat(suburbData.mean_crime_rate || 0);
}

// Helper function to get the color based on crime
function getColor2(crime) {
  return crime > 4200
    ? "#4B000F" // Dark Maroon
    : crime > 3600
    ? "#7F000F" // Dark Red
    : crime > 3000
    ? "#B22222" // Firebrick
    : crime > 2400
    ? "#FF4500" // Orange Red
    : crime > 1800
    ? "#FF8C00" // Dark Orange
    : crime > 1200
    ? "#FFD700" // Gold
    : crime > 600
    ? "#ADFF2F" // Green Yellow
    : "#7FFF00"; // Chartreuse
}
