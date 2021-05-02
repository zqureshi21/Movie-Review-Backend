
exports.up = function(knex) {
  return knex.schema.createTable('movies', table => {
      table.increments()
      table.string('title').notNullable().defaultTo('')
      table.string('image').notNullable().defaultTo('')
      table.string('rating').notNullable().defaultTo('')
      table.string('genre').notNullable().defaultTo('')
      table.string('plot').notNullable().defaultTo('')
      table.string('cast').notNullable().defaultTo('')
      table.string('releaseDate').notNullable().defaultTo('')
      table.string('language').notNullable().defaultTo('')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('movies')
};
