const checkRole = roles => (req, res, next) => {
    !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    :next();

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

const userRegister = async (userDets,role,res) => {
    try{
        let usernameNotTaken = await validateEmail(userDets.username);
        if(!usernameNotTaken) {
            return res.status(400).json({
            message: `Username is already taken.`,
            success: false
        });
        }
    }

    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
        return res.status(400).json({
            message: `Email is already registered.`,
            success: false
        })
    }
    }
}