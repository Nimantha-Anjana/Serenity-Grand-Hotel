import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import { CATEGORIES } from '../data/services';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import { validateServiceForm, showSuccessAlert } from '../components/ValidationAlerts';
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

  const handleSaveService = (e) => {
    e.preventDefault();

    // Central Validation Check
    if (!validateServiceForm(service)) return;

    if (isEdit) {
      setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
      showSuccessAlert('Success!', 'Service updated successfully.');
    } else {
      setServices((prev) => [...prev, { ...service, id: Date.now() }]);
      showSuccessAlert('Success!', 'Service created successfully.');
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
    >
      <form id="serviceForm" onSubmit={handleSaveService} className="form-page-form" noValidate>
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-8">
            <label htmlFor="serviceName" className="form-label fs-7 fw-semibold">Service Name *</label>
            <input
              type="text"
              id="serviceName"
              name="name"
              className="form-control"
              value={service.name}
              onChange={(e) => setService({ ...service, name: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="serviceCategory" className="form-label fs-7 fw-semibold">Category</label>
            <select
              id="serviceCategory"
              name="category"
              className="form-select"
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
            <label htmlFor="serviceShortDesc" className="form-label fs-7 fw-semibold">Short Description *</label>
            <input
              type="text"
              id="serviceShortDesc"
              name="shortDesc"
              className="form-control"
              value={service.shortDesc}
              onChange={(e) => setService({ ...service, shortDesc: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label htmlFor="serviceFullDesc" className="form-label fs-7 fw-semibold">Full Description</label>
            <textarea
              id="serviceFullDesc"
              name="fullDesc"
              className="form-control"
              rows="3"
              value={service.fullDesc}
              onChange={(e) => setService({ ...service, fullDesc: e.target.value })}
            ></textarea>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="servicePrice" className="form-label fs-7 fw-semibold">Price / Rate *</label>
            <input
              type="text"
              id="servicePrice"
              name="price"
              className="form-control"
              placeholder="e.g. From $35 or Complimentary"
              value={service.price}
              onChange={(e) => setService({ ...service, price: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="serviceAvailability" className="form-label fs-7 fw-semibold">Availability *</label>
            <input
              type="text"
              id="serviceAvailability"
              name="availability"
              className="form-control"
              placeholder="e.g. Daily, 24/7 Service"
              value={service.availability}
              onChange={(e) => setService({ ...service, availability: e.target.value })}
            />
          </div>

          <div className="col-6 col-md-3">
            <label htmlFor="serviceOpeningTime" className="form-label fs-7 fw-semibold">Opening Time</label>
            <input
              type="time"
              id="serviceOpeningTime"
              name="openingTime"
              className="form-control"
              value={service.openingTime}
              onChange={(e) => setService({ ...service, openingTime: e.target.value })}
            />
          </div>

          <div className="col-6 col-md-3">
            <label htmlFor="serviceClosingTime" className="form-label fs-7 fw-semibold">Closing Time</label>
            <input
              type="time"
              id="serviceClosingTime"
              name="closingTime"
              className="form-control"
              value={service.closingTime}
              onChange={(e) => setService({ ...service, closingTime: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="serviceIcon" className="form-label fs-7 fw-semibold">Bootstrap Icon Class</label>
            <input
              type="text"
              id="serviceIcon"
              name="icon"
              className="form-control"
              placeholder="bi-stars"
              value={service.icon}
              onChange={(e) => setService({ ...service, icon: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-8">
            <label htmlFor="serviceImage" className="form-label fs-7 fw-semibold">Service Image URL</label>
            <input
              type="text"
              id="serviceImage"
              name="image"
              className="form-control"
              value={service.image}
              onChange={(e) => setService({ ...service, image: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="serviceStatus" className="form-label fs-7 fw-semibold">Status</label>
            <select
              id="serviceStatus"
              name="status"
              className="form-select"
              value={service.status}
              onChange={(e) => setService({ ...service, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-12 d-flex align-items-center mt-2">
            <div className="form-check">
              <input
                type="checkbox"
                id="serviceIsFeatured"
                name="isFeatured"
                className="form-check-input"
                checked={service.isFeatured}
                onChange={(e) => setService({ ...service, isFeatured: e.target.checked })}
              />
              <label className="form-check-label fs-7 fw-semibold" htmlFor="serviceIsFeatured">
                Featured Service
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 border-top pt-3">
          <button type="button" id="btnServiceCancel" className="btn btn-secondary px-4" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" id="btnServiceSubmit" className="btn btn-luxury-gold px-4">
            {isEdit ? 'Update Service' : 'Save Service'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}