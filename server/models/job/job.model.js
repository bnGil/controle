import mongoose from "mongoose";

import { jobSchema } from "./job.schema.js";

export const Job = mongoose.model("Job", jobSchema);
