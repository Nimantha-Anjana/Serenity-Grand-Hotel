import React, { useState } from 'react';
import '../css/Dining.css';

const INITIAL_RESTAURANTS = [
  {
    id: 1,
    name: 'The Grand Restaurant',
    cuisine: 'Fine Dining / French Mediterranean',
    hours: '07:00 AM - 11:00 PM',
    location: 'Main Building, Ground Floor',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Ocean View Café',
    cuisine: 'Casual Seafood & Pastries',
    hours: '06:00 AM - 08:00 PM',
    location: 'Poolside Terrace',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Sunset Lounge',
    cuisine: 'Cocktail Bar & Tapas',
    hours: '04:00 PM - 02:00 AM',
    location: 'Rooftop, 12th Floor',
    status: 'Closed',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=500&auto=format&fit=crop&q=80'
  }
];

const INITIAL_MENU_ITEMS = [
  {
    id: 101,
    name: 'Truffle Eggs Benedict',
    category: 'Breakfast',
    price: 38,
    availability: 'Available',
    description: 'Poached free-range eggs, black truffle hollandaise, toasted brioche, and prosciutto.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 102,
    name: 'Pan-Seared Wagyu Ribeye',
    category: 'Main Course',
    price: 125,
    availability: 'Available',
    description: 'A5 Japanese Wagyu steak, smoked potato puree, bone marrow jus, seasonal herbs.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 103,
    name: 'Gold Leaf Chocolate Soufflé',
    category: 'Dessert',
    price: 42,
    availability: 'Available',
    description: 'Valrhona dark chocolate soufflé topped with 24k edible gold flakes and vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 104,
    name: 'Vintage Champagne & Berry Sparkler',
    category: 'Beverages',
    price: 55,
    availability: 'Out of Stock',
    description: 'Dom Pérignon vintage champagne infused with wild blackberries and gold dust.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=150&auto=format&fit=crop&q=80'
  }
];

