import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';
import { authApi, messagesApi, getApiUrl } from '../../../services/api';

function Profile() {
  const navigate = useNavigate();
  const { user, token, logout, updateUser, refreshProfile, API } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    nicNumber: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        nicNumber: user.nicNumber || '',
      });
      fetchMessages();
    }
    // eslint-disable-next-line
  }, [user, navigate]);

  // Poll for messages every 5 seconds
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    if (!token) return;
    try {
      const conversations = await messagesApi.conversations();
      const conversation = Array.isArray(conversations) ? conversations[0] : null;
      if (conversation?.id) {
        const data = await messagesApi.messages(conversation.id);
        setMessages(data.map((m) => ({
          ...m,
          content: m.messageText,
          sender: m.sender?.role === 'customer' ? 'Customer' : 'Admin',
          createdAt: m.sentAt,
        })));
        setTimeout(scrollToBottom, 100);
      } else {
        setMessages([]);
      }
    } catch {
      // ignore
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    try {
      await messagesApi.createConversation({ firstMessage: chatInput });
      setChatInput('');
      fetchMessages();
    } catch {
      alert('Failed to send message');
    }
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('address', form.address);
      formData.append('nicNumber', form.nicNumber);
      if (avatarFile) formData.append('avatar', avatarFile);

      const data = await authApi.updateProfile(formData);
      updateUser(data.user || data.customer);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setAvatarFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; // will redirect

  // Fallback image if no avatar
  const avatarUrl = user.avatar 
    ? getApiUrl('').replace('/api', '') + user.avatar
    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  return (
    <div className="profile-page">
      <div className="profile-container">
        
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-section">
              <img src={avatarUrl} alt="Profile" className="profile-avatar" />
              {isEditing && (
                <div className="avatar-upload">
                  <label htmlFor="avatar-upload" className="avatar-upload-btn">Change Photo</label>
                  <input id="avatar-upload" type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              )}
            </div>
            <div className="profile-title-area">
              <h2>{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              {!isEditing ? (
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              ) : (
                <button className="edit-profile-btn cancel" onClick={() => setIsEditing(false)}>
                  Cancel Edit
                </button>
              )}
            </div>
            <button className="logout-btn" onClick={() => { logout(); navigate('/'); }}>
              Logout
            </button>
          </div>

          <div className="profile-body">
            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={isEditing ? form.name : user.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>NIC Number</label>
                <input 
                  type="text" 
                  value={isEditing ? form.nicNumber : (user.nicNumber || '')} 
                  onChange={(e) => setForm({...form, nicNumber: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={isEditing ? form.phone : (user.phone || '')} 
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  value={isEditing ? form.address : (user.address || '')} 
                  onChange={(e) => setForm({...form, address: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <button type="submit" className="save-profile-btn" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Chat Section */}
        <div className="chat-card">
          <div className="chat-header">
            <h3>Support Chat</h3>
            <span className="online-indicator">Admin Online</span>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="no-messages">Send a message to our admin team...</div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`chat-bubble-wrap ${msg.sender === 'Customer' ? 'sent' : 'received'}`}>
                  <div className="chat-bubble">
                    {msg.content}
                    <span className="chat-time">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-area">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Profile;
