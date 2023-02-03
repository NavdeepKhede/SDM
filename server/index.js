import express from "express"; // web framework for NodeJs
import morgan from "morgan"; // HTTP request logger middleware for NodeJs
import http from "http";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongosanitize from "express-mongo-sanitize";
import bodyParser from "body-parser";
import xss from "xss-clean";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true, //  Access-Control-Allow-Credentials is a header that, when set to true , tells browsers to expose the response to the frontend JavaScript code. The credentials consist of cookies, authorization headers, and TLS client certificates.
  })
);

// Setup express response and body parser configurations
app.use(express.json({ limit: "10kb" })); // Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
app.use(bodyParser.json()); // Returns middleware that only parses json
app.use(bodyParser.urlencoded({ extended: true })); // Returns middleware that only parses urlencoded bodies

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: "Too many requests from this IP, Please try again in an hour",
});

app.use("/chatat", limiter);

app.use(
  express.urlencoded({
    extended: true,
  })
); // Returns middleware that only parses urlencoded bodies

app.use(mongosanitize());
app.use(xss());

app.use(router);

const port = process.env.PORT || 6000;

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1); // Exit Code 1 indicates that a container shut down, either because of an application failure.
});

const server = http.createServer(app);

const DB = process.env.MONGO_URL.replace("<PASSWORD>", process.env.DBPASSWORD);

mongoose.set("strictQuery", false);

mongoose
  .connect(DB, {
    useNewUrlParser: true, // The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
    useUnifiedTopology: true, // Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true , except for the unlikely case that it prevents you from maintaining a stable connection.
  })
  .then(() => {
    console.log("MongoDb connection is successful");
  })
  .catch((error) => console.log("Error: ", error));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1); //  Exit Code 1 indicates that a container shut down, either because of an application failure.
  });
});
