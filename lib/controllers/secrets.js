const { Router } = require('express');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allSecrets = await Secret.getAll();
      res.json(allSecrets);
    } catch (error) {
      next(error);
    }
  });
