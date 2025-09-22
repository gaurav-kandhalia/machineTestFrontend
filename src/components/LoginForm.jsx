import React from 'react'
import Button from './form/Button'
import InputField from './form/InputField'
import { useState } from 'react'
import { login } from '../services/authApi'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 const {loginUser} = useAuth()

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await login(email, password);

    if (response.data.success) {
     const { accessToken, refreshToken, user } = response.data.data;
     loginUser(user, accessToken, refreshToken);
      navigate('/dashboard');
    } else {
      setError(response.data.message || 'Login failed');
    }

  } catch (err) {
    // Only handles real request errors (network failure, 500, etc.)
    console.error('Login error:', err);
    setError(err.response?.data?.message || err.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};


  return (
  <form 
  onSubmit={handleSubmit} 
  className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg border border-gray-200"
>
  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>

  <div className="space-y-4">
    <InputField
      type="email"
      name="email"
      placeholder="Enter your email"
      onChange={(e) => setEmail(e.target.value)}
      label="Email"
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <InputField
      type="password"
      name="password"
      placeholder="Enter your password"
      onChange={(e) => setPassword(e.target.value)}
      label="Password"
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {error && (
    <p className="text-red-500 mt-2 text-center">{error}</p>
  )}

  <button
    type="submit"
    disabled={loading}
    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
  >
    {loading ? 'Logging in...' : 'Login'}
  </button>
</form>

  );
}

export default LoginForm;