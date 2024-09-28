import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaReddit } from 'react-icons/fa';
import './SportsDetail.css'; // Import CSS file for styling
import { translateText } from '../../utils/translate'; // Ensure the correct path

const SportsDetails = () => {
  const { slug } = useParams(); // Get the news ID from the URL params
  const [sportsNews, setSportsNews] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedContent, setTranslatedContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [language, setLanguage] = useState('en'); // State for selected language

  // Fetch sports news details and translate title and content
  useEffect(() => {
    const fetchSportsNewsDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/sports-news/${slug}`);
        setSportsNews(response.data); // Set the sports news details

        // Fetch comments if needed
        // const commentsResponse = await axios.get(`http://127.0.0.1:8000/api/sports/comments/${response.data.id}`);
        // setComments(commentsResponse.data);

        // Translate the content and title based on the selected language
        await translateContent(response.data.title, response.data.content, language);
      } catch (error) {
        setError('Failed to fetch sports news details');
      } finally {
        setLoading(false);
      }
    };

    fetchSportsNewsDetails();
  }, [slug, language]);

  // Translate title and content
  const translateContent = async (title, content, targetLanguage) => {
    try {
      const translatedTitle = await translateText(title, targetLanguage); // Translate title
      const translatedContent = await translateText(content, targetLanguage); // Translate content
      setTranslatedTitle(translatedTitle);
      setTranslatedContent(translatedContent);
    } catch (error) {
      setError('Failed to translate content');
    }
  };

  // Handle comment change
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // Handle language change
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value); // Update the selected language
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/sports/comments', {
        sports_id: sportsNews.id,
        comments: newComment,
      });

      // Add the new comment to the list
      setComments([...comments, response.data]);
      setNewComment('');
      setSuccessMessage('Comment posted successfully!');
      setError(null);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setError('Failed to post comment');
      setSuccessMessage('');
    }
  };

  const currentUrl = window.location.href;

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!sportsNews) return <div className="error">Sports news details not found.</div>;

  return (
    <div className="sports-details-container">
      <h2>{translatedTitle || sportsNews.title}</h2> {/* Use translated title or original */}
      
      <div className="details-meta">
        <p><strong>Category:</strong> {sportsNews.category || 'Uncategorized'}</p>
        <p><strong>Author:</strong> {sportsNews.author || 'Unknown'}</p>
        <p><strong>Date:</strong> {new Date(sportsNews.created_at).toLocaleDateString()}</p>
      </div>
      
      {/* Language selector */}
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

      {sportsNews.image && <img src={`http://127.0.0.1:8000/${sportsNews.image}`} alt={sportsNews.title} />}
      <p dangerouslySetInnerHTML={{ __html: translatedContent || sportsNews.content }}></p> {/* Use translated content */}

      {/* Share buttons */}
      <div className="share-buttons2">
        <h3>Share this article:</h3>
        <div className="share-icons2">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon2 fb">
            <FaFacebook />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon2 twitter">
            <FaTwitter />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon2 linkedin">
            <FaLinkedin />
          </a>
          <a href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon2 pinterest">
            <FaPinterest />
          </a>
          <a href={`https://reddit.com/submit?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="share-icon2 reddit">
            <FaReddit />
          </a>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Leave a Comment</h3>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write your comment here..."
        ></textarea>
        <button type="button" onClick={handleCommentSubmit}>Submit Comment</button>
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
      </div>
    </div>
  );
};

export default SportsDetails;
