# Perth Metro Area Real Estate Analysis

## Overview
Analyse and compare the factors influencing the valuation and purchase decisions of residential properties in Perth Metropolitan Area.

## File Structure

```
real-estate-analysis/
├── Database/
│   ├── cleanup_perth_properties_table.sql
│   ├── create_crime_statistics_table.sql
│   ├── create_perth_properties_table.sql
│   ├── create_school_list_table.sql
│   └── real_estate_db_backup.sql
├── Images/
│   ├── DatabaseInstall.png
│   ├── DatabaseTables.png
│   ├── Distance_to_nearest_station_per_house_with_regression.png
│   ├── house_vs_school_rank_barchart.png
│   ├── price_vs_CBD.png
│   ├── price_vs_crime_rate.png
│   ├── price_vs_distance_train.png
│   └── price_vs_school_rank_scatterplot_with_regression.png
├── Resources/
│   ├── Mapping/
│   │   └── Localities_LGATE_234_WA_GDA2020_Public.geojson
│   ├── suburb_crime/
│   │   ├── combined_crime_statistics.csv
│   │   └──crime_mean.csv
│   ├── all_perth_310121.csv
│   ├── SchoolsListExcel0880_1.csv
│   ├── SchoolsListExcel0880.csv
│   ├── SchoolsListExcel0880.xlsx
│   ├── schoolRank.csv
│   └── suburb.xlsx
├── Static/
│   ├── Data/
│   │   └── suburbs.txt
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── choropleth.js
│       ├── logic.js
│       └── metroSuburbs.js
├── Realestate_data_analysis.ipynb
├── crime_statistis_scrape.ipynb
├── extract_data_from_db.ipynb
├── index.html
├── mean_property_prices.html
└── README.md
```
## ****Database****

Data is stored in and extracted from PostgreSQL.

**Data Extraction:**
 - Data is extracted from csv and Excel files downloaded from freely available sources from the web.  Where CSV or Excel was not available web scraping is done using python. 
 - Extracted data undergoes initial review and cleansing to remove irrelevant data.

**Data Transformation:**
 - Extracted data undergoes cleansing and transformation to remove duplicates, correct errors and eliminate redundant data.
 - Transformation rules are applied using SQL queries.
 
**Data Loading:**
 - A PostgreSQL database with relevant tables to house the data is built.
 - Transformed data is imported into the PostgreSQL database tables.
 - SQL Script required to validate imported data and update to resolve data types and null issues. 
 
**Connection to Python:**
 - psycopg2-binary package is installed to allow using SqlAlchemy to create connection between PostgreSQL and Python. 
 - This allows the tables to be read and stored in DataFrames so that visualisation can be created with Python.

## Prerequisites

- Python installed on your local machine.
- PostgreSQL database installed.
- Required Python libraries: selenium, time, pandas, numpy

## Tools and Technologies

- Pandas for data manipulation and transformation.
- PostgreSQL for database management.
- Selenium for web scraping
- Time for timer delay
- Numpy for 0 to NaN convertion

## Installation

1. Clone the repository.
2. Install the required Python libraries.
3. Ensure you have PostgreSQL installed and running on your system.
   - Create a database called ```real-estate_db```.
   - Right click on the database just created and choose restore.
   - Select the backup file ```real_estate_db_backup.sql``` as shown below and click on restore.

     ![guide 1](https://github.com/thenrymy/real-estate-analysis/blob/da3d92d3a32e36723fd2cdb9148ab193467f34d3/Images/DatabaseInstall.png)
   - Verify the 3 tables ```crime_statistics```, ```perth_properties```, ```school_list``` are successfully imported.

     ![guide 2](https://github.com/thenrymy/real-estate-analysis/blob/58eb8bde239578fd8e573aeda7c03030c8884f88/Images/DatabaseTables.png)

## Running the Scripts

- To perform the data extraction and transformation for Perth Crime Statistics, use 'crime_statistics_scrape.ipynb' and run.
- Load the CSV files into the PostgreSQL database using the provided SQL schema.
- Extract_data_from_db.ipynb - This Jupyter Notebook is created to validate and understand how we can do live interrogation of PostgresSQL database from Python using the psycopg2-binary package together with SQLAlchemy. ​The psycopg2-binary driver is installed for this connection. ​This allows the tables to be read using SQL statements and stored in DataFrames. The code generated is used in the Realestate_data_analysis.ipynb for analysis.
- The index.html loads the scripts from `Static` folder to output the webpage.

## Datasets
- Historical Property Prices https://www.kaggle.com/datasets/syuzai/perth-house-prices/data?select=all_perth_310121.csv
- Suburb Localities https://catalogue.data.wa.gov.au/dataset/localities
- LGA Localities https://catalogue.data.wa.gov.au/dataset/local-government-authority-lga-boundaries
- Crime Statistics https://www.police.wa.gov.au/Crime/CrimeStatistics#/
- Council Data https://mycouncil.wa.gov.au/Council/CompareAllCouncil
- School Data https://catalogue.data.wa.gov.au/dataset/western-australian-schools-lists
