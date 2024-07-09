# Real Estate Valuation and Purchasing Factors in Perth Metro Area

## Overview
Analyse and compare the factors influencing the valuation and purchase decisions of residential properties in Perth Metropolitan Area.

### File Structure

```
real-estate-analysis/
├── Images/
│   ├── DatabaseInstall.png
│   └── DatabaseTables.png
├── Resources/
│   ├── Mapping/
│   │   └── Localities_LGATE_234_WA_GDA2020_Public.geojson
│   ├── suburb_crime/
│   │   └── combined_crime_statistics.csv
│   ├── all_perth_310121.csv
│   ├── SchoolsListExcel0880.xlsx
│   └── suburb.xlsx
├── crime_statistis_scrape.ipynb
├── index.html
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

### Prerequisites

- Python installed on your local machine.
- PostgreSQL database installed.
- Required Python libraries: selenium, time, pandas, numpy

### Tools and Technologies

- Pandas for data manipulation and transformation.
- PostgreSQL for database management.
- Selenium for web scraping
- Time for timer delay
- Numpy for 0 to NaN convertion

### Installation

1. Clone the repository.
2. Install the required Python libraries.
3. Ensure you have PostgreSQL installed and running on your system.
   - Create a database called **real-estate_db**.
   - Right click on the database just created and choose restore.
   - Select the backup file as shown below and click on restore.

     ![guide 1](https://github.com/thenrymy/real-estate-analysis/blob/da3d92d3a32e36723fd2cdb9148ab193467f34d3/Images/DatabaseInstall.png)
   - Check the 3 tables exit and there are data inside.

     ![guide 2](https://github.com/thenrymy/real-estate-analysis/blob/58eb8bde239578fd8e573aeda7c03030c8884f88/Images/DatabaseTables.png)

### Running the Scripts

- To perform the data extraction and transformation for Perth Crime Statistics, use 'crime_statistics_scrape.ipynb' and run.
- Load the CSV files into the PostgreSQL database using the provided SQL schema.

## Datasets
- Historical Property Prices https://www.kaggle.com/datasets/syuzai/perth-house-prices/data?select=all_perth_310121.csv
- Suburb Localities https://catalogue.data.wa.gov.au/dataset/localities
- LGA Localities https://catalogue.data.wa.gov.au/dataset/local-government-authority-lga-boundaries
- Crime Statistics https://www.police.wa.gov.au/Crime/CrimeStatistics#/
- Council Data https://mycouncil.wa.gov.au/Council/CompareAllCouncil
- School Data https://catalogue.data.wa.gov.au/dataset/western-australian-schools-lists
