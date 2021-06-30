const { findUser, findUserByUsername, findUserBySearch } = require('../_services/fakedb')

const getUserByQuery = (req, res) => {
  const userId = req.query.id
  const user = findUser(userId)

  if (user) {
    res.send(`<html><body><p>
       ${user.name}<br>
       ${user.email}<br>
       ${user.skills.join(' &amp; ')}
     </p></body></html>`)
  } else {
    res.send('User does not exist')
  }
}

const getUserByPath = (req, res) => {
  const username = req.params.username
  const user = findUserByUsername(username)

  if (user) res.send(`${user.name} [${user.email}]`)
  else res.send('User does not exist')
}

const getUserByForm = (req, res) => {
  const search = req.body.search
  const user = findUserBySearch(search)

  if (user) res.send(`${search} matches ${user.name}`)
  else res.send(`No results for ${search}`)
}

const search = (req, res) => {
  res.send(`<html><body><form action="/users" method="post">
      <input name="search" />
      <button type="submit">Search</button>
    </form></body></html>`)
}

module.exports = {
  getUserByQuery,
  getUserByPath,
  getUserByForm,
  search
}
