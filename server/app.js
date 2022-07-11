import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import "./db/mongoose.js";
import { indexRouter } from "./routes/index.routes.js";

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const publicPath = path.join(__dirname, "../client/build");

const app = express();

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", indexRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// import { Job } from "./models/job/job.model.js";
// async function main() {
//   const jobs = await Job.find({
//     department: { $regex: "", $options: "i" },
//   });
//   const companies = await Job.find({}).distinct("company");
//   const departments = await Job.find({}).distinct("department");
//   // console.log("----------------------");
//   console.log(departments);
// }
// await main();
