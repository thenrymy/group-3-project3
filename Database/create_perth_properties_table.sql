-- Table: public.perth_properties

-- DROP TABLE IF EXISTS public.perth_properties;

CREATE TABLE IF NOT EXISTS public.perth_properties
(
    address character varying(30) COLLATE pg_catalog."default",
    suburb character varying(30) COLLATE pg_catalog."default",
    price integer,
    bedroom integer,
    bathroom integer,
    garage integer,
    land_area integer,
    floor_area integer,
    build_year integer,
    cbd_distance integer,
    nearest_station character varying(30) COLLATE pg_catalog."default",
    nearest_station_dist numeric,
    date_sold character varying(30) COLLATE pg_catalog."default",
    postcode integer,
    latitude numeric,
    longitude numeric,
    nearest_school character varying(100) COLLATE pg_catalog."default",
    nearest_school_dist numeric,
    nearest_school_rank integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.perth_properties
    OWNER to postgres;