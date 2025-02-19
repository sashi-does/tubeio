import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();


const neonDB = neon(process.env.NEONDB_URL);
console.log("NeonDB connected");

export default neonDB;
