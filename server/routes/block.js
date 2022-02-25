var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET users listing. */
router.post('/setblock', async (req, res) => {
  const body = req.body;

  res.json(body);
});

module.exports = router;
