
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, comment: 'Inspiring movie!', users_id: 1, movies_id: 1},
        {id: 2, comment: 'Mind bending!', users_id: 2, movies_id: 2},
        {id: 3, comment: 'Hilarious!', users_id: 1, movies_id: 8}
      ]);
    });
};
