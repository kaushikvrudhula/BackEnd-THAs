const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { emailValidate } = require('./validate');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const userAuth = passport.authenticate('jwt', { session: false });

const checkRole = (role) => (req, res, next) => {
  role === req.user.role ? next() : res.status(401).json('Unauthorized access');
};

const validateEmail = async (email) => {
  let user = await User.findOne({
    where: {
      email,
    },
  });
  return user ? true : false;
};
const userRegister = async (UserDet, role, res) => {
  try {
    let emailNotRegistered = await validateEmail(UserDet.email);
    if (emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registerd`,
        success: false,
      });
    }
    const password = await bcrypt.hash(UserDet.password, 10);
    const newUser = new User({
      ...UserDet,
      password,
      role,
    });
    console.log(newUser);
    await newUser.save();
    return res.status(201).json({
      message: 'Email registered successfully!',
      success: true,
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Unable to create account',
      success: 'false',
      err: err,
    });
  }
};
const userLogin = async (UserCred, role, res) => {
  let { email, password } = UserCred;
  const isValid = await emailValidate(email);
  const user = await User.findOne({
    where: {
      email,
    },
  });
  console.log(email, password);
  if (!isValid) {
    return res.status(404).json({
      message: 'User not found',
      success: false,
    });
  }
  if (user.role !== role) {
    return res.status(403).json({
      message: 'Unauthourized access',
      success: false,
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      SECRET,
      { expiresIn: '7days' }
    );
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      success: true,
    });
  } else {
    return res.status(403).json({
      message: 'Incorrect password',
      success: false,
    });
  }
};

module.exports = {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
};