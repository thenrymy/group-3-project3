# Real Estate Valuation and Purchasing Factors in Perth Metro Area

## Overview
Analyse and compare the factors influencing the valuation and purchase decisions of residential properties in Perth Metropolitan Area.

## Datasets
- Historical Property Prices https://www.kaggle.com/datasets/syuzai/perth-house-prices/data?select=all_perth_310121.csv
- Suburb Localities https://catalogue.data.wa.gov.au/dataset/localities
- LGA Localities https://catalogue.data.wa.gov.au/dataset/local-government-authority-lga-boundaries
- Crime Statistics https://www.police.wa.gov.au/Crime/CrimeStatistics#/
- Council Data https://mycouncil.wa.gov.au/Council/CompareAllCouncil
- School Data https://catalogue.data.wa.gov.au/dataset/western-australian-schools-lists

### Prerequisites

- Python installed on your local machine.
- PostgreSQL database installed.
- Required Python libraries: Pandas.

### Tools and Technologies

- Pandas for data manipulation and transformation.
- PostgreSQL for database management.
- QuickDBD for creating ER diagrams.

### Installation

1. Clone the repository.
2. Install the required Python libraries:
3. Ensure you have PostgreSQL installed and running on your system.

### Running the Scripts

- To perform the data extraction and transformation, use 'ETL_Mini_Project_TRadadiya_ZLiang_YWong_FGirnary.ipynb' and run each cell.
- Load the CSV files into the PostgreSQL database using the provided SQL schema.

### File Structure

```
Crowdfunding_ETL/
├── Resources/
│   ├── crowdfunding.xlsx
│   ├── contacts.xlsx
│   ├── category.csv
│   ├── subcategory.csv
│   ├── campaign.csv
│   └── contacts.csv
├── Images/
│   ├── crowdfunding_db_ERD.png
│   ├── schema_snapshot.png
│   ├── sql_campaign_output1.png
│   ├── sql_campaign_output2.png
│   ├── sql_category_output.png
│   ├── sql_contacts_output.png
│   └── sql_subcategory_output.png
├── ETL_Mini_Project_TRadadiya_ZLiang_YWong_FGirnary.ipynb
├── crowdfunding_db_schema.sql
└── README.md
```
