CREATE TABLE IF NOT EXISTS students (
    Sr_No INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(255),
    Mobile_No VARCHAR(15),
    Enrollment_No VARCHAR(255),
    Email VARCHAR(255),
    DOB DATE,
    Gender VARCHAR(10),
    Address TEXT,
    Pin_No VARCHAR(10),
    City VARCHAR(255),
    Category VARCHAR(255),
    Taluka VARCHAR(255),
    District VARCHAR(255),
    ABCID VARCHAR(255),
    AadharCard_No VARCHAR(255),
    Exam_Name VARCHAR(255),
    Passing_Year VARCHAR(255),
    Seat_Number VARCHAR(255),
    School_College VARCHAR(255)
)
