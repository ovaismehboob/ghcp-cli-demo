'use strict';

const taskStore = require('../src/models/taskStore');

describe('taskStore', () => {
  beforeEach(() => {
    taskStore._reset();
  });

  test('getAll returns an empty array initially', () => {
    expect(taskStore.getAll()).toEqual([]);
  });

  test('create adds a task with defaults and timestamps', () => {
    const task = taskStore.create({ title: 'Write tests' });

    expect(task).toMatchObject({
      id: 1,
      title: 'Write tests',
      description: '',
      status: 'todo',
    });
    expect(task.createdAt).toEqual(expect.any(String));
    expect(task.updatedAt).toEqual(expect.any(String));
    expect(taskStore.getAll()).toHaveLength(1);
  });

  test('create assigns incrementing ids', () => {
    const first = taskStore.create({ title: 'First' });
    const second = taskStore.create({ title: 'Second' });

    expect(first.id).toBe(1);
    expect(second.id).toBe(2);
  });

  test('getById returns the matching task', () => {
    const created = taskStore.create({ title: 'Find me' });

    expect(taskStore.getById(created.id)).toEqual(created);
  });

  test('getById returns undefined for a missing task', () => {
    expect(taskStore.getById(999)).toBeUndefined();
  });

  test('update mutates and returns the task', () => {
    const created = taskStore.create({ title: 'Old title' });

    const updated = taskStore.update(created.id, { title: 'New title', status: 'done' });

    expect(updated).toMatchObject({
      id: created.id,
      title: 'New title',
      status: 'done',
    });
    expect(updated.updatedAt).toEqual(expect.any(String));
  });

  test('update returns null for a missing task', () => {
    expect(taskStore.update(999, { title: 'Nope' })).toBeNull();
  });

  test('remove deletes an existing task and returns true', () => {
    const created = taskStore.create({ title: 'Delete me' });

    expect(taskStore.remove(created.id)).toBe(true);
    expect(taskStore.getById(created.id)).toBeUndefined();
    expect(taskStore.getAll()).toHaveLength(0);
  });

  test('remove returns false for a missing task', () => {
    expect(taskStore.remove(999)).toBe(false);
  });
});
