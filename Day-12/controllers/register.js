const User = require('../models/mongo');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const register = async (req,res) => {
    const {email,password,fullName} = req.body;
    try {
        const alreadyExists= await User.findOne({where : {email }}).exec()
        if (alreadyExists){
            res.status(401).send("Email already exists");
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User ({email: email.toLowerCase(),password:hash,fullName})
        const savedUser = await newUser.save()
        res.status(201).send(savedUser);
        // Store hash in your password DBs.
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }

}
module.exports = register;