
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments()
      table.string('username').notNullable().defaultTo('')
      table.string('password').notNullable().defaultTo('')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
