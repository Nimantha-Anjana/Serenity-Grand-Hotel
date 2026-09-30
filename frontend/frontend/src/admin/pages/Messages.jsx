import React, { useState } from 'react';
import '../css/Messages.css';

const DUMMY_CONVERSATIONS = [
  {
    id: 1,
    name: 'Kasun Perera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    status: 'online',
    unread: 2,
    email: 'kasun.perera@example.com',
    phone: '+94 77 123 4567',
    totalBookings: 4,
    lastBooking: 'Ocean View Suite (Oct 12 - Oct 15)',
    lastTime: '10:45 AM',
    messages: [
      { id: 101, sender: 'customer', text: 'Hello! Is early check-in available tomorrow for Suite 302?', time: '10:30 AM' },
      { id: 102, sender: 'admin', text: 'Good morning Mr. Perera! Let me check room availability for you.', time: '10:35 AM' },
      { id: 103, sender: 'customer', text: 'Thank you! We will be arriving around 11:00 AM.', time: '10:45 AM' }
    ]
  },
  {
    id: 2,
    name: 'Sarah Fernando',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    status: 'offline',
    unread: 0,
    email: 'sarah.f@example.com',
    phone: '+94 71 987 6543',
    totalBookings: 2,
    lastBooking: 'Presidential Villa (Nov 01 - Nov 05)',
    lastTime: 'Yesterday',
    messages: [
      { id: 201, sender: 'customer', text: 'Can we request airport pick-up service for 2 guests?', time: 'Yesterday 04:15 PM' },
      { id: 202, sender: 'admin', text: 'Certainly, Ms. Fernando! Our private luxury sedan can pick you up at terminal 1.', time: 'Yesterday 04:30 PM' }
    ]
  },
  {
    id: 3,
    name: 'Amal Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    status: 'online',
    unread: 1,
    email: 'amal.silva@example.com',
    phone: '+94 75 444 3322',
    totalBookings: 1,
    lastBooking: 'Deluxe King Room (Dec 20 - Dec 24)',
    lastTime: 'Sep 20',
    messages: [
      { id: 301, sender: 'customer', text: 'Are dietary preferences like gluten-free catered at dinner?', time: 'Sep 20 02:10 PM' }
    ]
  },
  {
    id: 4,
    name: 'Nethmi Jayasinghe',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    status: 'offline',
    unread: 0,
    email: 'nethmi.j@example.com',
    phone: '+94 70 888 9911',
    totalBookings: 6,
    lastBooking: 'Royal Spa Suite (Jan 10 - Jan 14)',
    lastTime: 'Sep 18',
    messages: [
      { id: 401, sender: 'admin', text: 'Your spa package confirmation has been sent to your email.', time: 'Sep 18 11:00 AM' },
      { id: 402, sender: 'customer', text: 'Received with thanks!', time: 'Sep 18 11:05 AM' }
    ]
  }
];

