const mongoose = require('mongoose');

// Create Schema
const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter first name!'],
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    alias: 'surname', // Family Name
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 4,
    maxlength: 50,
    // Custom Validator for Email
    validate: function(value){
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      return emailRegex.text(value)
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  city:{
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    default: 0.0,
    // min: [1000, 'Please enter minimum 1000'],
    // max: 25000
    validate: function(value){
      if(value < 0){
        throw new Error('Negative Salary not accepted')
      }
    }
  },
  created: { 
    type: Date,
    default: Date.now,
    alias: 'createdat'
  },
  updatedat: { 
    type: Date,
    default: Date.now
  },
});

//Declare Virtual Fields


//Custom Schema Methods
//1. Instance Method Declaration


//2. Static method declararion


//Writing Query Helpers


// Pre Middleware
EmployeeSchema.pre('save', (next) => {
  console.log("Before Save")
  let now = Date.now()
   
  this.updatedat = now
  // Set a value for createdAt only if it is null
  if (!this.created) {
    this.created = now
  }
  
  // Call the next function in the pre-save chain
  next()
});

EmployeeSchema.pre('findOneAndUpdate', (next) => {
  console.log("Before findOneAndUpdate")
  let now = Date.now()
  this.updatedat = now
  console.log(this.updatedat)
  next()
});

// Middleware POST
EmployeeSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

EmployeeSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

EmployeeSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

EmployeeSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

// Create Model
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;