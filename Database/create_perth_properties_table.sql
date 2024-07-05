DROP TABLE IF EXISTS perth_properties;

CREATE TABLE perth_properties (
	address VARCHAR,
	suburb VARCHAR,
	price INT,
	bedroom VARCHAR,
	bathroom VARCHAR,
	garage VARCHAR, 
	land_area INT,
	floor_area INT,
	build_year VARCHAR,
	cbd_distance INT,
	nearest_station VARCHAR,
	nearest_station_dist DEC,
	date_sold VARCHAR,
	postcode INT,
	latitude DEC,
	longitude DEC,
	nearest_school VARCHAR,
	nearest_school_dist DEC, 
	nearest_school_rank INT 
);

SELECT * FROM perth_properties;
	