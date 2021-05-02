
exports.up = function(knex) {
    return knex.schema.createTable('ratings', table => {
        table.increments()
        table.string('rating').notNullable().defaultTo('')
        table.integer('users_id').notNullable()
        table.foreign('users_id').references('users.id')
        table.integer('movies_id').notNullable()
        table.foreign('movies_id').references('movies.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments')
};
