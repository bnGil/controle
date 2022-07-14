import React, { useState, useEffect } from "react";

import "./jobsPage.css";
import Job from "../../components/job/Job";
import controleAPI from "../../api/controleAPI";
import Pagination from "../../components/pagination/Pagination";

function JobsPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const { data } = await controleAPI.get("/jobs", {
          params: {
            page: page,
            search: term,
          },
        });
        //`/jobs?page=${page}&search=${term}`
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchDataFromAPI();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [page, term]);

  const printJobs = () => {
    return data.jobs.map((job) => <Job job={job} key={job._id} />);
  };

  if (error) {
    return <h1>{error.message}</h1>;
  }

  const maxPage = Math.ceil(data.total / 5);

  return (
    <div className="jobspage-container">
      <div className="search">
        <input
          type="text"
          placeholder="Job Title..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <h1>spinner</h1>
      ) : (
        <ul className="jobs-list">{printJobs()}</ul>
      )}
      <Pagination maxPage={maxPage} goToPage={setPage} />
    </div>
  );
}

export default JobsPage;
