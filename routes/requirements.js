const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Project } = require('../models/project');
const { Requirement, validateRequirement } = require('../models/requirement');

router.post('/:id', [auth, validate(validateRequirement)], async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send('The project with the given ID was not found.');

  const requirement = new Requirement ({ name: req.body.name });

  project.requirements.push(requirement);
  await project.save();

  res.send(requirement);
});

router.delete('/:projectId/:requirementId', [auth], async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) return res.status(404).send('The project with the given ID was not found.');

  project.requirements.remove(req.params.requirementId);
  await project.save();

  res.send(project);
});

module.exports = router;