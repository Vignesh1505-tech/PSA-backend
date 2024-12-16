const pool = require("../config/db");
const { get } = require("../router/cab.router.js");
const { getSocket } = require("../socket.js");
// const { sendMessageNotification } = require("../utils/push.notification.js");


const io = getSocket();


// API for cab booking
// exports.cab_booking = async (req, res) => {

//     const { userid,cab_id } = req.body;
//     try {
//         if ( !userid || !cab_id) return res.json({ message:"Body Data is Undefined Or Null" })

//         const getUserData = await pool.query(
//             'SELECT * FROM tbl_user WHERE userid = $1 RETURNING *', [userid]);

//         const CabDataGet = await pool.query(
//             'SELECT * FROM tbl_cab_details WHERE cab_id = $1 RETURNING *', [cab_id]);
        
//         if(getUserData.rows.length == 0) return res.json({message:"User Not Found"})

//         const InsertBookedData = await pool.query(
//             'INSERT INTO tbl_booking (userid,cab_id) VALUES ($1,$2) RETURNING *', [userid,cab_id]);

//         console.log("cab----",InsertBookedData);

//         if ( InsertBookedData.rowCount === 0 ) return res.json({ message: "Data Not Booked" })

//         io.to(CabDataGet.rows[0].userid).emit("booking",getUserData.rows[0].name)
//         // const sendMessage = await 

//         return res.status(200).json({ Data: InsertBookedData.rows , message:"Cab Booked SuccessFully" })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message:'Internal Server Error'});
//     }
// };
exports.cab_booking = async (req, res) => {
    const { userid, cab_id } = req.body;
    
    try {
        if (!userid || !cab_id) {
            return res.json({ message: "Body Data is Undefined Or Null" });
        }

        // Get user data from tbl_user
        pool.query('SELECT * FROM tbl_user WHERE userid = ?', [userid], async (err, getUserData) => {
            if (err) {
                console.error("Error fetching user data:", err);
                return res.status(500).json({ message: "Internal Server Error" });
            }

            if (getUserData.length === 0) {
                return res.json({ message: "User Not Found" });
            }

            // Get cab data from tbl_cab_details
            pool.query('SELECT * FROM tbl_cab_details WHERE cab_id = ?', [cab_id], async (err, CabDataGet) => {
                if (err) {
                    console.error("Error fetching cab data:", err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }

                if (CabDataGet.length === 0) {
                    return res.json({ message: "Cab Not Found" });
                }

                // Insert booking data into tbl_booking
                pool.query('INSERT INTO tbl_booking (userid, cab_id) VALUES (?, ?)', [userid, cab_id], async (err, InsertBookedData) => {
                    if (err) {
                        console.error("Error inserting booking data:", err);
                        return res.status(500).json({ message: "Internal Server Error" });
                    }

                    // Check if any row was inserted
                    if (InsertBookedData.affectedRows === 0) {
                        return res.json({ message: "Data Not Booked" });
                    }

                    // Emit booking event to the cab's user
                    io.to(CabDataGet[0].userid).emit("booking", getUserData[0].name);

                    // Return success response
                    return res.status(200).json({ Data: InsertBookedData, message: "Cab Booked Successfully" });
                });
            });
        });

    } catch (error) {
        console.error("Error during booking:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// API for cab booking status update
// exports.booking_status_update = async (req, res) => {

//     const { booking_id,book_status } = req.params;
//     try {
//         if ( !book_status ) return res.json({ message:"Body Data is Undefined Or Null" })

//         const UdateBookingStatus = await pool.query(
//             'UPDATE tbl_booking SET booked = $1 WHERE booking_id = $2 RETURNING *', [book_status,booking_id]);

//         console.log("cab----",UdateBookingStatus);

//         if ( UdateBookingStatus.rowCount === 0 ) return res.json({ message: "Booking Status Not Updated" })

//         return res.status(200).json({ Data: UdateBookingStatus.rows , message:"Status Updated" })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message:'Internal Server Error'});
//     }
// };
exports.booking_status_update = async (req, res) => {
    const { booking_id, book_status } = req.params;

    try {
        if (!book_status) {
            return res.json({ message: "Body Data is Undefined Or Null" });
        }

        // Update the booking status in tbl_booking
        pool.query(
            'UPDATE tbl_booking SET booked = ? WHERE booking_id = ?',
            [book_status, booking_id],
            (err, results) => {
                if (err) {
                    console.error("Error updating booking status:", err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }

                // Check if any row was updated
                if (results.affectedRows === 0) {
                    return res.json({ message: "Booking Status Not Updated" });
                }

                return res.status(200).json({ message: "Status Updated", Data: results });
            }
        );
    } catch (error) {
        console.error("Error during booking status update:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
