'use strict';

const express = require('express');
const knex = require('../knex')
const router = express.Router();

router.get('/', (req, res, next) => {
  knex('classifieds').select('id','title','description','price','item_image').then((classifieds) => {
      res.send(classifieds);
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  console.log('id is    ', id)
  knex('classifieds').where('id', id)
    .select(['id', 'title', 'description', 'price', 'item_image']).then((classifieds) => {
      res.send(classifieds[0])
    })
})

router.post('/', (req, res, next) => {
  let newEntry = {
    'id': req.body.id,
    'title': req.body.title,
    'description': req.body.description,
    'price': req.body.price,
    'item_image': req.body.item_image,
    'created at': new Date()
  }
  knex('classifieds').insert(newEntry).returning("*").then((response) => {
      res.send(response[0])
    })
    .catch((err) => {
      next(err);
    })
});

router.patch('/:id', (req, res, next) => {
  let updatedEntry = {
    'id': req.body.id,
    'title': req.body.title,
    'description': req.body.description,
    'price': req.body.price,
    'item_image': req.body.item_image,
    'created_at': new Date()
  }
  knex('classifieds').update(updatedEntry).returning("*").then((response) => {
    res.send(response[0])
  })
  .catch((err) => {
    next(err);
  })
});

router.delete('/:id', (req, res, next) => {
  knex("classifieds").del().where("id", req.params.id),returning("*").then((response) => {
    let classified = response[0]
    delete classified.id
    res.send(classified);
  })
})






module.exports = router;
