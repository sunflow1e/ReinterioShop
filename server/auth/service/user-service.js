import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import client from '../db-connection.js'
import MailService from './mail-service.js'

dotenv.config()

const mailService = new MailService()

class UserService {
	//Создание пользователя
	async createUser(email, password, name, surname, patronymic) {
		//Проверка на существование пользователя
		const usersExist = await client.query(
			`select exists (select * from users where user_email = $1)`,
			[email]
		)
		if (usersExist.rows[0].exists) {
			return 'Пользователь с такой почтой уже существует'
		}
		const activationLink = uuidv4()

		//Отправка подтверждения на почту
		try {
			await mailService.sendActivationMail(
				email,
				`${process.env.API_URL}/user-auth/activate/${activationLink}`
			)
		} catch (e) {
			return 'Некорректная почта'
		}

		//Добавление пользователя в бд
		const user = await client.query(
			`insert into users (user_email, user_password, user_name, user_surname, user_patronymic, activationlink) values ($1, $2, $3, $4, $5, $6) returning *`,
			[email, password, name, surname, patronymic, activationLink]
		)
		if (user.rows[0].isactivated === false) {
			throw new Error('Аккаунт не подтвержден')
		}
		return user.rows[0]
	}

	async activate(activationLink) {
		const user = await client.query(
			`select exists (select * from users where activationlink = $1)`,
			[activationLink]
		)
		if (!user.rows[0].exists) {
			return 'Некорректная ссылка активации'
		}
		const activateUser = await client.query(
			`update users set isactivated = 'true' where activationlink = $1`,
			[activationLink]
		)
	}

	async login(email, password) {
		const user = await client.query(
			`select * from users where user_email = $1`,
			[email]
		)
		if (user.rows.length === 0) {
			throw new Error('Пользователь с такой почтой не найден.')
		}
		if (password !== user.rows[0].user_password) {
			throw new Error('Неверный пароль.')
		}
		if (!user.rows[0].isactivated) {
			throw new Error('Аккаунт не активирован.')
		}
		return user.rows[0].user_id
	}
}

export default UserService
