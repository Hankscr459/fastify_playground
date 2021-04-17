import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Admin',
        bonusPoint: 700000000,
        assets: 999999,
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
        role: 'Moderator',
        bonusPoint: 500,
        assets: 91000,
        history: [
            { _id: "bgsykiiik52456t", totalprice: 10 },
            { _id: "bgmjhmgjhm25u48", totalprice: 200 },
            { _id: "b15tg378j4y822a", totalprice: 100 }
        ]
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'VIP',
        bonusPoint: 200,
        assets: 10000,
        history: [
            { _id: "bgsyrrfw252456t", totalprice: 10 },
            { _id: "bgmjh3e32rm2u48", totalprice: 2100 },
            { _id: "b1w55t378j4y82e", totalprice: 100 }
        ]
    },
    {
        name: 'Eren Yeager',
        email: 'Eren@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member',
        bonusPoint: 5000000,
        assets: 7000,
    }
]

export default users