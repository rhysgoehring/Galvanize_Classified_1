exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classifieds').del()
    .then(function () {
      // Inserts seed entries
      return knex('classifieds').insert([
      {

      }
      ]);
    });
};
