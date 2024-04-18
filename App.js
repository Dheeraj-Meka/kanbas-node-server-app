import express from 'express';
import Hello from './Hello.js'
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import mongoose from 'mongoose';
import UserRoutes from './Kanbas/users/routes.js';
import session from 'express-session';
import "dotenv/config";


const CONNECTION_STRING = process.env.REACT_APP_KANBAS_DB_CONNECTION_STRING;
const DB_NAME = process.env.REACT_APP_DB_NAME;
mongoose.connect(CONNECTION_STRING, { dbName: DB_NAME});


const app = express();
  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      sameSite: "none",
      secure: true
      //domain: process.env.HTTP_SERVER_DOMAIN,
    }
  };
  app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
  }));
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }

app.use(express.json());
app.use(session(sessionOptions));
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
