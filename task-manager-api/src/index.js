'use strict';

const express = require('express');
const tasksRouter = require('./routes/tasks');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'task-manager-api' });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Centralized error handler must be registered last
app.use(errorHandler);

/* istanbul ignore next */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task manager API listening on port ${PORT}`);
  });
}

module.exports = app;
