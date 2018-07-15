const mongoose = require('mongoose');
const Joi = require('joi');

const requirementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Requirement = mongoose.model('Requirement', requirementSchema);

function validateRequirement(requirement) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(requirement, schema);
}

exports.Requirement = Requirement;
exports.requirementSchema = requirementSchema;
exports.validateRequirement = validateRequirement;