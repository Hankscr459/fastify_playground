import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Admin',
        history: [
            { _id: "bgsbrtrbtr4848", totalprice: 700 },
            { _id: "bg1578254kyu48", totalprice: 2000 },
            { _id: "bg15378jyt822a", totalprice: 300 }
        ]
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

export default users