import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_PUBLIC_URL}api${url}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PUBLIC_URL}api${url}`);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
  };

  return { data, error, reFetch };
};

export default useFetch;
