import React, { useState, useEffect } from "react";

import "./jobsPage.css";
import Job from "../../components/job/Job";
import controleAPI from "../../api/controleAPI";
import AppPagination from "../../components/pagination/Pagination";
import filterIcon from "../../assets/images/filter-icon.svg";
import FilterMenu from "../../components/filterMenu/FilterMenu";

function JobsPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [companiesFilterStr, setCompaniesFilterStr] = useState("");
  const [departmentsFilterStr, setDepartmentsFilterStr] = useState("");
  const [locationsFilterStr, setLocationsFilterStr] = useState("");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);
      window.scrollTo({ top: 0 });
      try {
        const { data } = await controleAPI.get("/jobs", {
          params: {
            page: page,
            search: term,
            company: companiesFilterStr,
            department: departmentsFilterStr,
            location: locationsFilterStr,
          },
        });
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!term) {
      fetchDataFromAPI();
    } else {
      const timeoutId = setTimeout(() => {
        fetchDataFromAPI();
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [
    page,
    term,
    companiesFilterStr,
    departmentsFilterStr,
    locationsFilterStr,
  ]);

  const printJobs = () => {
    if (data.total === 0) {
      return <h1>No results</h1>;
    }
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
        <img
          className="filter-icon"
          src={filterIcon}
          alt="filter"
          onClick={() => setIsFilterOpen(true)}
        />
        {isFilterOpen && (
          <FilterMenu
            setIsFilterOpen={setIsFilterOpen}
            setCompaniesStr={setCompaniesFilterStr}
            setDepartmentsStr={setDepartmentsFilterStr}
            setLocationsStr={setLocationsFilterStr}
            companies={data.companies}
            departments={data.departments}
            locations={data.locations}
          />
        )}
      </div>
      {loading ? (
        <h1>spinner</h1>
      ) : (
        <>
          <ul className="jobs-list">{printJobs()}</ul>
          <div className="pagination-container">
            <AppPagination
              maxPage={maxPage}
              goToPage={setPage}
              currPage={page}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default JobsPage;
