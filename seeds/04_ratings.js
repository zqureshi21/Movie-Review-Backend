
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('ratings').insert([
        {id: 1, rating: '5', users_id: 1, movies_id: 1},
        {id: 2, rating: '4', users_id: 1, movies_id: 6},
        {id: 3, rating: '3', users_id: 2, movies_id: 12}
      ]);
    });
};
