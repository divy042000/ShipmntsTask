const crypto = require('crypto');

const crypto = require('crypto');

const Register = async (username, email, password, role_id) => {
    
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

    const newUser = {
        id: uniqueId,
        username,
        email,
        password_hash: hashedPassword,
        role_id,
        created_at: new Date(),
    };

   
    
    return { message: 'User registered successfully', user: newUser };
};


module.exports = { Register };
