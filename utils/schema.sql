DROP TABLE IF EXISTS administration;
DROP TABLE IF EXISTS tc_doc;
DROP TABLE IF EXISTS first_trial_doc;
DROP TABLE IF EXISTS no_objection_doc;
DROP TABLE IF EXISTS bonafide_doc;
DROP TABLE IF EXISTS students;

CREATE TABLE IF NOT EXISTS students (
    Sr_No             INTEGER PRIMARY KEY AUTOINCREMENT,
    Name              VARCHAR(255),
    Mobile_No         VARCHAR(15),
    Enrollment_No     VARCHAR(255),
    Email             VARCHAR(255),
    DOB               DATE,
    Gender            VARCHAR(10),
    Address           TEXT,
    Pin_No            VARCHAR(10),
    City              VARCHAR(255),
    Category          VARCHAR(255),
    Taluka            VARCHAR(255),
    District          VARCHAR(255),
    ABCID             VARCHAR(255),
    AadharCard_No     VARCHAR(255),
    Exam_Name         VARCHAR(255),
    Passing_Year      VARCHAR(255),
    Seat_Number       VARCHAR(255),
    School_College    VARCHAR(255),
    is_disabled       VARCHAR(5) DEFAULT 'No',
    stream            VARCHAR(50),
    semester          varchar(255),
    main_subject      varchar(255),
    parent_contact_no varchar(255),
    institute_type    varchar(255),
    batch_year        INTEGER,
    inserted_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS administration (
    id          INTEGER      PRIMARY KEY AUTOINCREMENT,
    username    VARCHAR(255) NOT NULL,
    password_   VARCHAR(255) NOT NULL,
    inserted_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO administration (username, password_) VALUES ('admin', 'admin');

CREATE TABLE IF NOT EXISTS first_trial_doc (
    serial_number INTEGER PRIMARY KEY AUTOINCREMENT,
    doc_name      VARCHAR(50) NOT NULL,
    student_id    VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES students(Sr_No) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS tc_doc (
    serial_number INTEGER PRIMARY KEY AUTOINCREMENT,
    doc_name      VARCHAR(255) NOT NULL,
    student_id    VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES students(Sr_No) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS bonafide_doc (
    serial_number INTEGER PRIMARY KEY AUTOINCREMENT,
    doc_name      VARCHAR(255) NOT NULL,
    student_id    VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES students(Sr_No) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS no_objection_doc (
    serial_number INTEGER PRIMARY KEY AUTOINCREMENT,
    doc_name      VARCHAR(255) NOT NULL,
    student_id    VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES students(Sr_No) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS fee_recipt_doc (
    serial_number INTEGER NOT NULL,
    doc_name      VARCHAR(255) NOT NULL,
    student_id    VARCHAR(40) NOT NULL,
    FOREIGN KEY(student_id) REFERENCES students(Sr_No) ON DELETE CASCADE ON UPDATE CASCADE
);
