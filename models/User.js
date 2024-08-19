const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  username : {
    type: String,
    required: [true, 'Please enter an username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  level: {
    type: Number,
    default: 0,
  },
  experience: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Adventurer</dc:title><dc:creator>Lisa Wischofsky</dc:creator><dc:source xsi:type="dcterms:URI">https://www.figma.com/community/file/1184595184137881796</dc:source><dcterms:license xsi:type="dcterms:URI">https://creativecommons.org/licenses/by/4.0/</dcterms:license><dc:rights>Remix of „Adventurer” (https://www.figma.com/community/file/1184595184137881796) by „Lisa Wischofsky”, licensed under „CC BY 4.0” (https://creativecommons.org/licenses/by/4.0/)</dc:rights></rdf:Description></rdf:RDF></metadata><mask id="viewboxMask"><rect width="762" height="762" rx="0" ry="0" x="0" y="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><path d="M396 164.8a224.8 224.8 0 0 1 104.8 42.4c6.2 4.9 12.5 9.4 18 15a225.4 225.4 0 0 1 71.8 149 58.5 58.5 0 0 1 50.9 42.2 71 71 0 0 1-27.6 76.5c-11 7.7-24.5 12-38 11.7-5 0-10-1.6-15-1.8-1.9 2.2-3.3 4.9-4.8 7.3A223.3 223.3 0 0 1 389 609.8c-11 .7-21.9 2-33 .7a223.7 223.7 0 0 1-178.8-342.3A223.4 223.4 0 0 1 352 163.5c14.6-1.4 29.4-.3 44 1.3Z" fill="#000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M498.8 213.2A216 216 0 0 0 363 169c-13-.2-26.2 1.6-39 4a218 218 0 0 0-113.6 365.5 218.5 218.5 0 0 0 260.4 40.2c35-18.8 64.2-47.3 84.4-81.5l-3-1.6c-2.8-1.4-5.7-3-8-5-2.2-2-.3-5.8 2.7-4.7 1.5.7 3 1.6 4.4 2.4a55 55 0 0 0 59.6-3.6 64.5 64.5 0 0 0 25-69.8 53.1 53.1 0 0 0-24-31 52.6 52.6 0 0 0-47-2.8c-1.6.8-3.4 1.5-5 1.3-2.5-.2-2.8-4.2-.6-5.2 8-4 16.5-5.6 25.4-6.4a217 217 0 0 0-72-146.4c-4.4-4-8.7-8.1-13.9-11.3Zm107.6 196.2c2-1.2 1.3-5.1-1.4-5-2 0-4.2.8-6.2 1.6l-1.4.4a95.1 95.1 0 0 0-25.5 12.4c-2.2 2-2.2 4.4.1 6.2a92 92 0 0 0 5.2 2.8 36 36 0 0 1 13 9.2c-.2 1.9-2 3.4-3.4 4.5l-.2.2c-3.9 3-8.8 5-13.6 7-2.5 1-4.9 2-7.1 3.1-1.7.8-2.6 2.2-1.6 3.9 1 2 3.2 1.1 5 .5l.6-.2 5.4-2.3c5.4-2.3 11-4.5 15.4-8 2.7-2.1 5.1-5.1 5.4-8.7-.5-3.4-2.7-5.7-5.3-7.8a83 83 0 0 0-11.6-7.2l-1.1-.6c5.4-3 10.8-5.6 16.6-7.7l5-1.7a52 52 0 0 0 6.7-2.6Z" fill="transparent"/><g transform="translate(-161 -83)"></g><g transform="translate(-161 -83)"></g><g transform="translate(-161 -83)"></g><g transform="translate(-161 -83)"></g><g transform="translate(-161 -83)"></g><g transform="translate(-161 -83)"></g><g transform="translate(-161 -83)"></g></g>',
  }
});


// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username');
};

const User = mongoose.model('user', userSchema);

module.exports = User;