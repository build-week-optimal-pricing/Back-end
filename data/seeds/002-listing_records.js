
exports.seed = function(knex) {

  return knex('listings').insert([
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"},
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"},
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"},
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"},
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"},
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"},
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"},
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"},
    {host_id: 1, neighborhood: 'Reinickendorf', bedrooms: 2, bathrooms: 3, beds: 4, availability: 50, deposit: 500, cleaning_fee: 50, min_nights: 3, room_type: "Private room"}
  ])

}