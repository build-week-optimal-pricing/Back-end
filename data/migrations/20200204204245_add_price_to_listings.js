
exports.up = function(knex) {
  return knex.schema.table('listings', table => {
    table.decimal('price')
      .unsigned();
  })
};

exports.down = function(knex) {
  return knex.schema.table('listings', table => {
    table.dropColumn('price');
  })
};
