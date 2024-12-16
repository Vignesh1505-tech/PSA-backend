const admin = require('firebase-admin');
const serviceAccount = require('../google-services.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Access Firebase Cloud Messaging (FCM)
const messaging = admin.messaging();


exports.sendMessageNotification = async (recipientUserId, message) => {
    console.log("recipientUserId", recipientUserId, message);
    try {
      // Query to fetch the user token from the database
      const userTokenQuery = await conn.query(
        'SELECT fcm_token FROM tbl_user WHERE userid = $1',
        [recipientUserId]
      );
      console.log("userTokenQuery", userTokenQuery.rows);
  
      // Check if token was found
      if (userTokenQuery.rowCount === 0) {
        console.error('No token found for user:', recipientUserId);
        return;
      }
  
      const userToken = userTokenQuery.rows[0].fcm_token;
      console.log("user_token", userToken);
  
      // Construct the message for the new API
      const payload = {
        notification: {
          title: message.notification.title,
          body: message.notification.body,
        },
        data: {
        //   latitude: message.data.latitude,
        //   longitude: message.data.longitude,
        //   well_id: message.data.well_id,
        //   screen: message.data.screen,
        //   well_type:message.data.well_type
        },
        token: userToken // Add token directly here
      };
  
      // Send the notification using the new method
      const response = await getMessaging().send(payload);
      console.log('Notification sent successfully', response);
      
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  
  
  