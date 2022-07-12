import { Job } from "../models/job/job.model.js";
import { User } from "../models/user/user.model.js";

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

export const likeOrUnlikeJob = async (req, res) => {
  // get user's id from auth and jobObjectId from clicking on a specific job. if exist remove, else add
  const userId = req.user._id;
  const { jobObjectId } = req.body;
  try {
    const liked = req.user.likedJobs.includes(jobObjectId);

    if (liked) {
      await User.updateOne(
        { _id: userId },
        { $pull: { likedJobs: jobObjectId } }
      );
      await Job.updateOne(
        { _id: jobObjectId },
        { $pull: { usersWhoLiked: userId } }
      );
    } else {
      await User.updateOne(
        { _id: userId },
        { $push: { likedJobs: jobObjectId } }
      );
      await Job.updateOne(
        { _id: jobObjectId },
        { $push: { usersWhoLiked: userId } }
      );
    }
    res.status(201).send("liked or unliked succesfuly");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
