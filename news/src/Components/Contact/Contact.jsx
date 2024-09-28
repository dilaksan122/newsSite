import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear any existing messages
    Swal.close();

    try {
      await axios.post('http://127.0.0.1:8000/api/contact/send', {
        name,
        email,
        message
      });

      // Show success alert with automatic close
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000, // Close after 3 seconds
        timerProgressBar: true // Show progress bar
      });

      // Clear the form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      // Show error alert with automatic close
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send your message. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000, // Close after 3 seconds
        timerProgressBar: true // Show progress bar
      });
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, please feel free to reach out to us using the form below:</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
