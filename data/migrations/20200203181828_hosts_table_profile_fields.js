
exports.up = function(knex) {
  return knex.schema.table('hosts', table => {
    table.integer('listings_count')
      .unsigned();
    table.integer('num_reviews')
      .unsigned();
    table.integer('last_review_time')
      .unsigned();

  })
};

exports.down = function(knex) {
  return knex.schema.table('hosts', table => {
    table.dropColumn('listings_count');
    table.dropColumn('num_reviews');
    table.dropColumn('last_review_time');
  })
};
