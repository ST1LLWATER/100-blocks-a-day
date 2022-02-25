var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET users listing. */
router.get('/adduser', async (req, res) => {
  const body = req.body;
  console.log(body);
});

module.exports = router;
