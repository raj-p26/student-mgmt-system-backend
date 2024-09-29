DROP TABLE IF EXISTS student_records;
DROP TABLE IF EXISTS administration;
DROP TABLE IF EXISTS tc_docs;

CREATE TABLE IF NOT EXISTS student_records (
    id                             VARCHAR(40)  NOT NULL PRIMARY KEY,  -- UUID of the Record
    enrollment_no                  VARCHAR(30),                        -- enrollment number of the student
    abc_id                         VARCHAR(12),                        -- ABC ID of the student
    gr_no                          VARCHAR(30),                        -- GR number of the student
    udisk_no                       VARCHAR(30),
    aadhar_number                  VARCHAR(20)  NOT NULL,              -- aadhar number of the student
    stream                         VARCHAR(150)  NOT NULL,             -- stream in which student wants to take admission
    semester                       INT(3),                             -- semester
    main_course                    VARCHAR(20),                        -- main course selected by student
    first_secondary_subject        VARCHAR(20),                        -- first optional course selected by student
    tertiary_secondary_subject     VARCHAR(20),                        -- second optional course selected by student
    bonafide_doc                   TEXT,                               -- path of the document
    tc_doc                         TEXT,                               -- path of the document
    no_objection_doc               TEXT,                               -- path of the document
    first_trial_doc                TEXT,                               -- path of the document
    student_gender                 VARCHAR(10)  NOT NULL,              -- gender of the student
    email                          VARCHAR(255) NOT NULL,              -- email of the student
    whatsapp_no                    VARCHAR(15)  NOT NULL,              -- you know that already
    fee_recipt_print               TEXT,                               -- path of the document
    surname                        VARCHAR(50),
    name                           VARCHAR(50),
    fathername                     VARCHAR(50),
    father_name                    VARCHAR(50),
    mother_name                    VARCHAR(50),
    address                        TEXT        ,                       -- address of the student
    city                           VARCHAR(40),                        -- city of the student
    district                       VARCHAR(40),                        -- district of the student
    pincode                        VARCHAR(6),                         -- pincode of the city
    birth_date                     DATE,                               -- birth date of the student
    birth_place                    VARCHAR(40),                        -- birth place of the student
    caste                          VARCHAR(30),                        -- caste of the student
    parent_contact_no              VARCHAR(15),                        -- parent's contact number
    last_organization_studied_from VARCHAR(255),                       -- Name of the organization from where the student last studied
    last_studied_year              INT(4),                             -- Year when the student last studied in above mentioned last organization
    elective_course                VARCHAR(40),                        -- Optional course selected by the student
    student_image                  VARCHAR(255),                       -- Image of the student
    inserted_at                    TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when record was added
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS administration (
    id          INT(3)       PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(255) NOT NULL,
    password_   VARCHAR(255) NOT NULL,
    inserted_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE InnoDB;

INSERT INTO administration (username, password_) VALUE ('admin', 'admin');

CREATE TABLE IF NOT EXISTS first_trial_doc (
    serial_number INT(3) PRIMARY KEY AUTO_INCREMENT,
    doc_name VARCHAR(50) NOT NULL,
    student_id VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES student_records(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS tc_doc (
    serial_number INT(3) PRIMARY KEY AUTO_INCREMENT,
    doc_name VARCHAR(50) NOT NULL,
    student_id VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES student_records(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS bonafide_doc (
    serial_number INT(3) PRIMARY KEY AUTO_INCREMENT,
    doc_name VARCHAR(50) NOT NULL,
    student_id VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES student_records(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS no_objection_doc (
    serial_number INT(3) PRIMARY KEY AUTO_INCREMENT,
    doc_name VARCHAR(50) NOT NULL,
    student_id VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES student_records(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE InnoDB;
