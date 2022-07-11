import { Job } from "../models/job/job.model.js";

export const getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let company = req.query.company || "all";
    let department = req.query.department || "all";

    const companiesList = await Job.find({}).distinct("company");
    const departmentsList = await Job.find({}).distinct("department");

    company =
      company === "all" ? [...companiesList] : req.query.company.split(",");
    department =
      department === "all"
        ? [...departmentsList]
        : req.query.department.split(",");

    const jobs = await Job.find({ title: { $regex: search, $options: "i" } })
      .where("company")
      .in([...company])
      .where("department")
      .in([...department])
      .sort("-createdAt")
      .skip(page * limit)
      .limit(limit);

    const total = await Job.countDocuments({
      company: { $in: [...company] },
      department: { $in: [...department] },
      title: { $regex: search, $options: "i" },
    });

    const response = {
      total,
      page: page + 1,
      limit,
      companies: companiesList,
      departments: departmentsList,
      jobs,
    };

    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
