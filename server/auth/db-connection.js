import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const conStringPri = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
const { Client } = pg
const client = new Client({ connectionString: conStringPri })
client.connect()

export default client