export default function Dining() {
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);

  const [activeCategory, setActiveCategory] = useState('All');
  const [menuSearchTerm, setMenuSearchTerm] = useState('');

  // Modals state
  const [editRestaurant, setEditRestaurant] = useState(null); // Handles Add & Edit Restaurant
  const [editMenuItem, setEditMenuItem] = useState(null);     // Handles Add & Edit Menu Item
  const [deleteTarget, setDeleteTarget] = useState(null);     // { type: 'restaurant'|'menu', item }

  // Restaurant Handlers
  const handleSaveRestaurant = (e) => {
    e.preventDefault();
    if (editRestaurant.id) {
      setRestaurants(prev => prev.map(r => r.id === editRestaurant.id ? editRestaurant : r));
    } else {
      setRestaurants(prev => [...prev, { ...editRestaurant, id: Date.now() }]);
    }
    setEditRestaurant(null);
  };

  // Menu Handlers
  const handleSaveMenuItem = (e) => {
    e.preventDefault();
    if (editMenuItem.id) {
      setMenuItems(prev => prev.map(m => m.id === editMenuItem.id ? editMenuItem : m));
    } else {
      setMenuItems(prev => [...prev, { ...editMenuItem, id: Date.now() }]);
    }
    setEditMenuItem(null);
  };

  // Delete Handler
  const handleDeleteConfirm = () => {
    if (deleteTarget.type === 'restaurant') {
      setRestaurants(prev => prev.filter(r => r.id !== deleteTarget.item.id));
    } else if (deleteTarget.type === 'menu') {
      setMenuItems(prev => prev.filter(m => m.id !== deleteTarget.item.id));
    }
    setDeleteTarget(null);
  };

  // Filtered Menu Items
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(menuSearchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(menuSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dining-page">
      {/* 1. Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h1 className="h2 mb-1 text-primary-navy fw-bold">Dining</h1>
          <p className="text-muted mb-0">Manage restaurants, menus and dining services for Serenity Grand Hotel.</p>
        </div>
        <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
          <button 
            className="btn btn-luxury-navy d-flex align-items-center gap-2"
            onClick={() => setEditRestaurant({ name: '', cuisine: '', hours: '', location: '', status: 'Open', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&auto=format&fit=crop&q=80' })}
          >
            <i className="bi bi-shop"></i>
            <span>Add Restaurant</span>
          </button>
          <button 
            className="btn btn-luxury-gold d-flex align-items-center gap-2"
            onClick={() => setEditMenuItem({ name: '', category: 'Main Course', price: '', availability: 'Available', description: '', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=80' })}
          >
            <i className="bi bi-plus-lg"></i>
            <span>Add Menu Item</span>
          </button>
        </div>
      </div>

      {/* 2. Restaurants Section */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="h4 text-primary-navy fw-bold mb-0">Hotel Restaurants</h3>
          <span className="badge bg-gold-subtle text-gold fs-8">{restaurants.length} Venues Active</span>
        </div>

        <div className="row g-4">
          {restaurants.map(rest => (
            <div className="col-12 col-md-6 col-lg-4" key={rest.id}>
              <div className="card card-luxury rest-card h-100 border-0 overflow-hidden">
                <div className="rest-img-wrapper position-relative">
                  <img src={rest.image} alt={rest.name} className="card-img-top rest-img" />
                  <span className={`badge rest-status-badge position-absolute top-0 end-0 m-3 ${rest.status === 'Open' ? 'bg-success' : 'bg-danger'}`}>
                    {rest.status}
                  </span>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <h4 className="card-title h5 text-dark fw-bold mb-1">{rest.name}</h4>
                  <div className="text-gold fw-medium fs-7 mb-3">{rest.cuisine}</div>

                  <div className="mt-auto pt-2 border-top border-light">
                    <div className="text-muted fs-7 mb-1 d-flex align-items-center gap-2">
                      <i className="bi bi-clock text-primary-navy"></i>
                      <span>{rest.hours}</span>
                    </div>
                    <div className="text-muted fs-7 mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-geo-alt text-primary-navy"></i>
                      <span>{rest.location}</span>
                    </div>

                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        onClick={() => setEditRestaurant({ ...rest })}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                        onClick={() => setDeleteTarget({ type: 'restaurant', item: rest })}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Menu Items Section */}
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <h3 className="h4 text-primary-navy fw-bold mb-2 mb-md-0">Culinary Menu Items</h3>
          
          {/* Category Filter Pills & Search */}
          <div className="d-flex flex-wrap align-items-center gap-2 w-100 w-md-auto">
            <div className="input-group search-group flex-grow-1 flex-md-grow-0" style={{ maxWidth: '240px' }}>
              <span className="input-group-text bg-white border-end-0 text-muted fs-7">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 fs-7 search-input"
                placeholder="Search menu..."
                value={menuSearchTerm}
                onChange={e => setMenuSearchTerm(e.target.value)}
              />
            </div>

            <div className="btn-group category-pills overflow-auto">
              {['All', 'Breakfast', 'Main Course', 'Dessert', 'Beverages'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm ${activeCategory === cat ? 'btn-luxury-navy' : 'btn-outline-secondary bg-white'}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Table */}
        <div className="card card-luxury border-0 overflow-hidden">
          <div className="table-responsive">
            <table className="table luxury-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img src={item.image} alt={item.name} className="menu-item-img rounded" />
                          <div>
                            <div className="fw-bold text-dark fs-7">{item.name}</div>
                            <div className="text-muted fs-8 text-truncate" style={{ maxWidth: '300px' }}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border fs-8">{item.category}</span>
                      </td>
                      <td className="fw-bold text-gold fs-7">${item.price}</td>
                      <td>
                        <span className={`badge-avail ${item.availability === 'Available' ? 'avail-yes' : 'avail-no'}`}>
                          {item.availability}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <button
                            className="btn btn-action btn-outline-warning text-dark"
                            title="Edit Menu Item"
                            onClick={() => setEditMenuItem({ ...item })}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-action btn-outline-danger"
                            title="Delete Menu Item"
                            onClick={() => setDeleteTarget({ type: 'menu', item })}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      <i className="bi bi-cup-hot fs-1 d-block mb-2 text-secondary"></i>
                      No menu items found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Add/Edit Restaurant Modal */}
      {editRestaurant && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <h2 className="h4 mb-0 text-primary-navy">
                {editRestaurant.id ? 'Edit Restaurant' : 'Add New Restaurant'}
              </h2>
              <button type="button" className="btn-close" onClick={() => setEditRestaurant(null)}></button>
            </div>

            <form onSubmit={handleSaveRestaurant}>
              <div className="row g-3 mb-3">
                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Restaurant Name</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    value={editRestaurant.name}
                    onChange={e => setEditRestaurant({ ...editRestaurant, name: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fs-7 fw-semibold">Cuisine Type</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    placeholder="e.g. Italian Fine Dining"
                    value={editRestaurant.cuisine}
                    onChange={e => setEditRestaurant({ ...editRestaurant, cuisine: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fs-7 fw-semibold">Opening Hours</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    placeholder="e.g. 08:00 AM - 10:00 PM"
                    value={editRestaurant.hours}
                    onChange={e => setEditRestaurant({ ...editRestaurant, hours: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-8">
                  <label className="form-label fs-7 fw-semibold">Location / Floor</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    placeholder="e.g. East Wing, 2nd Floor"
                    value={editRestaurant.location}
                    onChange={e => setEditRestaurant({ ...editRestaurant, location: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fs-7 fw-semibold">Status</label>
                  <select
                    className="form-select luxury-select"
                    value={editRestaurant.status}
                    onChange={e => setEditRestaurant({ ...editRestaurant, status: e.target.value })}
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Image URL</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    value={editRestaurant.image}
                    onChange={e => setEditRestaurant({ ...editRestaurant, image: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <button type="button" className="btn btn-secondary" onClick={() => setEditRestaurant(null)}>Cancel</button>
                <button type="submit" className="btn btn-luxury-gold">Save Restaurant</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Add/Edit Menu Item Modal */}
      {editMenuItem && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <h2 className="h4 mb-0 text-primary-navy">
                {editMenuItem.id ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h2>
              <button type="button" className="btn-close" onClick={() => setEditMenuItem(null)}></button>
            </div>

            <form onSubmit={handleSaveMenuItem}>
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-8">
                  <label className="form-label fs-7 fw-semibold">Item Name</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    value={editMenuItem.name}
                    onChange={e => setEditMenuItem({ ...editMenuItem, name: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fs-7 fw-semibold">Price ($)</label>
                  <input
                    type="number"
                    className="form-control luxury-select"
                    required
                    value={editMenuItem.price}
                    onChange={e => setEditMenuItem({ ...editMenuItem, price: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fs-7 fw-semibold">Category</label>
                  <select
                    className="form-select luxury-select"
                    value={editMenuItem.category}
                    onChange={e => setEditMenuItem({ ...editMenuItem, category: e.target.value })}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fs-7 fw-semibold">Availability</label>
                  <select
                    className="form-select luxury-select"
                    value={editMenuItem.availability}
                    onChange={e => setEditMenuItem({ ...editMenuItem, availability: e.target.value })}
                  >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Description</label>
                  <textarea
                    className="form-control luxury-select"
                    rows="3"
                    value={editMenuItem.description}
                    onChange={e => setEditMenuItem({ ...editMenuItem, description: e.target.value })}
                  ></textarea>
                </div>
                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Image URL</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    value={editMenuItem.image}
                    onChange={e => setEditMenuItem({ ...editMenuItem, image: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <button type="button" className="btn btn-secondary" onClick={() => setEditMenuItem(null)}>Cancel</button>
                <button type="submit" className="btn btn-luxury-gold">Save Menu Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg text-center" style={{ maxWidth: '450px' }}>
            <div className="text-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill fs-1"></i>
            </div>
            <h3 className="h4 text-dark mb-2">Delete {deleteTarget.type === 'restaurant' ? 'Restaurant' : 'Menu Item'}?</h3>
            <p className="text-muted fs-7 mb-4">
              Are you sure you want to remove <strong>{deleteTarget.item.name}</strong>? This action cannot be undone.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-secondary px-4" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn btn-danger px-4" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}