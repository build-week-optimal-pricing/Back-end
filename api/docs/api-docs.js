const {
  //containers
  //bigbois
  docs__cont,
  routes__cont,
  auth__cont,
  host__cont,
  //mediumbois
  auth__reg__cont,

  //listbody
  route__list,

  //headings
  docs__h1,
  __h2,
  //route items
  list__lh,
  list__item
} = require('./docs-inline-styles');

const docs = `
<div ${style = docs__cont}>
  <h1 ${style = docs__h1}>Backend API Routes</h1>
  <div ${style = routes__cont}>
    <div ${style = auth__cont}>
      <h2 ${style = __h2}>Auth</h2>
      <div ${style = auth__reg__cont}>

        <h3>Host Registration</h3>
        <ul ${style = route__list}>
          <lh ${style = list__lh}>POST /api/auth/registerHost</lh>
          <li>Expects: { username: [string], password: [string] }</li>
          <li>Returns: { message: [string], resource: { id: [int], username: [string] } }</li>
        </ul>
        <ul>
          <lh ${style = list__lh}>DELETE /api/auth/registerHost/:hostId</lh>
          <li ${style = list__item}>No payload required</li>
          <li ${style = list__item}>Returns: { message/error: [string], resource: [int] }</li>
        </ul>
        <ul>
          <lh ${style = list__lh}>PUT /api/auth/registerHost/:hostId</lh>
          <li ${style = list__item}>Expects: { listings_count: [int], num_reviews: [int], last_review_time: [int(in seconds)] }</li>
          <li ${style = list__item}>Returns: { message/error: [string], 
            resource: {
              id: [num],
              username: [string],
              password: [hash],
              listings_count: [int],
              num_reviews: [int],
              last_review_time: [int]
            } }</li>
        </ul>

        <h3>Admin Registration</h3>
        <ul>
          <lh ${style = list__lh}>POST /api/auth/registerAdmin</lh>
          <li ${style = list__item}>Expects: { username: [string], password: [password(string)] }</li>
          <li ${style = list__item}>Returns: { message: [string], resource: [string]}</li>
        </ul>

      </div>
      <div>
        <h3>Login</h3>
        <ul>
          <lh ${style = list__lh}>POST /api/auth/login</lh>
          <li ${style = list__item}>Expects: { username: [string], password: [string] }</li>
          <li ${style = list__item}>Returns: { message: [string], token: [string] }</li>
        </ul>
      </div>
    </div>

    <div>

      <h2>Listings</h2>

      <div>
        <ul>
          <lh ${style = list__lh}>GET /api/restricted/listings</lh>
          <li ${style = list__item}>Returns: { message: [string], resource: [arr] }</li>
        </ul>
      </div>

      <div>
        <ul>
          <lh ${style = list__lh}>GET /api/restricted/listings/:hostId</lh>
          <li ${style = list__item}>Returns: { message: [string], resource: [obj] }</li>
        </ul>
      </div>

      <div>
        <ul>
          <lh ${style = list__lh}>POST /api/restricted/listings</lh>
          <li ${style = list__item}>Expects: {
            username: [string, required, unique],
            password: [string, any length]
          }
          <li ${style = list__item}>Returns: { message: [string], resource: [arr] }</li>
        </ul>
      </div>

      <div>
        <ul>
          <lh ${style = list__lh}>DELETE /api/restricted/listings/:hostId</lh>
          <li ${style = list__item}>Returns: { message: [string], resource: [int(num of records deleted)] }</li>
        </ul>
      </div>

      <div>
        <ul>
          <lh ${style = list__lh}>PUT /api/restricted/listings/:listingId</lh>
          <li>Note: To edit a listing, the id entered must uniquely identify the listing. [ie. use 'id', not 'host_id']</li>
          <li>Note: Endpoint likely not working yet</li>
          <li ${style = list__item}>Returns: { message: [string], resource: [int(num of records deleted)] }</li>
        </ul>
      </div>

    </div>
  </div>
</div>
`

module.exports = docs;