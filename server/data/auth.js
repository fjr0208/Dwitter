
let user = [{
    id: '1',
    username: 'username1',
    password: 'password1',
    name: 'name1',
    email: 'fjrzl6@naver.com',
    url: ''
}]

export async function findByUsername(username) {
    return user.find((user) => user.username === username);
}

export async function createUser(signUser) {
    const created = { ...signUser, id: Date.now().toString() };
    user.push(created);
    return created.id;
}


export async function findPassword(username, password) {
    const compareUser = findByUsername(username);

    return compareUser.password;

}