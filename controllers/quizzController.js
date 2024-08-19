const Quizz = require("../models/Quizz");


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
module.exports.all_quizz_get = async (req, res) => {
    res.render('all_quizz');
}

module.exports.all_quizz_post = async (req, res) => {
}

module.exports.create_quizz_get = async (req, res) => {
    
}

module.exports.create_quizz_post = async (req, res) => {
}


module.exports.delete_quizz_get = async (req, res) => {
    
}

module.exports.delete_quizz_post = async (req, res) => {
}


module.exports.edit_quizz_get = async (req, res) => {
    
}

module.exports.edit_quizz_post = async (req, res) => {
}

