'use strict';

const express = require('express');
const knex = require('../knex')
const router = express.Router();

router.get('/', (req, res, next) => {
  knex('classifieds').orderBy('id', 'asc').then((classifieds) => {
      res.send(classifieds);
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/:id', (req, res, next) => {
  knex('classifieds').where('id', req.params.id).then((classified) => {
      res.send(classified[0])
    })
    .catch((err) => {
      next(err);
    })
});

router.post('/', (req, res, next) => {
  let newEntry = {
    'id': req.body.id,
    'title': req.body.title,
    'description': req.body.description,
    'price': req.body.price,
    'item_image': req.body.item_image
  }
  knex('classifieds').insert(newEntry).returning("*").then((response) => {
      res.send(response[0])
    })
    .catch((err) => {
      next(err);
    })
});






module.exports = router;
