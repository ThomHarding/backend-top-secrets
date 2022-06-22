const { Router } = require('express');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allSecrets = await Secret.getAll();
      res.json(allSecrets[0]);
    } catch (error) {
      next(error);
    }
  });
