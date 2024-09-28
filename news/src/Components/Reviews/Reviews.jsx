import React, { useEffect, useState, useMemo, useCallback, useRef, useLayoutEffect, useReducer, useContext, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchReviewsNews, setSelectedFilter } from '../../Redux/reviewsSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Reviews.css';

const FilterContext = createContext();

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
};

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviewsNews, latestNews, mostPopular, nowPlaying, fromTheBlog, reviewCollections, loading, error, selectedFilter } = useSelector((state) => state.reviews);
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPageBlog, setCurrentPageBlog] = useState(1);
  const [currentPageCollections, setCurrentPageCollections] = useState(1);
  const itemsPerPage = 12;

  const [filterState, filterDispatch] = useReducer(filterReducer, 'All');
  const filterContextValue = useMemo(() => ({ filterState, filterDispatch }), [filterState, filterDispatch]);

  const filterNews = useCallback(() => {
    if (selectedFilter === 'All') {
      setFilteredNews(reviewsNews);
    } else {
      setFilteredNews(reviewsNews.filter(news => news.category === selectedFilter));
    }
  }, [selectedFilter, reviewsNews]);

  useEffect(() => {
    dispatch(fetchReviewsNews());
  }, [dispatch]);

  useEffect(() => {
    filterNews();
  }, [selectedFilter, reviewsNews, filterNews]);

  const paginate = (items, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  }), []);

  const latestNewsRef = useRef(null);

  useLayoutEffect(() => {
    if (latestNewsRef.current) {
      latestNewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [latestNews]);

  const totalPagesBlog = Math.ceil(fromTheBlog.length / itemsPerPage);
  const totalPagesCollections = Math.ceil(reviewCollections.length / itemsPerPage);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <FilterContext.Provider value={filterContextValue}>
      <div className="filter-buttons4">
        {['All', 'Hollywood', 'Bollywood', 'Tollywood', 'Kollywood', 'Mollywood', 'Sandalwood'].map(filter => (
          <button key={filter} onClick={() => dispatch(setSelectedFilter(filter))}>{filter}</button>
        ))}
      </div>
      <div className="reviews-container">
        <div className="main-news">
          <h2>Reviews News</h2>
          {paginate(filteredNews, 1, itemsPerPage).length === 0 ? (
            <p>No reviews news available</p>
          ) : (
            <ul>
              {paginate(filteredNews, 1, itemsPerPage).map(news => (
                <li key={news.id} className="reviews-news-item">
                  <Link to={`/reviews/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{news.title}</h3>
                    {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                    <p>{news.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
     
      </div>
    {
    /*
      <div className="now-playing">
        <h2>Now Playing</h2>
        {nowPlaying.length === 0 ? (
          <p>No now playing news available</p>
        ) : (
          <Slider {...sliderSettings}>
            {nowPlaying.map(news => (
              <div key={news.id} className="now-playing-item">
                {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
              </div>
            ))}
          </Slider>
        )}
      </div>
    */
    }
      <div className="from-the-blog">
        <h2>From the Blog</h2>
        {fromTheBlog.length === 0 ? (
          <p>No blog news available</p>
        ) : (
          <ul>
            {paginate(fromTheBlog, currentPageBlog, itemsPerPage).map(news => (
              <li key={news.id} className="blog-news-item">
                <Link to={`/reviews/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPageBlog(prevPage => Math.max(prevPage - 1, 1))}
            disabled={currentPageBlog === 1}
          >
            Previous
          </button>
          <span>{currentPageBlog} / {totalPagesBlog}</span>
          <button
            onClick={() => setCurrentPageBlog(prevPage => Math.min(prevPage + 1, totalPagesBlog))}
            disabled={currentPageBlog === totalPagesBlog}
          >
            Next
          </button>
        </div>
      </div>
      <div className="review-collections">
        <h2>Review Collections</h2>
        {reviewCollections.length === 0 ? (
          <p>No review collections available</p>
        ) : (
          <ul>
            {paginate(reviewCollections, currentPageCollections, itemsPerPage).map(news => (
              <li key={news.id} className="collection-news-item">
                <Link to={`/reviews/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{news.title}</h3>
                  {news.image && <img src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPageCollections(prevPage => Math.max(prevPage - 1, 1))}
            disabled={currentPageCollections === 1}
          >
            Previous
          </button>
          <span>{currentPageCollections} / {totalPagesCollections}</span>
          <button
            onClick={() => setCurrentPageCollections(prevPage => Math.min(prevPage + 1, totalPagesCollections))}
            disabled={currentPageCollections === totalPagesCollections}
          >
            Next
          </button>
        </div>
      </div>
    </FilterContext.Provider>
  );
};

export default Reviews;
