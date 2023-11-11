import { useState } from "react";
import '../../../css/signup.css';

const UserForm = ({formSubmit, formData, setFormData, formAction, optional}) => {
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
      // Regular expression for validating an Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      let key = name === 'username' ? 'name' : name;
      setFormData({
        ...formData,
        [key]: value,
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Username is required';
        }

        if (!formData.email || !validateEmail(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.password && !(optional && optional.indexOf('password') != -1)) {
            newErrors.password = 'Password is required';
        }

        if (formData.password !== formData.confirmPassword && !(optional && optional.indexOf('password') != -1)) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length === 0) {
            // Handle form submission logic here (e.g., API call)
            formSubmit();
        } else {
            setErrors(newErrors);
        }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
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
          {(optional && optional.indexOf('password') != -1) && <span className="note">{'(Optional. Leave blank to avoid update.)'}</span>}
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {(optional && optional.indexOf('password') != -1) && <span className="note">{'(Optional. Leave blank to avoid update.)'}</span>}
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <button className="button-primary" type="submit">{formAction}</button>
      </form>
    )
}

export default UserForm;