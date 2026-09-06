import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ! middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

app.use(express.json());
app.use(rateLimiter);
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// ! our simple middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
});

// mongodb+srv://<db_username>:Lz858ikjNbldgh53@cluster0.vklrvsa.mongodb.net/
