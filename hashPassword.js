const bcrypt = require('bcrypt');

async function generateHash(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
}

generateHash('admin_password'); // Replace 'admin_password' with your desired password
