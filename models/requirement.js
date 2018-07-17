const mongoose = require('mongoose');
const Joi = require('joi');

const requirementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 250
  }
});

const Requirement = mongoose.model('Requirement', requirementSchema);

function validateRequirement(requirement) {
  const schema = {
    name: Joi.string().min(1).max(250).required()
  };

  return Joi.validate(requirement, schema);
}

exports.Requirement = Requirement;
exports.requirementSchema = requirementSchema;
exports.validateRequirement = validateRequirement;