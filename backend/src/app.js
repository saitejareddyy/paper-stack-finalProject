import express from 'express';
import cookieParser from 'cookie-parser'


const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

//Routes
import { authRouter } from './routes/auth.routes.js';
import { subjectRouter } from './routes/subject.routes.js';
import { notesRouter } from './routes/notes.routes.js';


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/subject", subjectRouter)
app.use("/api/v1/notes", notesRouter)



export { app }
