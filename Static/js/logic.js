// Zoom in on Perth Metro Area
let perthCoords = [-31.953512, 115.857048];
let mapZoomLevel = 9.5;

// Setting up the tile layer
let basemap = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

// Create Map Object
let map = L.map("map", {
  center: perthCoords, // Centered on Perth
  zoom: mapZoomLevel,
});

// Adding tile layer to map
basemap.addTo(map);

// Fetch GeoJSON data locally
// to execute this on a local server, please use 'python -m http.server' in the terminal
// let geoData =
//   "../../Resources/Mapping/Localities_LGATE_234_WA_GDA2020_Public.geojson";

// URL to fetch GeoJSON data
let geoData =
  "https://public-services.slip.wa.gov.au/public/rest/services/SLIP_Public_Services/Boundaries/MapServer/16/query?where=1%3D1&outFields=*&f=geojson";

// Fetch data
fetch(geoData)
  .then((response) => response.json())
  .then(function (data) {
    // Filter the features to include only those in the specific suburbs
    data.features = data.features.filter((feature) => {
      return metroSuburbs.includes(feature.properties.name);
    });

    // Create a new choropleth layer.
    let geojson = L.choropleth(data, {
      // Define which property in the features to use.
      valueProperty: "land_area",

      // Set the colour scale.
      // scale: ["#ffffb2", "#b10026"],
      scale: ["#deebf7", "#3182bd"],

      // The number of breaks in the step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border colour
        color: "#08519c", // Darker blue
        weight: 1,
        fillOpacity: 0.8,
      },

      // Binding a popup to each layer
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<strong>" +
            feature.properties.name +
            "</strong><br /><br />Postcode: " +
            feature.properties.postcode +
            "<br /><br />Area: " +
            (feature.properties.land_area / 1e6).toFixed(2) +
            " km&#178;"
        );
      },
    }).addTo(map);

    // Set up the legend.
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      let limits = geojson.options.limits;
      let colors = geojson.options.colors;
      let labels = [];

      // Add the minimum and maximum.
      let legendInfo =
        "<h1>Perth Metro Area (km&#178)</h1>" +
        '<div class="label s">' +
        '<div class="min">' +
        (limits[0] / 1e6).toFixed(0) +
        "</div>" +
        '<div class="max">' +
        (limits[limits.length - 1] / 1e6).toFixed(0) +
        "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function (limit, index) {
        labels.push(
          '<li style="background-color: ' + colors[index] + '"></li>'
        );
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

    // Adding the legend to the map
    legend.addTo(map);
  });
