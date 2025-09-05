import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();

const allowedOrigins = [
  "https://paper-stack-finalproject-frontend.onrender.com",
  "https://paper-stack-finalproject-admin.onrender.com"
];

app.use(express.json())
app.use(express.urlencoded())

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // ✅ allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser())

//Routes
import { authRouter } from './routes/auth.routes.js';
import { subjectRouter } from './routes/subject.routes.js';
import { notesRouter } from './routes/notes.routes.js';


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/subject", subjectRouter)
app.use("/api/v1/notes", notesRouter)



export { app }
