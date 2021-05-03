
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, comment: 'Inspiring movie!', rating: 5, users_id: 1, movies_id: 1},
        {id: 2, comment: 'Mind bending!', rating: 4, users_id: 2, movies_id: 2},
        {id: 3, comment: 'Hilarious!', rating: 3, users_id: 1, movies_id: 8}
      ]);
    });
};
