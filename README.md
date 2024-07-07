# Real Estate Valuation and Purchasing Factors in Perth Metro Area

## Overview
Analyse and compare the factors influencing the valuation and purchase decisions of residential properties in Perth Metropolitan Area.

### File Structure

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
│   └── DatabaseTables.png
├── Resources/
│   ├── Mapping/
│   │   └── Localities_LGATE_234_WA_GDA2020_Public.geojson
│   ├── suburb_crime/
│   │   └── combined_crime_statistics.csv
│   ├── all_perth_310121.csv
│   ├── SchoolsListExcel0880_1.csv
│   ├── SchoolsListExcel0880.csv
│   ├── SchoolsListExcel0880.xlsx
│   └── suburb.xlsx
├── crime_statistis_scrape.ipynb
├── extract_data_from_db.ipynb
├── index.html
└── README.md
```

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
   - Create a database called ```real-estate_db```.
   - Right click on the database just created and choose restore.
   - Select the backup file ```real_estate_db_backup.sql``` as shown below and click on restore.

     ![guide 1](https://github.com/thenrymy/real-estate-analysis/blob/da3d92d3a32e36723fd2cdb9148ab193467f34d3/Images/DatabaseInstall.png)
   - Verify the 3 tables ```crime_statistics```, ```perth_properties```, ```school_list``` are successfully imported.

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
