'use strict';

const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'title is required'),
  description: z.string().trim().optional().default(''),
  status: z.enum(['todo', 'in-progress', 'done']).optional().default('todo'),
});

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, 'title cannot be empty').optional(),
    description: z.string().trim().optional(),
    status: z.enum(['todo', 'in-progress', 'done']).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field (title, description, status) must be provided',
  });

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
