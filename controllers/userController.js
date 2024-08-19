const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
    let errors = { username: ''};

      // validation errors
      if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
      }
    
      return errors;
}

// controller actions
module.exports.edit_profile_get = async (req, res) => {
    res.render('user/edit_profile');
}

module.exports.edit_profile_post = async (req, res) => {
    const { _id, username } = req.body;
    try {
        const user = await User.updateOne({ _id }, { username }, { returnNewDocument : true, new: true });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
