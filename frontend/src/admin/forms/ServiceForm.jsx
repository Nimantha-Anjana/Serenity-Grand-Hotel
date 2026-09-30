import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import { CATEGORIES } from '../data/services';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import '../css/Services.css';

const LIST_PATH = '/admin/services';

const EMPTY_SERVICE = {
  name: '',
  shortDesc: '',
  fullDesc: '',
  category: 'Wellness',
  price: '',
  availability: 'Daily',
  openingTime: '08:00',
  closingTime: '20:00',
  icon: 'bi-stars',
  image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
  status: 'Active',
  isFeatured: false
};

/**
 * Add / Edit Hotel Service form page.
 *   /admin/services/add        -> new service
 *   /admin/services/edit/:id   -> edit existing service
 */
export default function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { services, setServices } = useAdminData();

  const isEdit = id !== undefined;
  const existing = isEdit ? services.find((s) => String(s.id) === id) : null;

  const [service, setService] = useState(() => (existing ? { ...existing } : { ...EMPTY_SERVICE }));

  if (isEdit && !existing) {
    return <RecordNotFound label="Service" backTo={LIST_PATH} />;
  }

  const goBack = () => navigate(LIST_PATH);

  // Form Submission (Add/Edit)
  const handleSaveService = (e) => {
    e.preventDefault();
    if (isEdit) {
      setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
    } else {
      setServices((prev) => [...prev, { ...service, id: Date.now() }]);
    }
    goBack();
  };

  return (
    <FormPageLayout
      title={isEdit ? 'Edit Hotel Service' : 'Add New Service'}
      subtitle="Service details, availability, pricing and visibility."
      icon="bi-gear-wide-connected"
      backTo={LIST_PATH}
      backLabel="Back to Services"
      maxWidth={900}
    >
      <form onSubmit={handleSaveService} className="form-page-form">
        <div className="modal-scrollable-body pe-1">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-8">
              <label className="form-label fs-7 fw-semibold">Service Name</label>
              <input
                type="text"
                className="form-control luxury-select"
                required
                value={service.name}
                onChange={(e) => setService({ ...service, name: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label fs-7 fw-semibold">Category</label>
              <select
                className="form-select luxury-select"
                value={service.category}
                onChange={(e) => setService({ ...service, category: e.target.value })}
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label fs-7 fw-semibold">Short Description</label>
              <input
                type="text"
                className="form-control luxury-select"
                required
                value={service.shortDesc}
                onChange={(e) => setService({ ...service, shortDesc: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label fs-7 fw-semibold">Full Description</label>
              <textarea
                className="form-control luxury-select"
                rows="3"
                value={service.fullDesc}
                onChange={(e) => setService({ ...service, fullDesc: e.target.value })}
              ></textarea>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fs-7 fw-semibold">Price / Rate</label>
              <input
                type="text"
                className="form-control luxury-select"
                required
                placeholder="e.g. From $35 or Complimentary"
                value={service.price}
                onChange={(e) => setService({ ...service, price: e.target.value })}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fs-7 fw-semibold">Availability</label>
              <input
                type="text"
                className="form-control luxury-select"
                required
                placeholder="e.g. Daily, 24/7 Service"
                value={service.availability}
                onChange={(e) => setService({ ...service, availability: e.target.value })}
              />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label fs-7 fw-semibold">Opening Time</label>
              <input
                type="time"
                className="form-control luxury-select"
                value={service.openingTime}
                onChange={(e) => setService({ ...service, openingTime: e.target.value })}
              />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label fs-7 fw-semibold">Closing Time</label>
              <input
                type="time"
                className="form-control luxury-select"
                value={service.closingTime}
                onChange={(e) => setService({ ...service, closingTime: e.target.value })}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fs-7 fw-semibold">Bootstrap Icon Class</label>
              <input
                type="text"
                className="form-control luxury-select"
                placeholder="bi-stars"
                value={service.icon}
                onChange={(e) => setService({ ...service, icon: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label fs-7 fw-semibold">Service Image URL (UI Only)</label>
              <input
                type="text"
                className="form-control luxury-select"
                value={service.image}
                onChange={(e) => setService({ ...service, image: e.target.value })}
              />
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Status</label>
              <select
                className="form-select luxury-select"
                value={service.status}
                onChange={(e) => setService({ ...service, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-6 d-flex align-items-end mb-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="featuredCheck"
                  checked={service.isFeatured}
                  onChange={(e) => setService({ ...service, isFeatured: e.target.checked })}
                />
                <label className="form-check-label fs-7 fw-semibold" htmlFor="featuredCheck">
                  Featured Service
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-3 border-top mt-auto">
          <button type="button" className="btn btn-secondary" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" className="btn btn-luxury-gold">
            {isEdit ? 'Update Service' : 'Save Service'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}
