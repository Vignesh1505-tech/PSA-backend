const bcryptjs = require("bcryptjs");



// Function to hash a password
async function hashPassword(Otp) {
    try {
        const hashedPassword = await bcryptjs.hash(Otp, 10);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

async function comparePasswords(plainPassword, hashedPassword) {
    try {
        // Compare the plain password with the hashed password
        const isMatch = await bcryptjs.compare(plainPassword, hashedPassword);
        return isMatch; // Returns true if the passwords match, false otherwise
    } catch (error) {
        throw error;
    }
}




module.exports = { hashPassword,comparePasswords } ;