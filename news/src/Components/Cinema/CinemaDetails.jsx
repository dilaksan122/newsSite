import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CinemaDetails.css'; // Import CSS file for styling
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaReddit } from 'react-icons/fa';
import { translateText } from '../../utils/translate'; // Ensure the correct path

const CinemaDetails = () => {
  const { slug } = useParams(); // Get the news slug from the URL params
  const [cinemaNews, setCinemaNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedContent, setTranslatedContent] = useState('');
  const [language, setLanguage] = useState('en'); // Default language

  useEffect(() => {
    const fetchCinemaNewsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/cinema-news/${slug}`);
        setCinemaNews(response.data); // Set the cinema news details

        // Fetch related news
        if (response.data && response.data.category) {
          const relatedResponse = await axios.get(`http://127.0.0.1:8000/api/api/cinema-news?category=${response.data.category}`);
          setRelatedNews(relatedResponse.data.filter(news => news.slug !== response.data.slug).slice(0, 5));
        }

        // Translate content and title
        if (response.data && response.data.content) {
          const translatedText = await translateText(response.data.content, language);
          setTranslatedContent(translatedText);
        }

        if (response.data && response.data.title) {
          const translatedTitleText = await translateText(response.data.title, language);
          setTranslatedTitle(translatedTitleText);
        }
      } catch (error) {
        setError('Failed to fetch cinema news details');
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaNewsDetails();

    // Scroll to top when the component mounts or the slug changes
    window.scrollTo(0, 0);
  }, [slug, language]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleLanguageChange = async (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    // Translate the title and content again when the language changes
    if (cinemaNews) {
      const translatedText = await translateText(cinemaNews.content, selectedLanguage);
      setTranslatedContent(translatedText);

      const translatedTitleText = await translateText(cinemaNews.title, selectedLanguage);
      setTranslatedTitle(translatedTitleText);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/cinema/comments', {
        news_id: cinemaNews.id,
        comment: newComment
      });
      setSuccessMessage('Comment posted successfully!');
      setNewComment('');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      setError('Failed to post comment');
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Auto scroll every 5 seconds
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

  if (!cinemaNews) return <div className="error">Cinema news details not found.</div>;

  const currentUrl = window.location.href; // Get the current URL

  return (
    <div className="cinema-details-container">
      <h1>{translatedTitle || cinemaNews.title}</h1>
      <div className="details-meta">
        <p><strong>Category:</strong> {cinemaNews.category || 'Movie Reviews'}</p>
        <p><strong>By:</strong> {cinemaNews.author || 'Unknown'}</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
      <div className="language-selector">
        <label htmlFor="language">Translate to: </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
        </select>
      </div>

      {cinemaNews.image && <img src={`http://127.0.0.1:8000/${cinemaNews.image}`} alt={cinemaNews.title} />}
      {cinemaNews.content && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: translatedContent || cinemaNews.content }}></div>
        </div>
      )}

      <div className="share-buttons6">
        <h3>Share this article:</h3>
        <div className="share-icons6">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon6 fb">
            <FaFacebook />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon6 twitter">
            <FaTwitter />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon6 linkedin">
            <FaLinkedin />
          </a>
          <a href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon6 pinterest">
            <FaPinterest />
          </a>
          <a href={`https://reddit.com/submit?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon6 reddit">
            <FaReddit />
          </a>
        </div>
      </div>

      <div className="comments-section">
        <h3>Leave a Comment</h3>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write your comment here..."
        ></textarea>
        <button type="button" onClick={handleCommentSubmit}>Submit Comment</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default CinemaDetails;
