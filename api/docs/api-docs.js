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
          <li>Expects: { username: <username>, password: <password> }</li>
          <li>Returns: { message: [message], resource: [resource]: { id: [hostId], username: [username] } }</li>
        </ul>
        <ul>
          <lh ${style = list__lh}>DELETE /api/auth/registerHost:id</lh>
          <li ${style = list__item}>No payload required</li>
          <li ${style = list__item}>Returns: { message/error: [message]/[error], resource: [number deleted] }</li>
        </ul>

        <h3>Admin Registration</h3>
        <ul>
          <lh ${style = list__lh}>POST /api/auth/registerAdmin</lh>
          <li ${style = list__item}>Expects: { username: [username], password: [password] }</li>
          <li ${style = list__item}>Returns: { message: [message], resource: [username]}</li>
        </ul>

      </div>
      <div>
        <h3>Auth</h3>
        <ul>
          <lh ${style = list__lh}>Login</lh>
          <li ${style = list__item}>Expects: { username: [username], password: [password] }</li>
          <li ${style = list__item}>Returns: { message: [message], token: [token] }</li>
        </ul>
      </div>

    </div>
  </div>
</div>
`

module.exports = docs;