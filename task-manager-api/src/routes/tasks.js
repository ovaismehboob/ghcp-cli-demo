'use strict';

const express = require('express');
const taskStore = require('../models/taskStore');
const { createTaskSchema, updateTaskSchema } = require('../validation/taskSchema');
const { NotFoundError } = require('../middleware/errorHandler');

const router = express.Router();

// GET /tasks - list all tasks
router.get('/', (req, res) => {
  res.status(200).json(taskStore.getAll());
});

// GET /tasks/:id - get a single task
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const task = taskStore.getById(id);
  if (!task) {
    return next(new NotFoundError(`Task with id ${req.params.id} not found`));
  }
  return res.status(200).json(task);
});

// POST /tasks - create a task
router.post('/', (req, res, next) => {
  const result = createTaskSchema.safeParse(req.body);
  if (!result.success) {
    return next(result.error);
  }
  const task = taskStore.create(result.data);
  return res.status(201).json(task);
});

// PUT /tasks/:id - update a task
router.put('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const result = updateTaskSchema.safeParse(req.body);
  if (!result.success) {
    return next(result.error);
  }
  const task = taskStore.update(id, result.data);
  if (!task) {
    return next(new NotFoundError(`Task with id ${req.params.id} not found`));
  }
  return res.status(200).json(task);
});

// DELETE /tasks/:id - delete a task
router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const removed = taskStore.remove(id);
  if (!removed) {
    return next(new NotFoundError(`Task with id ${req.params.id} not found`));
  }
  return res.status(204).send();
});

module.exports = router;
