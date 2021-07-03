const users = {
  0: {
    name: 'Charles',
    email: 'charlesa@nu.ac.th',
    skills: ['talking']
  },
  1: {
    name: 'Mook',
    email: 'areeyac62@nu.ac.th',
    skills: ['js', 'node', 'expressjs', 'terminal']
  },
  2: {
    name: 'Joker',
    email: 'kanokpolt62@nu.ac.th',
    skills: ['js', 'node', 'expressjs', 'terminal']
  },
  3: {
    name: 'Oat',
    email: 'nuttapolt62@nu.ac.th',
    skills: ['js', 'node', 'expressjs', 'terminal']
  },
  4: {
    name: 'Chinjung',
    email: 'parinyak62@nu.ac.th',
    skills: ['js', 'node', 'expressjs', 'terminal']
  }
}

const findUser = (id) => {
  return users[id]
}

const findUserByUsername = (username) => {
  return Object.values(users).find(
    user => username === user.email.split('@')[0])
}

const findUserBySearch = (search) => {
  const lowerSearch = search.toLowerCase()
  return Object.values(users).find(
    user => user.name.toLowerCase().includes(lowerSearch))
}

const products = {
  lenovo: {},
  asus: {}
}

const findProducts = (q) => {
  return products[q]
}

module.exports = {
  findUser,
  findUserByUsername,
  findUserBySearch,
  findProducts
}
