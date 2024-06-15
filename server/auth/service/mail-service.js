import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

class MailService {
	constructor() {
		console.log(process.env.SMTP_PORT, process.env.SMTP_HOST)
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}
	async sendActivationMail(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Активация аккаунта на ' + process.env.API_URL,
			text: '',
			html: `
	        <div>
	          <h1>Для активации перейдите по ссылке и пройдите авторизацию</h1>
	          <a href="${link}">${link}</a>
	        </div>
	      `,
		})
	}
}

export default MailService
