
exports.up = function(knex) {
  return knex.schema.createTable('listings', table => {
    table.increments().unsigned();

    table.text('image');
    table.text('street');
    table.text('city');
    table.text('state');
    table.text('zip');

    table.text('room_type');
    table.text('neighborhood');

    table.integer('bedrooms')
      .unsigned();
    table.integer('bathrooms')
      .unsigned();
    table.integer('beds')
      .unsigned();
    table.integer('availability')
      .unsigned();

    table.decimal('deposit')
      .unsigned();
    table.decimal('cleaning_fee')
      .unsigned();
    table.integer('min_nights')
      .unsigned();

    //f key

    table.integer('host_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('hosts');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('listings');
};
