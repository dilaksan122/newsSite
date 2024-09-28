import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaReddit } from 'react-icons/fa';
import './TechnologyDetail.css';
import { translateText } from '../../utils/translate'; // Import the translation function

const TechnologyDetail = () => {
  const { slug } = useParams();
  const [techNews, setTechNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState(''); // State for translated title
  const [translatedContent, setTranslatedContent] = useState(''); // State for translated content
  const [language, setLanguage] = useState('en'); // Default language
  const [newComment, setNewComment] = useState(''); // State for new comment
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorComment, setErrorComment] = useState(''); // State for comment error
  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchTechNewsDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/api/technology-news/${slug}`);
        setTechNews(response.data);

        // Set the initial values for title and content
        setTranslatedTitle(response.data.title);
        setTranslatedContent(response.data.content);
      } catch (error) {
        setError('Failed to fetch technology news details');
      } finally {
        setLoading(false);
      }
    };

    fetchTechNewsDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Handle language change and translate both title and content
  const handleLanguageChange = async (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    if (techNews) {
      // Translate both title and content
      const translatedTitleText = await translateText(techNews.title, selectedLanguage);
      const translatedContentText = await translateText(techNews.content, selectedLanguage);

      // Update translated title and content, fallback to original if translation fails
      setTranslatedTitle(translatedTitleText || techNews.title);
      setTranslatedContent(translatedContentText || techNews.content);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      setErrorComment('Comment cannot be empty');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/technology-news/comments', {
        technology_id: techNews.id, // Assuming techNews has an id property
        comment: newComment
      });

      setSuccessMessage('Comment submitted successfully!');
      setNewComment(''); // Clear the comment input

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorComment('Failed to submit comment');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!techNews) return <div className="error">Technology news details not found.</div>;

  return (
    <div className="technology-details-container">
      {/* Translated title */}
      <h2>{translatedTitle}</h2>
      <div className="details-meta">
        <p><strong>Category:</strong> {techNews.category || 'Technology'}</p>
        <p><strong>By:</strong> {techNews.author || 'Unknown'}</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>

      {/* Language Selector */}
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

      {/* Display image if available */}
      {techNews.image && <img src={`http://localhost:8000/${techNews.image}`} alt={techNews.title} />}
      
      {/* Translated content */}
      <p dangerouslySetInnerHTML={{ __html: translatedContent }}></p>

      <div className="share-buttons1">
        <h3>Share this article:</h3>
        <div className="share-icons1">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon1 fb1">
            <FaFacebook />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon1 twitter1">
            <FaTwitter />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon1 linkedin1">
            <FaLinkedin />
          </a>
          <a href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon1 pinterest1">
            <FaPinterest />
          </a>
          <a href={`https://reddit.com/submit?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon1 reddit1">
            <FaReddit />
          </a>
        </div>
      </div>

      <div className="comments-section">
        <h3>Leave a Comment</h3>
        <textarea 
          placeholder="Write your comment here..."
          value={newComment}
          onChange={handleCommentChange}
        ></textarea>
        <button type="button" onClick={handleCommentSubmit}>Submit Comment</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorComment && <div className="error-comment">{errorComment}</div>}
      </div>
    </div>
  );
};

export default TechnologyDetail;
