import { useEffect, useState } from "react";

import controleAPI from "../api/controleAPI.js";

const useFetchAPI = ({ endPoint, method, body = null, headers = null }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        setLoading(true);
        const { data } = await controleAPI[method](
          endPoint,
          JSON.parse(headers),
          JSON.parse(body)
        );
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      fetchDataFromAPI();
    };
  }, [endPoint, method, body, headers]);

  return { data, error, loading };
};

export default useFetchAPI;
