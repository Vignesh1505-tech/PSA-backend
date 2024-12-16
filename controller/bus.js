const pool = require("../config/db")


// API to post bus details
// exports.addBus = async (req, res) => {
//     const  { bus_data }  = req.body;
//     console.log("bus_data.length",bus_data.length)
//     // console.log("busData",bus_data)

//     if (!Array.isArray(bus_data) || bus_data.length === 0) {
//         return res.status(400).json({ success: false, message: 'Invalid input format' });
//     }
//     for (const { bus_name, from_city, to_city, departure_time,route,schedule } of bus_data) {
//         if (!bus_name || !from_city || !to_city || !departure_time || !route ) {
//             return res.status(400).json({ success: false, message: 'All fields are required for each bus entry' });
//         }
//         try {
//             const result = await pool.query(
//                 `INSERT INTO tbl_bus_schedule (bus_name, from_city, to_city, departure_time,route,schedule)
//                  VALUES ($1, $2, $3, $4,$5,$6) RETURNING *`,
//                 [bus_name, from_city, to_city, departure_time,route,schedule]
//             );
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ success: false, message: 'Error adding bus details' });
//         }
//     }
//     res.json({ success: true, message: 'All bus details added successfully' });
// };
exports.addBus = async (req, res) => {
    const { bus_data } = req.body;
    console.log("bus_data.length", bus_data.length);

    if (!Array.isArray(bus_data) || bus_data.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid input format' });
    }

    for (const { bus_name, from_city, to_city, departure_time, route, schedule } of bus_data) {
        if (!bus_name || !from_city || !to_city || !departure_time || !route) {
            return res.status(400).json({ success: false, message: 'All fields are required for each bus entry' });
        }

        try {
            // Insert bus schedule into MySQL
            pool.query(
                'INSERT INTO tbl_bus_schedule (bus_name, from_city, to_city, departure_time, route, schedule) VALUES (?, ?, ?, ?, ?, ?)',
                [bus_name, from_city, to_city, departure_time, route, schedule],
                (err, result) => {
                    if (err) {
                        console.error("Error adding bus details:", err);
                        return res.status(500).json({ success: false, message: 'Error adding bus details' });
                    }

                    // Check if the insertion was successful by checking affectedRows
                    if (result.affectedRows === 0) {
                        return res.status(500).json({ success: false, message: 'Bus details insertion failed' });
                    }
                }
            );
        } catch (error) {
            console.error("Error adding bus details:", error);
            return res.status(500).json({ success: false, message: 'Error adding bus details' });
        }
    }

    return res.json({ success: true, message: 'All bus details added successfully' });
};



// Bus Search API
// exports.searchBus = async (req, res) => {

//     const { from_city, to_city } = req.body;
//     try {
//         const BusDataGet = await pool.query('SELECT * FROM tbl_bus_schedule WHERE from_city = $1 AND to_city = $2', [from_city, to_city]);

//         if ( BusDataGet.rows.length === 0 ) return res.json({ message: "No Buses In This City" })

//         return res.status(200).json({ Data: BusDataGet.rows , message:"Bus Data Get SuccessFully" })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message:'Internal Server Error'});
//     }
// };
exports.searchBus = async (req, res) => {
    const { from_city, to_city } = req.body;

    try {
        // Query to search for buses based on from_city and to_city
        pool.query(
            'SELECT * FROM tbl_bus_schedule WHERE from_city = ? AND to_city = ?',
            [from_city, to_city],
            (err, results) => {
                if (err) {
                    console.error("Error fetching bus data:", err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                // Check if buses were found
                if (results.length === 0) {
                    return res.json({ message: "No Buses In This City" });
                }

                return res.status(200).json({ Data: results, message: "Bus Data Retrieved Successfully" });
            }
        );
    } catch (error) {
        console.error("Error during bus search:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
