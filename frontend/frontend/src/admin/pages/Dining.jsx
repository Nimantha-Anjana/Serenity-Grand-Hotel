import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import '../css/Dining.css';



export default function Dining() {
  const { restaurants, setRestaurants, menuItems, setMenuItems } = useAdminData();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All');
  const [menuSearchTerm, setMenuSearchTerm] = useState('');

  // Modals state (add / edit now live on their own form pages)
  const [deleteTarget, setDeleteTarget] = useState(null);     // { type: 'restaurant'|'menu', item }

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
            onClick={() => navigate('/admin/dining/restaurants/add')}
          >
            <i className="bi bi-shop"></i>
            <span>Add Restaurant</span>
          </button>
          <button 
            className="btn btn-luxury-gold d-flex align-items-center gap-2"
            onClick={() => navigate('/admin/dining/menu/add')}
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

                    {/* Action Buttons for Restaurant */}
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1 action-btn"
                        onClick={() => navigate(`/admin/dining/restaurants/edit/${rest.id}`)}
                        title="Edit Restaurant"
                      >
                        <i className="bi bi-pencil-square"></i>
                        <span>Edit</span>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center action-btn px-3"
                        onClick={() => setDeleteTarget({ type: 'restaurant', item: rest })}
                        title="Delete Restaurant"
                      >
                        <i className="bi bi-trash3"></i>
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
                        {/* Action Buttons for Menu Items */}
                        <div className="d-inline-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-warning text-dark d-inline-flex align-items-center justify-content-center action-btn-icon"
                            title="Edit Menu Item"
                            onClick={() => navigate(`/admin/dining/menu/edit/${item.id}`)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center action-btn-icon"
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
              <button className="btn btn-secondary px-4 d-flex align-items-center gap-1" onClick={() => setDeleteTarget(null)}>
                <i className="bi bi-x"></i> Cancel
              </button>
              <button className="btn btn-danger px-4 d-flex align-items-center gap-1" onClick={handleDeleteConfirm}>
                <i className="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}