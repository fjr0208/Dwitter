// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
    {
        id: '1',
        username: 'bob',
        password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
        name: 'Bob',
        email: 'bob@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
];

export async function findByUsername(username) {
    return users.find((users) => users.username === username);
}

export async function createUser(signUser) {
    const created = { ...signUser, id: Date.now().toString() };
    users.push(created);
    return created.id;
}



// export async function comparePassword(username, password) {
//     const compareUser = findByUsername(username);

//     if (password != compareUser.password) {
//         return compareUser;
//     } else {
//         return null;
//     }

// }