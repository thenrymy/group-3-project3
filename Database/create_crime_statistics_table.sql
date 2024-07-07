-- Table: public.crime_statistics

-- DROP TABLE IF EXISTS public.crime_statistics;

CREATE TABLE IF NOT EXISTS public.crime_statistics
(
    suburb character varying(30) COLLATE pg_catalog."default",
    year_2015 integer,
    year_2016 integer,
    year_2017 integer,
    year_2018 integer,
    year_2019 integer,
    year_2020 integer,
    year_2021 integer,
    year_2022 integer,
    year_2023 integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.crime_statistics
    OWNER to postgres;