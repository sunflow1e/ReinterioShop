import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const conStringPri = `postgres://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}/${process.env.DATABASE_DB}`
const { Client } = pg
const client = new Client({ connectionString: conStringPri })
client.connect()

export default client
