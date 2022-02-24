const Office = require("../database/models/office");

const getOffices = async (req, res) => {
  try {
    const offices = await Office.find({})
    res.send(offices)
  } catch (err) {
    res.send({
      err,
    })
  }
}

const getOfficeById = (req, res) => {
  Office.find({
    _id: req.params.id
  })
    .then(task => res.send(task))
    .catch(error => console.log(error));
};

const addOffice = (req, res) => {
  new Office({
    name: req.body.name,
    location: req.body.location
  })
    .save()
    .then(office => res.send(office))
    .catch((err) => {
      res.send({
        err,
      })
    });
};

const updateOffice = (req, res) => {
  Office.findOneAndUpdate(
    {
      _id: req.params.id
    },
    { $set: req.body }
  )
    .then(office => res.send(office))
    .catch(error => console.log(error));
};

const deleteOffice = (req, res) => {
  Office.findOneAndDelete({
    _id: req.params.id
  })
    .then(office => res.send(office))
    .catch(error => console.log(error));
};

module.exports = {
  getOffices,
  getOfficeById,
  updateOffice,
  addOffice,
  deleteOffice
}
