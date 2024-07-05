--Script to replace all NULL with a value
SELECT * FROM perth_properties
WHERE BUILD_YEAR = 'NULL';

--Replace NULL values with 0
UPDATE perth_properties
SET BUILD_YEAR = '0'
WHERE BUILD_YEAR = 'NULL';

--Change data type from VARCHAR to INT
ALTER TABLE perth_properties
ALTER COLUMN BUILD_YEAR TYPE INT USING BUILD_YEAR::INT;








--Convert columns of VARCHAR to INT
--Create a PK column