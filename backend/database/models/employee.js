const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office'
  },
  phoneNumber: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  tags: [String]
});

EmployeeSchema.methods.saveAndPopulate = function(cb) {
  return this.save().then(doc => doc.populate('office').execPopulate())
}

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
module.exports = EmployeeModel;
