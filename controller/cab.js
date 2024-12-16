const pool = require("../config/db")


// API to post Cab details
// exports.cabPost = async (req, res) => {
//   const { driver_name, car_name, car_number,journey_date,cab_post_userid, driver_license, from_city, to_city, fair, timing, seat_available } = req.body;

//   // Validate input data
//   if (!driver_name || !car_name || !car_number || !driver_license || !cab_post_userid || !from_city || !to_city || !fair || !timing || !seat_available || !journey_date) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//   try {
//     // SQL query to insert data into the cab_details table
//     const CabDataInsert = await pool.query(
//       `INSERT INTO tbl_cab_details (driver_name, car_name, car_number, driver_license, from_city, to_city, fair, timing, seat_available,journey_date,cab_post_userid)
//          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11) RETURNING *`,
//       [driver_name, car_name, car_number, driver_license, from_city, to_city, fair, timing, seat_available,journey_date,cab_post_userid]
//     );

//     console.log("CabDataInsert.rows.length", CabDataInsert.rows.length)

//     if (CabDataInsert.rows.length === 0) return res.json({ message: "Data Not Insert" })

//     // Return success response with the inserted cab details
//     return res.status(201).json({
//       message: "Cab Posted successfully",
//       cab: CabDataInsert.rows[0],
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
exports.cabPost = async (req, res) => {
  const { driver_name, car_name, car_number, cab_post_userid, driver_license, from_city, to_city, fair, timing, seat_available } = req.body;

  // Validate input data
  if (!driver_name || !car_name || !car_number || !driver_license || !cab_post_userid || !from_city || !to_city || !fair || !timing || !seat_available ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // SQL query to insert data into the cab_details table
    pool.query(
      `INSERT INTO tbl_cab_details (driver_name, car_name, car_number, driver_license, from_city, to_city, fair, timing, seat_available, cab_post_userid)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [driver_name, car_name, car_number, driver_license, from_city, to_city, fair, timing, seat_available, cab_post_userid],
      (err, result) => {
        if (err) {
          console.error("Error inserting cab details:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        // Check if any rows were inserted
        if (result.affectedRows === 0) {
          return res.json({ message: "Data Not Inserted" });
        }

        // Return success response with the inserted cab details
        const insertedCab = {
          id: result.insertId,  // MySQL generates the insert ID
          driver_name,
          car_name,
          car_number,
          driver_license,
          from_city,
          to_city,
          fair,
          timing,
          seat_available,
          cab_post_userid,
        };

        return res.status(201).json({
          message: "Cab Posted successfully",
          cab: insertedCab,
        });
      }
    );
  } catch (err) {
    console.error("Error during cab post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// API for search cab
// exports.searchCab = async (req, res) => {

//   const { from_city, to_city, timing } = req.body;
//   try {
//     const CabDataGet = await pool.query('SELECT * FROM tbl_cab_details WHERE from_city = $1 AND to_city = $2 AND timing = $3', [from_city, to_city, timing]);

//     if (CabDataGet.rows.length === 0) return res.json({ message: "No Cab In This City" })

//     return res.status(200).json({ Data: CabDataGet.rows, message: "Cab Data Get SuccessFully" })
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
exports.searchCab = async (req, res) => {
  const { from_city, to_city } = req.body;
  try {
    // MySQL query syntax with ? placeholders
    pool.query(
      'SELECT * FROM tbl_cab_details WHERE from_city = ? AND to_city = ?',
      [from_city, to_city],
      (err, results) => {
        if (err) {
          console.error("Error fetching cab data:", err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Check if any cabs were found
        if (results.length === 0) {
          return res.json({ message: "No Cab In This City" });
        }

        // Return the found cab data
        return res.status(200).json({
          Data: results,
          message: "Cab Data Retrieved Successfully"
        });
      }
    );
  } catch (error) {
    console.error("Error during cab search:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// API for Get All Cab
// exports.getCabData = async (req, res) => {
//   try {
//     const AllCabDataGet = await pool.query('SELECT * FROM tbl_cab_details');

//     if (AllCabDataGet.rows.length === 0) return res.json({ message: "No Cab Post Data" })

//     return res.status(200).json({ Data: AllCabDataGet.rows, message: "Cab Post Data Get SuccessFully" })
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
exports.getCabData = async (req, res) => {
  try {
    // MySQL query to fetch all cab data
    pool.query('SELECT * FROM tbl_cab_details', (err, results) => {
      if (err) {
        console.error("Error fetching cab data:", err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Check if any cab data exists
      if (results.length === 0) {
        return res.json({ message: "No Cab Post Data" });
      }

      // Return the fetched cab data
      return res.status(200).json({
        Data: results,
        message: "Cab Post Data Retrieved Successfully"
      });
    });
  } catch (error) {
    console.error("Error during fetching cab data:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// API for edit post data
// exports.PostDataUpdate = async (req, res) => {
//   const { driver_name, car_name,journey_date, car_number, driver_license, from_city, to_city, fair, timing, seat_available,cab_id } = req.body;

//   // Validate input data
//   if (!driver_name || !car_name || !car_number || !journey_date || !driver_license || !from_city || !to_city || !fair || !timing || !seat_available) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//   try {
//     // SQL query to update data in the cab_post detail
//     const CabPostDataUpdate = await pool.query(
//       `UPDATE tbl_cab_details
//       SET 
//       driver_name = $1, car_name = $2, car_number = $3, driver_license = $4, from_city = $5, to_city = $6, fair = $7, timing = $8, seat_available = $9,journey_date=$10
//       WHERE cab_id = $11
//       RETURNING *`,
//       [driver_name, car_name, car_number, driver_license, from_city, to_city, fair, timing, seat_available,journey_date,cab_id]
//     );
//     console.log("CabDataInsert.rows.length", CabPostDataUpdate.rows)

//     if (CabPostDataUpdate.rows.length === 0) return res.json({ message: "Data Not Updated" })

//     // Return success response with the inserted cab details
//     return res.status(201).json({
//       message: "Cab Posted Data Updated Successfully",
//       cab: CabPostDataUpdate.rows[0],
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
exports.PostDataUpdate = async (req, res) => {
  const { driver_name, car_name, car_number, driver_license, from_city, to_city, fair, timing, seat_available, cab_id } = req.body;

  // Validate input data
  if (!driver_name || !car_name || !car_number  || !driver_license || !from_city || !to_city || !fair || !timing || !seat_available) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // SQL query to update data in the cab_post detail
    pool.query(
      `UPDATE tbl_cab_details
      SET 
      driver_name = ?, car_name = ?, car_number = ?, driver_license = ?, from_city = ?, to_city = ?, fair = ?, timing = ?, seat_available = ?
      WHERE cab_id = ?
      `,
      [driver_name, car_name, car_number, driver_license, from_city, to_city, fair, timing, seat_available, cab_id],
      (err, results) => {
        if (err) {
          console.error("Error updating cab data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        // Check if the update was successful
        if (results.affectedRows === 0) {
          return res.json({ message: "Data Not Updated" });
        }

        // Return success response with the updated cab details
        return res.status(201).json({
          message: "Cab Post Data Updated Successfully",
          cab: {
            driver_name,
            car_name,
            car_number,
            driver_license,
            from_city,
            to_city,
            fair,
            timing,
            seat_available,
            cab_id,
          },
        });
      }
    );
  } catch (err) {
    console.error("Error during cab data update:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// API for Delete post
// exports.DeletePostData = async (req, res) => {
//   try {
//     const {cab_id} = req.params;

//     const deletePost = await pool.query('DELETE FROM tbl_cab_details WHERE cab_id = $1',[cab_id]);

//     console.log("deletePost",deletePost);

//     if (deletePost.rowCount === 0) return res.json({ message: "No cab available for post-delete" })

//     return res.status(200).json({ message: "Cab Deleted Successfully" })
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
exports.DeletePostData = async (req, res) => {
  try {
    const { cab_id } = req.params;

    // MySQL query to delete the cab post based on cab_id
    pool.query(
      'DELETE FROM tbl_cab_details WHERE cab_id = ?',
      [cab_id],
      (err, results) => {
        if (err) {
          console.error("Error deleting cab post:", err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Check if any rows were affected (i.e., if the delete was successful)
        if (results.affectedRows === 0) {
          return res.json({ message: "No cab available for post-delete" });
        }

        // Return success response
        return res.status(200).json({ message: "Cab Deleted Successfully" });
      }
    );
  } catch (error) {
    console.error("Error in DeletePostData:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// API for Get User Cab post
// exports.getUserCabData = async (req, res) => {
//   try {
//     const { userid } = req.params
//     const UserCabDataGet = await pool.query('SELECT * FROM tbl_cab_details WHERE cab_post_userid = $1',[userid]);

//     if (UserCabDataGet.rows.length === 0) return res.json({ message: "Cab Not Posted" })

//     return res.status(200).json({ Data: UserCabDataGet.rows, message: "User Cab Data Get SuccessFully" })
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
exports.getUserCabData = async (req, res) => {
  try {
    const { userid } = req.params;

    // MySQL query to fetch cab details posted by the user
    pool.query(
      'SELECT * FROM tbl_cab_details WHERE cab_post_userid = ?',
      [userid],
      (err, results) => {
        if (err) {
          console.error("Error fetching user cab data:", err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Check if any data was found
        if (results.length === 0) {
          return res.json({ message: "Cab Not Posted" });
        }

        // Return the fetched user cab data
        return res.status(200).json({
          Data: results,  // results is an array of rows in MySQL
          message: "User Cab Data Get SuccessFully"
        });
      }
    );
  } catch (error) {
    console.error("Error during getUserCabData:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



// API for particular cab data
// exports.singleCabData = async (req, res) => {
//   try {
//     const { cab_id } = req.params
//     const CabData = await pool.query('SELECT * FROM tbl_cab_details WHERE cab_id = $1',[cab_id]);

//     if (CabData.rows.length === 0) return res.json({ message: "Cab Not Found" })

//     return res.status(200).json({ Data: CabData.rows, message: "Cab Detail Get SuccessFully" })
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
exports.singleCabData = async (req, res) => {
  try {
    const { cab_id } = req.params;

    // Query to get cab details by cab_id
    const [CabData] = await pool.promise().query('SELECT * FROM tbl_cab_details WHERE cab_id = ?', [cab_id]);

    // Check if no cab data was found
    if (CabData.length === 0) {
      return res.json({ message: "Cab Not Found" });
    }

    // Return the cab details
    return res.status(200).json({ Data: CabData, message: "Cab Detail Get Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
