
exports.up = function(knex) {
  return knex.schema.createTable('listings', table => {
    table.increments().unsigned();
    table.text('image');

    table.text('street')
      .notNullable();

    table.text('city')
      .notNullable();

    table.text('state')
      .notNullable();

    table.text('zip')
      .notNullable();

    table.integer('bedrooms')
      .unsigned();
    table.integer('bathrooms')
      .unsigned();
    table.integer('beds')
      .unsigned();

    table.decimal('deposit')
      .unsigned();
    table.decimal('cleaningFee')
      .unsigned();

    table.integer('minNights')
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
