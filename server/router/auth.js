import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import *as authController from '../controller/auth.js';
import validate from '../validation/validator.js';

const router = express.Router();

const validateLogin = [
    body('username')
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('username 최소 2글자 이상 입력 해주세요'),

    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password 최소 5글자 이상 입력 해주세요'),

    validate,

];

const validateSignup = [
    ...validateLogin,
    body('name').notEmpty().withMessage('name이 비어있습니다'),
    body('email').isEmail().normalizeEmail().withMessage('email 형식을 확인해주세요'),
    body('url').isURL().withMessage('URL 형식을 확인해주세요').optional({ nullable: true, checkFalsy: true }),
    validate
]


router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateLogin, authController.login);

router.get('/me', authController.me);

export default router;