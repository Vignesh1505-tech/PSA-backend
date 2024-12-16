// Function to generate a random 6-digit OTP

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a number between 100000 and 999999
};


module.exports = { generateOTP };