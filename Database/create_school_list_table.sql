-- Table: public.school_list

-- DROP TABLE IF EXISTS public.school_list;

CREATE TABLE IF NOT EXISTS public.school_list
(
    code integer,
    school_name character varying(100) COLLATE pg_catalog."default",
    street character varying(50) COLLATE pg_catalog."default",
    suburb character varying(30) COLLATE pg_catalog."default",
    state_ character varying(10) COLLATE pg_catalog."default",
    postcode integer,
    postal_street character varying(50) COLLATE pg_catalog."default",
    postal_suburb character varying(30) COLLATE pg_catalog."default",
    postal_state character varying(30) COLLATE pg_catalog."default",
    postal_postcode character varying(30) COLLATE pg_catalog."default",
    latitude numeric,
    longitude numeric,
    phone character varying(30) COLLATE pg_catalog."default",
    education_region character varying(50) COLLATE pg_catalog."default",
    broad_classification character varying(50) COLLATE pg_catalog."default",
    classification_group character varying(50) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.school_list
    OWNER to postgres;