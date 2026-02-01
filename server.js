import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { connectDB } from "./db/connect.js";

//router imports
import examsRouter from "./routes/examsRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//middleware imports
import { notFound } from "./middleware/notFound.js";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";

//cookie-parser
import cookieParser from "cookie-parser";

// security imports
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
// app.use(helmet());
// app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/exams", examsRouter);
app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
