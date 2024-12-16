const pool = require("../config/db")


// API to post Train details
// exports.addTrain = async (req, res) => {
//     const  { train_data }  = req.body;
//     console.log("train_data.length",train_data.length)
//     // console.log("busData",bus_data)

//     if (!Array.isArray(train_data) || train_data.length === 0) {
//         return res.status(400).json({ success: false, message: 'Invalid input format' });
//     }
//     for (const { train_no, from_city, to_city, departure_time,route } of train_data) {
//         if (!train_no || !from_city || !to_city || !departure_time || !route ) {
//             return res.status(400).json({ success: false, message: 'All fields are required for each train entry' });
//         }
//         try {
//             const result = await pool.query(
//                 `INSERT INTO tbl_train_schedule (train_no, from_city, to_city, departure_time,route)
//                  VALUES ($1, $2, $3, $4,$5) RETURNING *`,
//                 [train_no, from_city, to_city, departure_time,route]
//             );
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ success: false, message: 'Error adding train details' });
//         }
//     }
//     res.json({ success: true, message: 'All train details added successfully' });
// };
exports.addTrain = async (req, res) => {
    const { train_data } = req.body;
    console.log("train_data.length", train_data.length);

    // Check if the input data is in the correct format
    if (!Array.isArray(train_data) || train_data.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid input format' });
    }

    // Iterate through each train entry and insert it into the database
    for (const { train_no, from_city, to_city, departure_time, route } of train_data) {
        // Check if all necessary fields are provided for each train entry
        if (!train_no || !from_city || !to_city || !departure_time || !route) {
            return res.status(400).json({ success: false, message: 'All fields are required for each train entry' });
        }
        try {
            // Insert train data into MySQL database
            const [result] = await pool.promise().query(
                `INSERT INTO tbl_train_schedule (train_no, from_city, to_city, departure_time, route) 
                 VALUES (?, ?, ?, ?, ?)`,
                [train_no, from_city, to_city, departure_time, route]
            );

            // Log result for debugging purposes (optional)
            console.log("Train inserted:", result);
        } catch (error) {
            // Catch and log errors, then return a failure response
            console.error(error);
            return res.status(500).json({ success: false, message: 'Error adding train details' });
        }
    }

    // Send a success response after processing all train data
    res.json({ success: true, message: 'All train details added successfully' });
};





// Train Search API
// exports.searchTrain = async (req, res) => {

//     const { from_city, to_city } = req.body;
//     try {
//         const TrainDataGet = await pool.query('SELECT * FROM tbl_train_schedule WHERE from_city = $1 AND to_city = $2', [from_city, to_city]);

//         if ( TrainDataGet.rows.length === 0 ) return res.json({ message: "No Train In This City" })

//         return res.status(200).json({ Data: TrainDataGet.rows , message:"Train Data Get SuccessFully" })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message:'Internal Server Error'});
//     }
// };
exports.searchTrain = async (req, res) => {
    const { from_city, to_city } = req.body;
    try {
        // Perform the MySQL query to search for trains
        const [trainDataGet] = await pool.promise().query(
            'SELECT * FROM tbl_train_schedule WHERE from_city = ? AND to_city = ?',
            [from_city, to_city]
        );

        // If no trains are found, return a message indicating no results
        if (trainDataGet.length === 0) {
            return res.json({ message: "No Train In This City" });
        }

        // If trains are found, return the data
        return res.status(200).json({ Data: trainDataGet, message: "Train Data Get Successfully" });

    } catch (error) {
        // Log the error and return a 500 status with an error message
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


