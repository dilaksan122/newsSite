import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ReviewsDetail.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaReddit } from 'react-icons/fa';
import { translateText } from '../../utils/translate'; // Ensure the correct path

const ReviewsDetail = () => {
  const { slug } = useParams();
  const [reviewsNews, setReviewsNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [language, setLanguage] = useState('en'); // Default language is English
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedContent, setTranslatedContent] = useState('');
  const [translating, setTranslating] = useState(false); // Loading state for translation

  useEffect(() => {
    setCurrentUrl(window.location.href);

    const fetchReviewsNewsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/reviews/${slug}`);
        setReviewsNews(response.data);

        if (response.data && response.data.category) {
          const relatedResponse = await axios.get(`http://127.0.0.1:8000/api/api/reviews?category=${response.data.category}`);
          setRelatedNews(relatedResponse.data.filter(news => news.id !== response.data.id).slice(0, 5));
        }
      } catch (error) {
        setError('Failed to fetch reviews news details');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsNewsDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const translateContent = async () => {
      if (reviewsNews) {
        setTranslating(true); // Start translation loading
        try {
          const [translatedTitle, translatedText] = await Promise.all([
            translateText(reviewsNews.title, language),
            translateText(reviewsNews.content, language)
          ]);
          setTranslatedTitle(translatedTitle);
          setTranslatedContent(translatedText);
        } catch (error) {
          console.error('Translation error:', error);
        } finally {
          setTranslating(false); // End translation loading
        }
      }
    };
    translateContent();
  }, [reviewsNews, language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const comment = {
      review_id: reviewsNews.id,
      comments: document.querySelector('textarea').value,
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/api/comments', comment);
      setSuccessMessage('Comment submitted successfully!');
      document.querySelector('textarea').value = ''; // Clear textarea after submission
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSuccessMessage('');
    }
  };

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
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  if (!reviewsNews) return <div className="error">Reviews news details not found.</div>;

  const encodedUrl = encodeURIComponent(currentUrl); // Encode the URL for query parameters

  return (
    <div className="reviews-details-container">
      <h1>{translating ? 'Translating...' : translatedTitle || reviewsNews.title}</h1>
      <div className="details-meta">
        <p><strong>Category:</strong> {reviewsNews.category || 'Reviews'}</p>
        <p><strong>By:</strong> {reviewsNews.author || 'Unknown'}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
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

      {reviewsNews.image && <img src={`http://127.0.0.1:8000/${reviewsNews.image}`} alt={reviewsNews.title} />}
      
      <div dangerouslySetInnerHTML={{ __html: translating ? 'Translating content...' : translatedContent || reviewsNews.content }}></div>

      <div className="share-buttons3">
        <h3>Share this article:</h3>
        <div className="share-icons3">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon3 fb">
            <FaFacebook />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon3 twitter">
            <FaTwitter />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon3 linkedin">
            <FaLinkedin />
          </a>
          <a href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon3 pinterest">
            <FaPinterest />
          </a>
          <a href={`https://reddit.com/submit?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon3 reddit">
            <FaReddit />
          </a>
        </div>
      </div>

      <div className="comments-section">
        <h3>Leave a Comment</h3>
        <textarea placeholder="Write your comment here..."></textarea>
        <button type="button" onClick={handleCommentSubmit}>Submit Comment</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default ReviewsDetail;
