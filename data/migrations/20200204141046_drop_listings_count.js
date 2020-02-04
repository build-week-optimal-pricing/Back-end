
exports.up = function(knex) {
  return knex.schema.table('hosts', table => {
    table.dropColumn('listings_count');
  })
};

exports.down = function(knex) {
  return knex.schema.table('hosts', table => {
    table.integer('listings_count')
      .unsigned();
  })
};
