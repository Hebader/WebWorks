import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handeSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="content-container">
      <div className="contact-text">
        <h1>Contact</h1>
        <p>Please contact us if you have any questions!</p>
      </div>
      <div className="contact-container">
        <form className="form-container">
          <label for="name">*Name:</label>
          <input type="text" placeholder="Name..." id="name" name="name" />

          <label for="email">*Email:</label>
          <input type="email" placeholder="Email..." id="email" name="email" />

          <label for="number">*Phone number:</label>
          <input
            type="number"
            placeholder="Phone number..."
            id="number"
            name="number"
          />

          <label for="message">*Message:</label>
          <textarea
            id="message"
            placeholder="Type your message here..."
            name="message"
            maxlength="250"
          ></textarea>
          <p id="word-count-message">Max 250 characters.</p>
          <div class="row">
            <input type="reset" value="Reset" />
            <input type="submit" value="Submit" />
          </div>
          <p>* Mandatory fields</p>
        </form>
      </div>
    </div>
  );
}
