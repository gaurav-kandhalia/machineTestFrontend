import React, { useState } from 'react';
import InputField from '../components/form/InputField';
import Button from '../components/form/Button';
import { useNavigate } from 'react-router-dom';
import { addAgent } from '../services/adminApi';

function AddAgent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await addAgent({ name, email, phoneNumber, password });
      setSuccess('Agent added successfully! Redirecting to dashboard...');
      
      // Clear form fields
      setName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setNotes('');

      // Auto redirect after 2s
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      // Catch Zod validation errors from backend
      if (err.response?.data?.errors) {
        const messages = err.response.data.errors
          .map((e) => `${e.path}: ${e.message}`)
          .join(' | ');
        setError(messages);
      } else {
        setError(err.response?.data?.message || 'Failed to add agent');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-2 border-gray-300 rounded-md shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Add Agent</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="text"
          name="name"
          placeholder="Enter Name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Enter Email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <InputField
          type="text"
          name="phoneNumber"
          placeholder="+919876543210 "
          label="Phone Number (with country code)"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          required
        />
        <InputField
          type="password"
          name="password"
          placeholder="Enter Password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {loading ? 'Adding...' : 'Add Agent'}
        </Button>

        <Button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded"
        >
          Go Back to Dashboard
        </Button>
      </form>
    </div>
  );
}

export default AddAgent;
