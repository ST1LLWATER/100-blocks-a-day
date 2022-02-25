var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { PrismaClient } = require('@prisma/client');

// var indexRouter = require('./routes');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const prisma = new PrismaClient();
app.get('/prisma', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
