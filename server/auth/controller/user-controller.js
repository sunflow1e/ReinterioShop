import dotenv from 'dotenv'
import UserService from '../service/user-service.js'

dotenv.config()
const userService = new UserService()

class UserController {
	async createUser(req, res) {
		try {
			const { email, password, name, surname, patronymic } = req.body
			console.log(email, password, name, surname, patronymic)
			const userData = await userService.createUser(
				email,
				password,
				name,
				surname,
				patronymic
			)
			return res.json(userData)
		} catch (e) {
			return res
				.status(500)
				.json({ message: 'Ошибка при создании пользователя', error: e.message })
		}
	}

	async loginUser(req, res) {
		try {
			const { email, password } = req.body
			const userData = await userService.login(email, password)
			return res.json(userData)
		} catch (e) {
			return res
				.status(500)
				.json({ message: 'Ошибка при входе в систему', error: e.message })
		}
	}

	async activate(req, res) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			return res
				.status(500)
				.json({ message: 'Ошибка при активации аккаунта', error: e.message })
		}
	}
}

export default UserController
