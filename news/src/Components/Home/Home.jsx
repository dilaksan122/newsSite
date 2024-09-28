import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [latestCineNews, setLatestCineNews] = useState([]);
  const [latestSportsNews, setLatestSportsNews] = useState([]);
  const [latestTechnologyNews, setLatestTechnologyNews] = useState([]);
  const [latestReviewNews, setLatestReviewNews] = useState([]);
  const [healthNews, setHealthNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      try {
        const [cineResponse, sportsResponse, techResponse, reviewResponse, healthResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/api/cinema-news'),
          axios.get('http://localhost:8000/api/api/sports-news'),
          axios.get('http://localhost:8000/api/api/technology-news'),
          axios.get('http://localhost:8000/api/api/reviews'),
          axios.get('http://localhost:8000/api/api/health')
        ]);

        if (Array.isArray(cineResponse.data)) {
          setLatestCineNews(cineResponse.data.slice(0, 4));
        } else {
          setError("Cinema News data is not an array");
        }

        if (Array.isArray(sportsResponse.data)) {
          setLatestSportsNews(sportsResponse.data.slice(0, 4));
        } else {
          setError("Sports News data is not an array");
        }

        if (Array.isArray(techResponse.data)) {
          setLatestTechnologyNews(techResponse.data.slice(0, 4));
        } else {
          setError("Technology News data is not an array");
        }

        if (Array.isArray(reviewResponse.data)) {
          setLatestReviewNews(reviewResponse.data.slice(0, 4));
        } else {
          setError("Review News data is not an array");
        }

        if (Array.isArray(healthResponse.data)) {
          setHealthNews(healthResponse.data.slice(0, 4));
        } else {
          setError("Health News data is not an array");
        }
      } catch (error) {
        setError("Failed to fetch news data");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <div className='home'>
      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Loading...</p>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          
          <div className="news-section latestCineNews">
            <h2>Important Cinema News</h2>
            {latestCineNews.length === 0 ? (
              <p>No latest Cinema news available</p>
            ) : (
              <ul>
                {latestCineNews.map((news) => (
                  <li key={news.id}>
                    <Link to={`/cinema/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{news.title}</h3>
                      {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="news-section latestSportsNews">
            <h2>Important Sports News</h2>
            {latestSportsNews.length === 0 ? (
              <p>No Sports news available</p>
            ) : (
              <ul>
                {latestSportsNews.map((news) => (
                  <li key={news.id}>
                    <Link to={`/sports/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{news.title}</h3>
                      {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="news-section latestTechnologyNews">
            <h2>Latest Technology News</h2>
            {latestTechnologyNews.length === 0 ? (
              <p>No Technology news available</p>
            ) : (
              <ul>
                {latestTechnologyNews.map((news) => (
                  <li key={news.id}>
                    <Link to={`/technology/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{news.title}</h3>
                      {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="news-section latestReviewNews">
            <h2>Latest Review News</h2>
            {latestReviewNews.length === 0 ? (
              <p>No Review news available</p>
            ) : (
              <ul>
                {latestReviewNews.map((news) => (
                  <li key={news.id}>
                    <Link to={`/reviews/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{news.title}</h3>
                      {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="news-section healthNews">
            <h2>Health News</h2>
            {healthNews.length === 0 ? (
              <p>No Health news available</p>
            ) : (
              <ul>
                {healthNews.map((news) => (
                  <li key={news.id}>
                    <Link to={`/health/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{news.name}</h3>
                      {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.name} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
