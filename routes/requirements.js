const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Project } = require('../models/project');
const { Requirement, validateRequirement } = require('../models/requirement');
const validateObjectId = require('../middleware/validObjectId')

router.get('/:id', async (req, res) => {
  const project = await Project.findOne({ 'requirements._id': req.params.id });

  if (!project) return res.status(404).send('The requirement with the given ID was not found.');

  res.send(project.requirements.filter(r => { return r._id == req.params.id })[0]);
});

router.post('/:id', [auth, validate(validateRequirement)], async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send('The requirement with the given ID was not found.');

  const requirement = new Requirement ({ name: req.body.name });

  project.requirements.push(requirement);
  await project.save();

  res.send(requirement);
});

router.put('/:id', validateObjectId, async (req, res) => {
  const project = await Project.findOne({ 'requirements._id': req.params.id }).select('-__v');

  if (!project) return res.status(404).send('The requirement with the given ID was not found.');

  await Project.findOneAndUpdate(
    { 
      "requirements._id": req.params.id 
    },
    { 
      "$set": { "requirements.$": req.body },
    }, 
    {
      new: true 
    },
    function(err, result) {
      res.send(result);
    }
  );
});

router.delete('/:id', async (req, res) => {
  const project = await Project.findOne({ 'requirements._id': req.params.id }).select('-__v');
  
  if (!project) return res.status(404).send('The requirement with the given ID was not found.');

  await project.requirements.remove(req.params.id);
  await project.save();

  res.send(project);
});

module.exports = router;