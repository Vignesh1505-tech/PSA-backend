
select * from "tbl_user";

select * from "tbl_bus_schedule";

select * from "tbl_train_schedule"; 

select * from "tbl_cab_details";


-- CREATE TABLE tbl_bus_schedule (
--     bus_id SERIAL PRIMARY KEY, -- Auto-incremented unique identifier
--     bus_name VARCHAR(100) NOT NULL, -- Name of the bus
--     from_city VARCHAR(100) NOT NULL, -- Departure city
--     to_city VARCHAR(100) NOT NULL, -- Destination city
--     departure_time VARCHAR(100) NOT NULL, -- Time of departure
--     route TEXT NOT NULL, -- Route description
--     schedule TEXT  -- Schedule details (e.g., weekdays, weekends)
-- );

-- CREATE TABLE tbl_train_schedule (
--     train_no VARCHAR(10) NOT NULL,
--     from_city VARCHAR(255) NOT NULL,
--     to_city VARCHAR(255) NOT NULL,
--     departure_time VARCHAR(100) NOT NULL,
--     route TEXT NOT NULL
-- );


-- CREATE TABLE tbl_cab_details (
--     cab_id SERIAL PRIMARY KEY,  -- Auto-incremented unique ID for each cab
--     driver_name VARCHAR(100),   -- Name of the driver
--     car_name VARCHAR(100),      -- Name/model of the car
--     car_number VARCHAR(50),     -- Car registration number
--     driver_license VARCHAR(50), -- License number of the driver
--     from_city VARCHAR(100),     -- City of departure
--     to_city VARCHAR(100),       -- Destination city
--     fair VARCHAR(100),        -- Fair/Price for the ride
--     timing VARCHAR(50),                -- Timing of the ride (e.g., departure time)
--     seat_available TEXT          -- Number of seats available
-- );



-- CREATE TABLE tbl_user (
--     userid SERIAL PRIMARY KEY,  -- Auto-incrementing primary key for user ID
--     mobile_no VARCHAR(15),      -- Column for mobile number (adjust length as needed)
--     otp TEXT,             -- Column for OTP (adjust length as needed)
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Timestamp with time zone, default to current time
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- Timestamp with time zone, default to current time
-- );

-- create table tbl_booking(
-- 	booking_id SERIAL PRIMARY KEY,
-- 	cab_id INT REFERENCES tbl_cab_details(cab_id),
-- 	userid INT REFERENCES tbl_user(userid),
-- 	booked BOOLEAN DEFAULT FALSE,
-- 	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
-- 	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- )


CREATE TABLE tbl_bus_schedule (
    bus_id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incremented unique identifier
    bus_name VARCHAR(100) NOT NULL,        -- Name of the bus
    from_city VARCHAR(100) NOT NULL,       -- Departure city
    to_city VARCHAR(100) NOT NULL,         -- Destination city
    departure_time VARCHAR(100) NOT NULL,  -- Time of departure
    route TEXT NOT NULL,                   -- Route description
    schedule TEXT                          -- Schedule details (e.g., weekdays, weekends)
);



CREATE TABLE tbl_train_schedule (
    train_no VARCHAR(10) NOT NULL,
    from_city VARCHAR(255) NOT NULL,
    to_city VARCHAR(255) NOT NULL,
    departure_time VARCHAR(100) NOT NULL,
    route TEXT NOT NULL
);

CREATE TABLE tbl_cab_details (
    cab_id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incremented unique ID for each cab
    driver_name VARCHAR(100),               -- Name of the driver
    car_name VARCHAR(100),                  -- Name/model of the car
    car_number VARCHAR(50),                 -- Car registration number
    driver_license VARCHAR(50),             -- License number of the driver
    from_city VARCHAR(100),                 -- City of departure
    to_city VARCHAR(100),                   -- Destination city
    fair VARCHAR(100),                      -- Fair/Price for the ride
    timing VARCHAR(50),                     -- Timing of the ride (e.g., departure time)
    seat_available TEXT                     -- Number of seats available
);

CREATE TABLE tbl_user (
    userid INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incrementing primary key for user ID
    mobile_no VARCHAR(15),                  -- Column for mobile number (adjust length as needed)
    otp TEXT,                               -- Column for OTP (adjust length as needed)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp without time zone
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Timestamp without time zone
);

CREATE TABLE tbl_booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incremented unique ID for the booking
    cab_id INT,                                -- Foreign key reference to tbl_cab_details
    userid INT,                                -- Foreign key reference to tbl_user
    booked BOOLEAN DEFAULT FALSE,              -- Whether the booking is confirmed or not
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp without time zone
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Timestamp without time zone
    FOREIGN KEY (cab_id) REFERENCES tbl_cab_details(cab_id) ON DELETE CASCADE,  -- Foreign key constraint for cab_id
    FOREIGN KEY (userid) REFERENCES tbl_user(userid) ON DELETE CASCADE           -- Foreign key constraint for userid
);
