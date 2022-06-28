const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const allSecrets = await Secret.getAll();
      res.json(allSecrets);
    } catch (error) {
      next(error);
    }
  });