export default function Messages() {
  const [conversations, setConversations] = useState(DUMMY_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(false);

  // Get active conversation object
  const activeConversation = conversations.find((c) => c.id === selectedId);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'Unread') return matchesSearch && c.unread > 0;
    if (filter === 'Read') return matchesSearch && c.unread === 0;
    return matchesSearch;
  });

  // Select conversation & clear unread
  const handleSelectConversation = (id) => {
    setSelectedId(id);
    setMobileShowChat(true);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  // Send message handler (UI state update only)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: 'admin',
      text: inputText.trim(),
      time: 'Just now'
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              lastTime: 'Just now',
              messages: [...c.messages, newMessage]
            }
          : c
      )
    );

    setInputText('');
  };

  return (
    <div className="messages-container p-3 p-md-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="messages-title mb-1">Messages</h2>
        <p className="messages-subtitle mb-0">Communicate with hotel customers.</p>
      </div>

      {/* Main Messaging Interface Container */}
      <div className="card shadow-sm border-0 rounded-3 overflow-hidden messages-card">
        <div className="row g-0 h-100">
          
          {/* LEFT SIDE: Conversation List */}
          <div
            className={`col-12 col-lg-4 border-end conversation-sidebar ${
              mobileShowChat ? 'd-none d-lg-block' : 'd-block'
            }`}
          >
            {/* Search and Filters */}
            <div className="p-3 border-bottom bg-white">
              <div className="input-group mb-3">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 ps-0"
                  placeholder="Search guests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Pills */}
              <div className="btn-group w-100 custom-filter-pills" role="group">
                {['All', 'Unread', 'Read'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`btn btn-sm ${
                      filter === f ? 'btn-navy' : 'btn-outline-secondary'
                    }`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="conversation-list overflow-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((c) => {
                  const lastMsg = c.messages[c.messages.length - 1];
                  const isSelected = c.id === selectedId;

                  return (
                    <div
                      key={c.id}
                      className={`conversation-item d-flex align-items-center p-3 border-bottom cursor-pointer position-relative ${
                        isSelected ? 'active-conversation' : ''
                      }`}
                      onClick={() => handleSelectConversation(c.id)}
                    >
                      {/* Avatar with Status Indicator */}
                      <div className="position-relative me-3 flex-shrink-0">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="rounded-circle avatar-img"
                        />
                        <span
                          className={`status-indicator ${
                            c.status === 'online' ? 'bg-success' : 'bg-secondary'
                          }`}
                        ></span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow-1 min-w-0 me-2">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0 text-truncate font-navy fw-bold small-title">
                            {c.name}
                          </h6>
                          <span className="time-text text-muted">{c.lastTime}</span>
                        </div>
                        <p className="mb-0 text-truncate text-muted small">
                          {lastMsg ? lastMsg.text : 'No messages yet'}
                        </p>
                      </div>

                      {/* Unread badge */}
                      {c.unread > 0 && (
                        <span className="badge rounded-pill bg-gold text-dark ms-auto">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-muted">
                  <i className="bi bi-chat-square-dots display-6 text-gold mb-2 d-block"></i>
                  <p className="small mb-0">No conversations found.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Chat Screen */}
          <div
            className={`col-12 col-lg-8 d-flex flex-column bg-cream-light ${
              mobileShowChat ? 'd-flex' : 'd-none d-lg-flex'
            }`}
          >
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-bottom bg-white d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    {/* Back Button for Mobile View */}
                    <button
                      className="btn btn-link text-navy p-0 me-3 d-lg-none"
                      onClick={() => setMobileShowChat(false)}
                    >
                      <i className="bi bi-arrow-left fs-4"></i>
                    </button>

                    <div className="position-relative me-3">
                      <img
                        src={activeConversation.avatar}
                        alt={activeConversation.name}
                        className="rounded-circle avatar-img"
                      />
                      <span
                        className={`status-indicator ${
                          activeConversation.status === 'online'
                            ? 'bg-success'
                            : 'bg-secondary'
                        }`}
                      ></span>
                    </div>

                    <div>
                      <h6 className="mb-0 text-navy fw-bold">{activeConversation.name}</h6>
                      <small className="text-muted text-capitalize">
                        {activeConversation.status}
                      </small>
                    </div>
                  </div>

                  {/* Customer Info Button */}
                  <button
                    className="btn btn-outline-navy btn-sm"
                    onClick={() => setShowInfoPanel(!showInfoPanel)}
                  >
                    <i className="bi bi-person-lines-fill me-1"></i> Customer Info
                  </button>
                </div>

                {/* Main View + Optional Info Side Panel */}
                <div className="d-flex flex-grow-1 overflow-hidden position-relative">
                  {/* Messages Area */}
                  <div className="messages-area flex-grow-1 p-3 p-md-4 overflow-auto">
                    {activeConversation.messages.map((m) => {
                      const isAdmin = m.sender === 'admin';
                      return (
                        <div
                          key={m.id}
                          className={`d-flex flex-column mb-3 ${
                            isAdmin ? 'align-items-end' : 'align-items-start'
                          }`}
                        >
                          <div
                            className={`message-bubble p-3 rounded-3 shadow-sm ${
                              isAdmin ? 'bg-navy text-white' : 'bg-white text-dark'
                            }`}
                          >
                            {m.text}
                          </div>
                          <span className="message-time text-muted mt-1 px-1">
                            {m.time}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Customer Info Panel overlay/side-drawer */}
                  {showInfoPanel && (
                    <div className="customer-info-panel bg-white border-start p-3 shadow-sm overflow-auto">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <h6 className="fw-bold text-navy mb-0">Guest Details</h6>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowInfoPanel(false)}
                        ></button>
                      </div>

                      <div className="text-center my-3">
                        <img
                          src={activeConversation.avatar}
                          alt={activeConversation.name}
                          className="rounded-circle mb-2 avatar-lg"
                        />
                        <h6 className="fw-bold text-navy mb-0">{activeConversation.name}</h6>
                        <span className="badge bg-gold text-dark mt-1">VIP Guest</span>
                      </div>

                      <div className="info-list small border-top pt-3">
                        <div className="mb-3">
                          <span className="text-muted d-block fw-semibold">Email</span>
                          <span className="text-navy">{activeConversation.email}</span>
                        </div>
                        <div className="mb-3">
                          <span className="text-muted d-block fw-semibold">Phone</span>
                          <span className="text-navy">{activeConversation.phone}</span>
                        </div>
                        <div className="mb-3">
                          <span className="text-muted d-block fw-semibold">Total Bookings</span>
                          <span className="text-navy fw-bold">
                            {activeConversation.totalBookings} Completed
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="text-muted d-block fw-semibold">Last Stay / Booking</span>
                          <span className="text-navy">{activeConversation.lastBooking}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Input Bar */}
                <div className="p-3 bg-white border-top">
                  <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-light text-muted rounded-circle p-2 icon-btn"
                      title="Attach File"
                    >
                      <i className="bi bi-paperclip fs-5"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light text-muted rounded-circle p-2 icon-btn"
                      title="Insert Emoji"
                    >
                      <i className="bi bi-emoji-smile fs-5"></i>
                    </button>

                    <input
                      type="text"
                      className="form-control rounded-pill bg-light border-0 px-3"
                      placeholder="Type a message..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />

                    <button type="submit" className="btn btn-gold rounded-pill px-4">
                      <i className="bi bi-send-fill me-1"></i> Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                <i className="bi bi-chat-left-text display-3 text-gold mb-3"></i>
                <h5 className="fw-bold text-navy">No Conversation Selected</h5>
                <p className="text-muted small max-w-sm">
                  Choose a guest from the left panel to begin communicating or view guest history.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}