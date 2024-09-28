import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import './Health.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useHealthWindowSize from './useHealthWindowSize';
import { translateText } from '../../utils/translate'; // Ensure the correct path

const Health = () => {
  const [healthNews, setHealthNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [editorsPicks, setEditorsPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const windowSize = useHealthWindowSize();

  const mainNewsRef = useRef(null);

  useEffect(() => {
    if (mainNewsRef.current) {
      mainNewsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/api/health');
        if (Array.isArray(response.data)) {
          setHealthNews(response.data);

          const trending = response.data.filter(news => news.trending);
          setTrendingNews(trending);

          const popular = response.data.filter(news => news.popularity > 8);
          setMostPopular(popular);

          const picks = response.data.filter(news => news.editorPick);
          setEditorsPicks(picks);
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        setError('Failed to fetch health news');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  const itemsPerPage = windowSize.width >= 1200 ? 10 : 5;

  const filteredHealthNews = selectedCategory === 'All'
    ? healthNews
    : healthNews.filter(news => news.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHealthNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHealthNews.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true, // Ensure arrows are always visible
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  
  return (
    <div className="health-page1">
      <div className="category-filter5">
        <div className="category-buttons5">
          {['All', 'Nutrition', 'Mental Health', 'Fitness', 'Wellness'].map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'category-button active' : 'category-button'}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <h2>{selectedCategory === 'All' ? 'All Health News' : `Health News - ${selectedCategory}`}</h2>
      <div className="news-main1" ref={mainNewsRef}>
     
        {currentItems.length === 0 ? (
          <p>No health news available</p>
        ) : (
          <ul className="news-list1">
            {currentItems.map(news => (
              <li key={news.id} className="news-item1">
                <Link to={`/health/${news.slug}`} className="news-link">
                  <h3 className="news-title">{news.name}</h3>
                  {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} className="news-image" />}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {filteredHealthNews.length > itemsPerPage && (
          <div className="pagination-controls1">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-button">Previous</button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">Next</button>
          </div>
        )}
      </div>

      <div className="popular-news1">
        <h2>Popular News</h2>
        <Slider {...sliderSettings}>
          {mostPopular.map(news => (
            <div key={news.id} className="news-card">
              <Link to={`/health/${news.slug}`} className="news-link">
                <h3 className="news-title">{news.name}</h3>
                {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} className="news-image" />}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Health;
