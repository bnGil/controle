import { useEffect, useState } from "react";

import API from "../api/controleAPI.js";

const useFetchAPI = (endPoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (endPoint) {
      const fetchDataFromAPI = async () => {
        try {
          setLoading(true);
          const { data } = await API.get(endPoint);
          setData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDataFromAPI();
    }
  }, [endPoint]);
  return { data, error, loading };
};
export default useFetchAPI;
