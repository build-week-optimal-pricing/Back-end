
exports.up = function(knex) {
  return knex.schema.createTable('hosts', table => {

    table.increments().unsigned();
    
    table.text('username')
      .notNullable()
      .unique();

    table.string('password', 60)
      .notNullable();

    table.text('image');
    
    table.text('name');

    table.text('phone');

    table.text('email');
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('hosts');
};
