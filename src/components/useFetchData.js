import { useState, useEffect } from "react";

const useFetchData = (urls) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
        setData(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]);

  return { data, loading, error };
};

export default useFetchData;
