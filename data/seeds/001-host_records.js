const bcryptjs = require('bcryptjs');
exports.seed = function(knex) {

  const hashedPasswords = [
    hashMyPass('password1'),
    hashMyPass('password2'),
    hashMyPass('password3')
  ]

  function hashMyPass(password) {
    return bcryptjs.hashSync(password, 5);
  }

  return knex('hosts').insert([
    {username: 'kyetOwnsHomes', password: hashedPasswords[0], num_reviews: 5, last_review_time: 60 * 60 * 24 * 5},
    {username: 'kyetsCardboardPlacements', password: hashedPasswords[0], num_reviews: 50, last_review_time: 60 * 60 * 24 * 10},
    {username: 'huisFlats', password: hashedPasswords[0], num_reviews: 150, last_review_time: 60 * 60 * 24 * 30}
  ]);

};
