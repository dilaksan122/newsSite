import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import './Cinema.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useCineWindowSize from './useCineWindowSize';

const Cinema = () => {
  const [cinemaNews, setCinemaNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const mainNewsRef = useRef(null);

  const { width } = useCineWindowSize();
  const itemsPerPage = width >= 1024 ? 10 : 5;

  useEffect(() => {
    const fetchCinemaData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/api/cinema-news');
        if (Array.isArray(response.data)) {
          setCinemaNews(response.data);

          setTrendingNews(response.data.filter(news => news.trending));
          setMostPopular(response.data.filter(news => news.popularity > 8));
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        setError('Failed to fetch cinema news');
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaData();
  }, []);

  const filteredCinemaNews = selectedCategory === 'All'
    ? cinemaNews
    : cinemaNews.filter(news => news.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCinemaNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCinemaNews.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (mainNewsRef.current) {
      mainNewsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, selectedCategory]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cinema-container">
      <div className="news-content">
        <div className="filter1">
          <label>Filter by Category:</label>
          <div className="category-buttons">
            {['All', 'Bollywood', 'Hollywood', 'Tollywood', 'Kollywood', 'Sandalwood', 'Mollywood', 'International'].map(category => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="main-news" ref={mainNewsRef}>
          <h2>{selectedCategory === 'All' ? 'All Cinema News' : `Cinema News - ${selectedCategory}`}</h2>
          {currentItems.length === 0 ? (
            <p>No cinema news available</p>
          ) : (
            <ul>
              {currentItems.map(news => (
                <li key={news.id} className="cinema-news-item">
                  <Link to={`/cinema/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{news.title}</h3>
                    {news.image && <img src={`http://localhost:8000/${news.image}`} alt={news.title} />}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {filteredCinemaNews.length > itemsPerPage && (
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </div>

        <div className="trending-news">
          <h2>Trending News</h2>
          <Slider {...sliderSettings}>
            {trendingNews.map(news => (
              <div key={news.id}>
                <Link to={`/cinema/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://localhost:8000/${news.image}`} alt={news.title} />}
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        <div className="popular-news">
          <h2>Popular News</h2>
          <Slider {...sliderSettings}>
            {mostPopular.map(news => (
              <div key={news.id}>
                <Link to={`/cinema/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://localhost:8000/${news.image}`} alt={news.title} />}
                </Link>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </div>
  );
};

export default Cinema;
