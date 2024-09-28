import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import faEnvelope from the correct package
import './HealthDetail.css';
import { translateText } from '../../utils/translate';

const HealthDetail = () => {
  const { slug } = useParams();
  const [healthNews, setHealthNews] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState(''); // State for translated title
  const [translatedContent, setTranslatedContent] = useState(''); // State for translated content
  const [language, setLanguage] = useState('en'); // State to track selected language
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('Anonymous');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchHealthNewsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/health/${slug}`);
        const newsData = response.data;
        setHealthNews(newsData);

        // Translate title and content
        const translatedTitle = await translateText(newsData.name, language);
        const translatedContent = await translateText(newsData.content, language);
        setTranslatedTitle(translatedTitle || newsData.name);
        setTranslatedContent(translatedContent || newsData.content);
      } catch (error) {
        setError('Failed to fetch health news details');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthNewsDetails();
    window.scrollTo(0, 0);
  }, [slug, language]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/health/comments', {
        health_id: healthNews.id,
        comments: newComment,
        author,
      });
      setComments([...comments, response.data]);
      setNewComment('');
      setSuccessMessage('Comment posted successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setError('Failed to post comment');
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const currentUrl = window.location.href; // Ensure this is set correctly

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!healthNews) return <div className="error">Health news details not found.</div>;

  return (
    <div className="health-details-container">
      <h2>{translatedTitle}</h2>
      <div className="details-meta">
        <p><strong>Category:</strong> {healthNews.category || 'Health'}</p>
        <p><strong>By:</strong> {healthNews.author || 'Unknown'}</p>
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

      {healthNews.image && <img src={`http://127.0.0.1:8000/${healthNews.image}`} alt={healthNews.name} />}

      <div dangerouslySetInnerHTML={{ __html: translatedContent }}></div>

      <div className="share-buttons7">
        <h3>Share this article:</h3>
        <div className="share-icons7">
          {/* Facebook Share */}
         <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
             className="share-link facebook"
            >
  <FontAwesomeIcon icon={faFacebookF} />
</a>


          {/* Twitter Share */}
          <a
            href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${translatedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-link twitter"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>

          {/* Email Share */}
          <a
            href={`mailto:?subject=${translatedTitle}&body=Check this article: ${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-link email"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>

          {/* WhatsApp Share */}
          <a
            href={`https://api.whatsapp.com/send?text=${translatedTitle} ${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-link whatsapp"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Leave a comment..."
        ></textarea>
        <button type="button" onClick={handleCommentSubmit}>Submit</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default HealthDetail;
