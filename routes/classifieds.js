'use strict';

const express = require('express');
const knex = require('../knex')
const router = express.Router();

router.get('/', (req, res, next) => {
  knex('classifieds').select('id', 'title', 'description', 'price', 'item_image').then((classifieds) => {
      res.send(classifieds);
    })
    .catch((err) => {
      next(err);
    })
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  console.log('id is    ', id)
  knex('classifieds').where('id', id)
    .select(['id', 'title', 'description', 'price', 'item_image']).then((classifieds) => {
      res.send(classifieds[0]);
    })
    .catch((err) => {
      next(err);
    })
});

router.post('/', (req, res, next) => {
  knex('classifieds').returning(['id', 'title', 'description', 'price', 'item_image'])
    .insert({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }).then((classifieds) => {
      res.send(classifieds[0]);
    })
    .catch((err) => {
      next(err);
    })
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id
  knex('classifieds').where('id', id).returning(['id', 'title', 'description', 'price', 'item_image'])
    .update({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    })
    .then((classifieds) => {
      res.send(classifieds[0]);
    })
    .catch((err) => {
      next(err);
    })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  knex('classifieds').where('id', id).returning(['id', 'title', 'description', 'price', 'item_image']).del()
    .then((classifieds) => {
      res.send(classifieds[0]);
    })
    .catch((err) => {
      next(err);
    })
});

module.exports = router;
