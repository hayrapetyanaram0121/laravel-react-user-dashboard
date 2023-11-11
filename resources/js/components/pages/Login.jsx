import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageAlert from '../partials/MessageAlert';
import { addSeconds } from '../tools/date';
import '../../../css/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [c, setCookie] = useCookies();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({title: '', content: ''});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (state?.signUp) {
      setMessage({
        title: 'Success',
        content: 'Resgistration complete. Pleaese log in.'
      })
      setIsAlertOpen(true);
    }
  }, []);

  const validateEmail = (email) => {
    // Regular expression for validating an Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission logic here (e.g., API call)
      axios.post(`/api/login`, formData)
        .then(function (response) {
          if (response.data.status === "success") {
            setCookie('test_token', response.data.authorisation.token, {
              expires: addSeconds(3600)
            });
            setCookie('test_user', response.data.user, {
              expires: addSeconds(3600)
            });
            navigate('/');
          }
        })
        .catch(function({response}) {
          setMessage({
            title: response.data.title,
            content: response.data.message
          })
          setIsAlertOpen(true);
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button className='button-primary' type="submit">Login</button>
        <div className='go-to'>
          Don't have an account? <a className='go-to-link' href='/sign-up'>Sign Up</a>.
        </div>
      </form>
      <MessageAlert
        title={message.title}
        text={message.content}
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      />
    </div>
  );
};

export default Login;