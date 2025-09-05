import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

import { app } from "./app.js";
import { connectDB } from './db/index.js';


const PORT = process.env.PORT

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})