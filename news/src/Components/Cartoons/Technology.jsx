import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './Technology1.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Technology = () => {
  const [technologyNews, setTechnologyNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchTechnologyNews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/api/technology-news');
        if (Array.isArray(response.data)) {
          setTechnologyNews(response.data);
          setTotalItems(response.data.length);

          const trending = response.data.filter(news => news.trending);
          setTrendingNews(trending);

          const popular = response.data.filter(news => news.popularity > 8);
          setPopularNews(popular);
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        setError('Failed to fetch technology news');
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologyNews();
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerPage(100);
      } else {
        setItemsPerPage(10);
      }
    };

    updateItemsPerPage();

    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const filteredTechnologyNews = selectedCategory === 'All'
    ? technologyNews
    : technologyNews.filter(news => news.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTechnologyNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTechnologyNews.length / itemsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  const categories = ['AI', 'Blockchain', 'Robotics', 'Cybersecurity', 'Gadgets', 'Software', 'Mobile', 'Internet'];

  return (
    <>
      <div className="filter1">
        <label className='heading1'>Filter by Category:</label>
        <div className="category-buttons1">
          {['All', ...categories].map(category => (
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
      <div className="technology-container">
        <div className="news-content">
          <div className="main-news">
            <h2>{selectedCategory === 'All' ? 'All Technology News' : `Technology News - ${selectedCategory}`}</h2>
            {currentItems.length === 0 ? (
              <p>No technology news available</p>
            ) : (
              <ul>
                {currentItems.map(news => (
                  <li key={news.id} className="technology-news-item">
                    <Link to={`/technology/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{news.title}</h3>
                      {news.image && <img src={`http://localhost:8000/${news.image}`} alt={news.title} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="pagination">
              <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Previous</button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)} 
                disabled={currentPage === totalPages || currentItems.length < 100}
              >
                Next
              </button>
            </div>
          </div>
          <div className="trending-news">
            <h2>Trending News</h2>
            <Slider {...sliderSettings}>
              {trendingNews.map(news => (
                <div key={news.id}>
                  <Link to={`/technology/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
              {popularNews.map(news => (
                <div key={news.id}>
                  <Link to={`/technology/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{news.title}</h3>
                    {news.image && <img src={`http://localhost:8000/${news.image}`} alt={news.title} />}
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Technology;
