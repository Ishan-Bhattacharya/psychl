import React, { useState } from 'react';
import './App.css';
import butterfly from './assets/butterfly.png';
import { useNavigate } from 'react-router-dom';
import { registerDoctor } from './scripts/apiDoctor';

const RegisterProfessional = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    username: '',
    email: '',
    phone_number: '',
    license: '',
    specialization: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted({ ...form });
    setError(null);
    // Prepare doctor data as per API schema
    const doctorData = {
      username: form.username,
      password: form.password,
      email: form.email,
      phone_number: form.phone_number,
      name: form.name,
      role: 'doctor',
      gender: form.gender,
      profession_data: {
        license: form.license,
        specialization: form.specialization,
      },
    };
    try {
      await registerDoctor(doctorData);
      navigate('/learn');
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <img src={butterfly} alt="Butterfly" className="butterfly-img" />
          <h1 className="psychl-title">PsychL</h1>
        </div>
        <h2 className="register-title">Register as professional</h2>
        <div className="register-frame">
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="register-label">Name</label>
            <input className="register-input" name="name" value={form.name} onChange={handleChange} />
            <label className="register-label">Gender</label>
            <input className="register-input" name="gender" value={form.gender} onChange={handleChange} />
            <label className="register-label">Username</label>
            <input className="register-input" name="username" value={form.username} onChange={handleChange} />
            <label className="register-label">Email Id</label>
            <input className="register-input" name="email" value={form.email} onChange={handleChange} />
            <label className="register-label">Phone Number</label>
            <input className="register-input" name="phone_number" value={form.phone_number} onChange={handleChange} />
            <label className="register-label">License</label>
            <input className="register-input" name="license" value={form.license} onChange={handleChange} />
            <label className="register-label">Specialization</label>
            <input className="register-input" name="specialization" value={form.specialization} onChange={handleChange} />
            <label className="register-label">Password</label>
            <input className="register-input" type="password" name="password" value={form.password} onChange={handleChange} />
            <button className="register-btn" type="submit">Register</button>
          </form>
          {error && <div style={{color:'red',textAlign:'center',marginTop:'1rem'}}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default RegisterProfessional; 