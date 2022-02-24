const mongoose = require('mongoose');

const OfficeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const LocationModel = mongoose.model('Office', OfficeSchema);
module.exports = LocationModel;
