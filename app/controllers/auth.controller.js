const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      name: req.body.name
    });



    if (req.body.roleId) {
      const roles = await Role.findOne({
        where: {
          id: req.body.roleId
        },
      });

      const result = user.setRoles([roles.id]);
      if (result)
        return res.status(200).json({
          status: 200,
          success: true,
          message: "User registered successfully!"
        });
    } else {
      // user has role = 1
      const result = user.setRoles([3]);
      if (result)
        return res.status(200).json({
          status: 200,
          success: true,
          message: "User registered successfully!"
        });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: error.message
    });
  }
};

exports.signin = async (req, res) => {
  console.log("Body", req.body);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User Not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(200).json({
        status: 200,
        success: false,
        message: "Invalid Password!"
      });

    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    const roles = await user.getRoles();

    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: roles[0],
        token: token,
        name: user.name,
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message
    });
  }
};

exports.userPasswordChange = async (req, res) => {
  console.log("Body", req.body);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User Not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(200).json({
        status: 500,
        success: false,
        message: "Invalid Password!"
      });

    }

    User.update( {
      name : req.body.city,
      password : bcrypt.hashSync(req.body.new_password, 8)
    }, {
      where: { email: req.body.email },
    }).then(num => {
      if (num == 1) {
        res.status(200).json({
          status: 200,
          success: false,
          message: "Updated Successfully"
        });
      } else {
        res.status(500).json({
          status: 500,
          success: false,
          message: "No changes were made!"
        });
      }
    })
      .catch(err => {
        res.status(500).json({
          status: 500,
          success: false,
          message: "Error updating with id=" + req.userId
        });
      });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message
    });
  }
};

exports.getAllUsers = async (req, res) => {
  User.findAll().then(data => {
    res.status(200).json({
        status: 200,
        success: true,
        data: data
    });
}).catch(err => {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).json({
      status: 200,
      success: true,
      message: "You've been signed out!"
  });
  } catch (err) {
    this.next(err);
  }
};