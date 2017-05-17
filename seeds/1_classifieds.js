exports.seed = function(knex, Promise) {
  return knex('classifieds').del()
    .then(function() {
      return Promise.all([
        knex('classifieds').insert([{
        id: 1,
        title: 'NES Classic',
        description: 'I got lucky and found it, and decided to charge 10x what it was worth.',
        price: 600,
        item_image: 'http://www.nintendo.com/images/page/nes-classic/nes-classic-edition-box.png'
        },
        {
        id: 2,
        title: 'Pikachu 9" Plush Stuffed Toy',
        description: 'Polyester fiber construction Officially licensed.',
        price: 10,
        item_image: 'https://images-na.ssl-images-amazon.com/images/I/41VwGotRZsL._SY300_.jpg'
        }])
      ]);
    }).then(() => {
      return knex.raw("select setval('classifieds_id_seq', (select max(id) from classifieds));")
    });
};
