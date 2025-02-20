import {neon} from '@neondatabase/serverless'
import dotenv from 'dotenv'

dotenv.config()

const sql = neon(process.env.NEONDB_URL);

export default sql