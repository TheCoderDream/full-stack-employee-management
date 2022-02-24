const Employee = require("../database/models/employee");
const _ = require('lodash');

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).populate('office');
    res.send(employees)
  } catch (err) {
    res.send({
      err,
    })
  }
}

const getEmployeeById = (req, res) => {
  Employee.find({
    _id: req.params.id
  })
    .populate('office')
    .then(task => res.send(task))
    .catch(error => console.log(error));
};

const addEmployee =  (req, res) => {
  new Employee(req.body)
    .saveAndPopulate()
    .then(employee => res.send(employee))
    .catch(error => res.send(error));
};

const updateEmployee = (req, res) => {
  Employee.findOneAndUpdate(
    {
      _id: req.body._id
    },
    { $set: req.body},
    {
      new: true,
    }
  ).populate('office')
    .exec((err, employee) => {
      if (!err) {
        res.send(employee);
      } else {
        res.send(err)
      }
    });
};

const deleteEmployee = (req, res) => {
  Employee.findOneAndDelete({
    _id: req.params.id
  })
    .then(task => res.send(task))
    .catch(error => res.send(error));
};

module.exports = {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  addEmployee,
  deleteEmployee
}
