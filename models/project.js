const mongoose = require('mongoose');
const Joi = require('joi');
const { requirementSchema } = require('../models/requirement');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  requirements: [
    requirementSchema
  ]
});

const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {
  const schema = {
    name: Joi.string().min(1).max(50).required()
  };

  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;