import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../partials/UserForm';
import MessageAlert from '../partials/MessageAlert';

const SignUp = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({title: '', content: ''});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = () => {
    axios.post(`/api/register`, {
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
      .then(function (response) {
        if (response.data.status === "success") {
          navigate('/login', { state: { signUp: true } });
        }
      })
      .catch(function({response}) {
        setMessage({
          title: response.data.title,
          content: response.data.message
        })
        setIsAlertOpen(true);
      });
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <UserForm formSubmit={handleSubmit} formData={formData} setFormData={setFormData} formAction={'Sign Up'}></UserForm>
      <MessageAlert
        title={message.title}
        text={message.content}
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      />
    </div>
  );
};

export default SignUp;