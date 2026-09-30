import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import { validateRestaurantForm, showSuccessAlert } from '../components/ValidationAlerts';
import '../css/Dining.css';

const LIST_PATH = '/admin/dining';

const EMPTY_RECORD = {
  name: '',
  cuisine: '',
  hours: '',
  location: '',
  status: 'Open',
  image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&auto=format&fit=crop&q=80'
};

/**
 * Add / Edit Restaurant form page.
 *   /admin/dining/restaurants/add        -> new
 *   /admin/dining/restaurants/edit/:id   -> edit existing
 */
export default function RestaurantForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { restaurants, setRestaurants } = useAdminData();

  const isEdit = id !== undefined;
  const existing = isEdit ? restaurants.find((x) => String(x.id) === id) : null;

  const [record, setRecord] = useState(() => (existing ? { ...existing } : { ...EMPTY_RECORD }));

  if (isEdit && !existing) {
    return <RecordNotFound label="Restaurant" backTo={LIST_PATH} />;
  }

  const goBack = () => navigate(LIST_PATH);

  const handleSave = (e) => {
    e.preventDefault();

    // Central Validation Check
    if (!validateRestaurantForm(record)) return;

    if (isEdit) {
      setRestaurants((prev) => prev.map((x) => (x.id === record.id ? record : x)));
      showSuccessAlert('Success!', 'Restaurant updated successfully.');
    } else {
      setRestaurants((prev) => [...prev, { ...record, id: Date.now() }]);
      showSuccessAlert('Success!', 'Restaurant added successfully.');
    }
    goBack();
  };

  return (
    <FormPageLayout
      title={isEdit ? 'Edit Restaurant' : 'Add New Restaurant'}
      subtitle="Restaurant details, opening hours and status."
      icon="bi-shop"
      backTo={LIST_PATH}
      backLabel="Back to Dining"
      maxWidth={800}
    >
      <form onSubmit={handleSave} className="form-page-form" noValidate>
        <div className="row g-3 mb-3">
          
          {/* Restaurant Name */}
          <div className="col-12">
            <label className="form-label fs-7 fw-semibold">Restaurant Name *</label>
            <input
              type="text"
              className="form-control luxury-select"
              value={record.name}
              onChange={e => setRecord({ ...record, name: e.target.value })}
            />
          </div>

          {/* Cuisine Type */}
          <div className="col-12 col-md-6">
            <label className="form-label fs-7 fw-semibold">Cuisine Type *</label>
            <input
              type="text"
              className="form-control luxury-select"
              placeholder="e.g. Italian Fine Dining"
              value={record.cuisine}
              onChange={e => setRecord({ ...record, cuisine: e.target.value })}
            />
          </div>

          {/* Opening Hours */}
          <div className="col-12 col-md-6">
            <label className="form-label fs-7 fw-semibold">Opening Hours *</label>
            <input
              type="text"
              className="form-control luxury-select"
              placeholder="e.g. 08:00 AM - 10:00 PM"
              value={record.hours}
              onChange={e => setRecord({ ...record, hours: e.target.value })}
            />
          </div>

          {/* Location / Floor */}
          <div className="col-12 col-md-8">
            <label className="form-label fs-7 fw-semibold">Location / Floor *</label>
            <input
              type="text"
              className="form-control luxury-select"
              placeholder="e.g. East Wing, 2nd Floor"
              value={record.location}
              onChange={e => setRecord({ ...record, location: e.target.value })}
            />
          </div>

          {/* Status */}
          <div className="col-12 col-md-4">
            <label className="form-label fs-7 fw-semibold">Status</label>
            <select
              className="form-select luxury-select"
              value={record.status}
              onChange={e => setRecord({ ...record, status: e.target.value })}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="col-12">
            <label className="form-label fs-7 fw-semibold">Image URL</label>
            <input
              type="text"
              className="form-control luxury-select"
              value={record.image}
              onChange={e => setRecord({ ...record, image: e.target.value })}
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
          <button type="button" className="btn btn-secondary d-flex align-items-center gap-1" onClick={goBack}>
            <i className="bi bi-x-circle"></i> Cancel
          </button>
          <button type="submit" className="btn btn-luxury-gold d-flex align-items-center gap-1">
            <i className="bi bi-check-circle"></i> Save Restaurant
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}