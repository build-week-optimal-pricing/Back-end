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
          <li>Receives: { [username], [password] }</li>
          <li>Returns: { [message], [resource]: {[id], [username]} }</li>
        </ul>
        <ul>
          <lh ${style = list__lh}>GET /api/auth/removeUser</lh>
          <li ${style = list__item}>Receives: { [id] }</li>
          <li ${style = list__item}>Returns: { [message]/[error], [username], [id] }</li>
        </ul>
      </div>
      <ul>
        <lh ${style = list__lh}>Login</lh>
      </ul>

      <ul>
        <lh ${style = list__lh}>Logout</lh>
      </ul>

    </div>
    <div ${style = host__cont}>
      <h2 ${style = __h2}>Hosts</h2>
    </div>
    <div>
      <h2 ${style = __h2}>Listings</h2>
    </div>
  </div>
</div>
`

module.exports = docs;