import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <ul className="footer-nav">
          <li><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/technology" style={{ textDecoration: 'none' }}>Technology</Link></li>
          <li><Link to="/cinema" style={{ textDecoration: 'none' }}>Cinema</Link></li>
          <li><Link to="/sports" style={{ textDecoration: 'none' }}>Sports</Link></li>
          <li><Link to="/reviews" style={{ textDecoration: 'none' }}>Reviews</Link></li>
          <li><Link to="/health" style={{ textDecoration: 'none' }}>Health</Link></li>
          <li><Link to="/contact" style={{ textDecoration: 'none' }}>Contact</Link></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <div className="social-media">
          <a href="https://web.facebook.com/profile.php?id=61566494069694" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://x.com/DailyweNews" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/dailywenews/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} DailyWeNews. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
