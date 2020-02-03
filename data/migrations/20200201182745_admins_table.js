
exports.up = function(knex) {
  return knex.schema.createTable('admins', table => {
    table.increments().unsigned();
    
    table.text('username')
      .notNullable()
      .unique();

    table.string('password', 60)
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('admins');
};
