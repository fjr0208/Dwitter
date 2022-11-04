import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { } from 'express-async-errors';
import * as authRepository from '../data/auth.js';

const jwtSecretKey = '123';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = '10';


export async function signup(req, res) {
    const { username, password, name, email, url } = req.body;



    //username 중복 검사후 중복이 되지 않는다면 signupUser 를 user목록에 추가
    //중복이면 실패 스테이터스와 실패 메시지 발행
    const found = await authRepository.findByUsername(username);
    if (found) {
        return res.status(409).json({ message: `${username}이 이미 존재합니다` })
    }

    //암호를 bcrypt로 안전하게 바꾸기
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await authRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    });
    //성공적으로 추가하면 res.status(201)

    const token = createJwtToken(userId);

    res.status(201).json(token, username);


}

export async function login(req, res) {

    const { username, password } = req.body;

    //find or filter사용해서 username 검색 있으면 username.find 로 password가 동일한지 확인
    const user = await authRepository.findByUsername(username);

    // 안맞는 조건있으면 바로 실패 리턴 과 실패 메시지 출력
    if (!user) {
        return res.status(401).json({ message: `${username}이 존재하지 않습니다.` });
    }
    // 암호 비교할때는 bcrypt로 실행

    // const comparePassword = await bcrypt.compare(password, user.password);

    // if (!comparePassword) {
    //     return res.status(401).json({ message: '비밀번호가 틀립니다' });
    // }
    const findedPassword = await authRepository.findPassword(username, password);
    if (findedPassword) {
        return res.status(401).json(findedPassword);
    }

    // 모두 같으면 jwt 토큰 발행
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username });
}

export async function me() {
    // ???? 아직 감이 안옴 좀 더 고민해봐야될듯

}

function createJwtToken(id) {
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
