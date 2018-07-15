const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Project, validate } = require('../models/project');
const validateObjectId = require('../middleware/validObjectId')

router.get('/', async (req, res) => {
  const projects = await Project.find().sort('name').select('-__v');
  res.send(projects);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const project = new Project ({ name: req.body.name });
  await project.save();

  res.send(project);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const project = await Project.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  if (!project) return res.status(404).send('The project with the given ID was not found.');

  res.send(project);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);

  if (!project) return res.status(404).send('The project with the given ID was not found.');

  res.send(project);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) return res.status(404).send('The project with the given ID was not found.');

  res.send(project);
});

module.exports = router;