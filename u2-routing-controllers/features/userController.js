const { findUser, findUserByUsername, findUserBySearch } = require('../_services/fakedb')

const getUserByQuery = (req, res) => {
  // Inputs (query string)
  const userId = req.query.id

  // Get & validate user
  const user = findUser(userId)
  if (!user) return res.status(404).send('User does not exist')

  // Send response
  res.send(`<html><body><p>
       ${user.name}<br>
       ${user.email}<br>
       ${user.skills.join(' &amp; ')}
     </p></body></html>`)
}

const getUserByPath = (req, res) => {
  // Inputs (path params)
  const username = req.params.username

  // Get & validate user
  const user = findUserByUsername(username)
  if (!user) return res.status(404).send('User does not exist')

  // Send response
  res.send(`${user.name} [${user.email}]`)
}

const getUserByForm = (req, res) => {
  // Inputs (post body)
  const searchTerms = req.body.search

  // Get & validate user
  const user = findUserBySearch(searchTerms)
  if (!user) return res.send(`No results for ${searchTerms}`)

  // Send response
  res.send(`${searchTerms} matches ${user.name}`)
}

const search = (_req, res) => {
  // Send form
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
