'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('classifieds', (table) => {
    table.increments('id').primary().notNullable();
    table.text('title', 255).notNullable();
    table.text('description', 255).notNullable();
    table.integer('price').notNullable();
    table.text('item_image').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('classifieds')
};
