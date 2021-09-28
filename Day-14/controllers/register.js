const User = require('../models/user');
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
        req.session.User = savedUser;
        res.status(201).send(savedUser);
        // Store hash in your password DBs.
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }

}
const registerSuperAdmin = async (req,res) => {
    const {email,password,fullName} = req.body;
    try {
        const alreadyExists= await User.findOne({where : {email }})
        if (alreadyExists){
            res.status(401).send("Email already exists");
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User ({email: email.toLowerCase(),password:hash,fullName: "Kaushik",role: "Super-admin"})
        const savedUser = await newUser.save()
        req.session.User = savedUser;
        res.status(201).send(savedUser);
        
        // Store hash in your password DBs.
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }

}
module.exports = {register,registerSuperAdmin};