const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'There is already an account associated with that email'],
    trim: true,
    // must be in valid email format
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true
  }
});

// authenticate input
UserSchema.statics.authenticate = (email, password, callback) => {
  // find the user associated with the given email
  User.findOne({ email: email }, (err, user) => {
    if(err) return callback(err);

    // if no user return error
    if(!user) {
      let err = new Error("Email not found");
      err.status = 401;
      return callback(err);
    }

    // use bcrypt to compare the given password to the stored hashed password
    bcrypt.compare(password, user.password, (error, result) => {
      // if passwords match, return the user document
      if(result === true) {
        return callback(null, user);
      // if passwords don't match, pass nothing on
      } else {
        return callback();
      }
    });
  });
};


UserSchema.pre('save', function(next) {
  let user = this;

  // capitalize first letter of first and last name
  this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
  this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);

  // hash password before saving to database, only the first time it's stored
  if(this.isModified('password')) {
    bcrypt.hash(user.password, 10, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  } else {
    next();
  }

});

const User = mongoose.model('User', UserSchema);
module.exports.User = User;
