# Crowdfunding_ETL (EXAMPLE)

## Data Extraction, Transformation, and Loading (database)

This project focuses on transforming crowdfunding data from Excel sheets into a structured PostgreSQL database. The transformation involves creating DataFrames for categories, subcategories, campaigns, and contacts, which are then exported to CSV files and loaded into a PostgreSQL database.

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
