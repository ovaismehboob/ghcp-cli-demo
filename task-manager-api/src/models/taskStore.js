'use strict';

/**
 * In-memory data store for tasks. Data is reset whenever the process restarts.
 */
let tasks = [];
let nextId = 1;

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find((task) => task.id === id);
}

function create({ title, description = '', status = 'todo' }) {
  const now = new Date().toISOString();
  const task = {
    id: nextId++,
    title,
    description,
    status,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return task;
}

function update(id, updates) {
  const task = getById(id);
  if (!task) {
    return null;
  }
  Object.assign(task, updates, { updatedAt: new Date().toISOString() });
  return task;
}

function remove(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
}

/** Test-only helper to reset store state between test cases. */
function _reset() {
  tasks = [];
  nextId = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  _reset,
};
