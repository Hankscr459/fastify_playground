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
            { _id: "bgsbrtrbtr4848", totalprice: 700, type: "a" },
            { _id: "bg1578254kyu48", totalprice: 2000, type: "b" },
            { _id: "bg15378jyt822a", totalprice: 300, type: "b" }
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
            { _id: "bgsykiiik52456t", totalprice: 10, type: "b" },
            { _id: "bgmjhmgjhm25u48", totalprice: 200, type: "a" },
            { _id: "b15tg378j4y822a", totalprice: 100, type: "a" }
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
            { _id: "bgsyrrfw252456t", totalprice: 10, type: "b" },
            { _id: "bgmjh3e32rm2u48", totalprice: 2100, type: "b" },
            { _id: "b1w55t378j4y82e", totalprice: 100, type: "b" }
        ]
    },
    {
        name: 'Eren Yeager',
        email: 'Eren@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member',
        bonusPoint: 5000000,
        assets: 7000,
        history: [
            { _id: "bgs2e12tgtr252t", totalprice: 10, type: "b" },
            { _id: "bgmjef74acm2u48", totalprice: 2100, type: "b" },
            { _id: "b1w4hh21y674y8e", totalprice: 100, type: "a" }
        ]
    },
    {
        name: 'Jimmy Trump',
        email: 'Jimmy@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member',
        bonusPoint: 9900,
        assets: 888000,
        history: [
            { _id: "bgs2e12tgtr252t", totalprice: 2000, type: "a" },
            { _id: "bgmjef74acm2u48", totalprice: 100, type: "b" },
            { _id: "b1w4hh21y674y8e", totalprice: 15550, type: "a" }
        ]
    },
    {
        name: 'Donald Trump',
        email: 'trump@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Admin',
        bonusPoint: 9900,
        assets: 9999999999999,
        history: [
            { _id: "bgs2e12t3r32gtr252t", totalprice: 3500, type: "a" },
            { _id: "bgmjef74ar23cm2u48", totalprice: 2000, type: "a" },
            { _id: "b1w4hh21yr23674y8e", totalprice: 99950, type: "a" }
        ]
    },
    {
        name: 'Alan Mead',
        email: 'alan@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member',
        bonusPoint: 2000,
        assets: 790000,
        history: [
            { _id: "bgs2e123rtgtr252t", totalprice: 3300, type: "b" },
            { _id: "bgmjef74r32acm2u48", totalprice: 200, type: "b" },
            { _id: "b1w4hh21y23r674y8e", totalprice: 50, type: "a" }
        ]
    },
    {
        name: 'Jean Kirschtein',
        email: 'Jean@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member',
        bonusPoint: 2200,
        assets: 30000,
        history: [
            { _id: "bgs2e12tr34343gtr252t", totalprice: 21300, type: "a" },
            { _id: "bgmjef744r43acm2u48", totalprice: 1100, type: "a" },
            { _id: "b1w4hfrefh21y674y8e", totalprice: 120, type: "b" }
        ]
    },
    {
        name: 'Conny Springer',
        email: 'Conny@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member',
        bonusPoint: 2200,
        assets: 30000,
        history: [
            { _id: "bgs2e12frfretgtr252t", totalprice: 2300, type: "b" },
            { _id: "bgmjef74acmfrefre2u48", totalprice: 70, type: "a" },
            { _id: "b1w4hh21y6frefre74y8e", totalprice: 1120, type: "b" }
        ]
    },
    {
        name: 'Erwin Smith',
        email: 'Erwin@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member',
        bonusPoint: 22200,
        assets: 3011000,
        history: [
            { _id: "bgs2e1ewfew2tgtr252t", totalprice: 12300, type: "b" },
            { _id: "bgmjeffewf74acm2u48", totalprice: 730, type: "a" },
            { _id: "b1w4hhfew21y674y8e", totalprice: 11220, type: "b" }
        ]
    },
    {
        name: 'Sasha Braus',
        email: 'Sasha@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'Member',
        bonusPoint: 22200,
        assets: 3000,
        history: [
            { _id: "bgs2e1ewfew2tgtr252t", totalprice: 12100, type: "b" },
            { _id: "bgmjeffewf74acm2u48", totalprice: 7110, type: "a" },
            { _id: "b1w4hhfew21y674y8e", totalprice: 12220, type: "b" }
        ]
    }
]

export default users