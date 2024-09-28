// useFetchNews.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchNews = (url) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(url);
        setNews(response.data.slice(0, 3)); // Get the latest 3 news items
      } catch (error) {
        setError(`Failed to fetch ${url} news`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [url]);

  return { news, loading, error };
};

export default useFetchNews;
