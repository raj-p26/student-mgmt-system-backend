CREATE TABLE IF NOT EXISTS student_records (
    id                             VARCHAR(40)  NOT NULL PRIMARY KEY,              -- UUID of the Record
    enrollment_no                  VARCHAR(30),                                    -- enrollment number of the student
    abc_id                         VARCHAR(12),                                    -- ABC ID of the student
    gr_no                          VARCHAR(30),                                    -- GR number of the student
    aadhar_number                  VARCHAR(20)  NOT NULL,                          -- aadhar number of the student
    stream                         VARCHAR(20)  NOT NULL,                          -- stream in which student wants to take admission
    semester                       INT(3),                                         -- semester
    main_course                    VARCHAR(20),                                    -- main course selected by student
    first_secondary_subject        VARCHAR(20),                                    -- first optional course selected by student
    tertiary_secondary_subject     VARCHAR(20),                                    -- second optional course selected by student
    bonafide_doc                   TEXT         NOT NULL,                          -- path of the document
    tc_doc                         TEXT         NOT NULL,                          -- path of the document
    no_objection_doc               TEXT         NOT NULL,                          -- path of the document
    first_trial_doc                TEXT         NOT NULL,                          -- path of the document
    student_gender                 VARCHAR(10)  NOT NULL,                          -- gender of the student
    email                          VARCHAR(255) NOT NULL,                          -- email of the student
    contact_no                     VARCHAR(15)  NOT NULL,                          -- contact number of the student
    whatsapp_no                    VARCHAR(15)  NOT NULL,                          -- you know that already
    fee_recipt_print               TEXT         NOT NULL,                          -- path of the document
    full_name                      VARCHAR(255) NOT NULL,                          -- Full name of the student including surname and father name
    address                        TEXT         NOT NULL,                          -- address of the student
    city                           VARCHAR(40)  NOT NULL,                          -- city of the student
    district                       VARCHAR(40)  NOT NULL,                          -- district of the student
    pincode                        VARCHAR(6)   NOT NULL,                          -- pincode of the city
    birth_date                     DATE         NOT NULL,                          -- birth date of the student
    birth_place                    VARCHAR(40)  NOT NULL,                          -- birth place of the student
    caste                          VARCHAR(30)  NOT NULL,                          -- caste of the student
    full_name_of_parent            VARCHAR(255) NOT NULL,                          -- full name of the student's parent
    parent_contact_no              VARCHAR(15)  NOT NULL,                          -- parent's contact number
    last_organization_studied_from VARCHAR(255) NOT NULL,                          -- Name of the organization from where the student last studied
    last_studied_year              INT(4)       NOT NULL,                          -- Year when the student last studied in above mentioned last organization
    elective_course                VARCHAR(40)  NOT NULL,                          -- Optional course selected by the student
    student_image                  VARCHAR(255) NOT NULL,                          -- Image of the student
    inserted_at                    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP -- Timestamp when record was added
);
