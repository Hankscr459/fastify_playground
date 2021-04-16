const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Admin'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Moderator'
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'VIP'
    },
    {
        name: 'Eren Yeager',
        email: 'Eren@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member'
    }
]

module.exports = users