
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: 'tokyo'},
        {id: 2, username: 'user2', password: 'kyoto'},
      ]);
    });
};
