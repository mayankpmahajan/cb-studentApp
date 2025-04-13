-- =====================
-- CREATE TABLES
-- if needed to setup db manually
-- =====================

CREATE TABLE institute (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE center (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    institute_id INT NOT NULL REFERENCES institute(id)
);

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE center_course (
    id SERIAL PRIMARY KEY,
    center_id INT NOT NULL REFERENCES center(id),
    course_id INT NOT NULL REFERENCES course(id)
);

CREATE TABLE batch (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    center_course_id INT NOT NULL REFERENCES center_course(id)
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    roll_number VARCHAR(100) UNIQUE NOT NULL,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE enrollment (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student(id),
    center_course_id INT NOT NULL REFERENCES center_course(id),
    batch_id INT NOT NULL REFERENCES batch(id),
    enrollment_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE resource (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    resource_type VARCHAR(50) NOT NULL,
    course_id INT NOT NULL REFERENCES course(id)
);

CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    resource_id INT NOT NULL UNIQUE REFERENCES resource(id),
    duration INT NOT NULL,
    max_marks INT NOT NULL,
    scheduled_time TIMESTAMP NOT NULL
);

CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    resource_id INT NOT NULL UNIQUE REFERENCES resource(id),
    youtube_id VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    instructor VARCHAR(255) NOT NULL
);
