import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import { AVAILABLE_ICONS } from '../data/facilities';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import '../css/Facilities.css';

const LIST_PATH = '/admin/facilities';

/**
 * Add / Edit Facility form page.
 *   /admin/facilities/add        -> new facility
 *   /admin/facilities/edit/:id   -> edit existing facility
 */
export default function FacilityForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { facilities, setFacilities } = useAdminData();

  const isEdit = id !== undefined;
  const existing = isEdit ? facilities.find((f) => String(f.id) === id) : null;

  const [formData, setFormData] = useState(() =>
    existing
      ? {
          name: existing.name,
          description: existing.description,
          hours: existing.hours,
          status: existing.status,
          icon: existing.icon,
          image: existing.image
        }
      : {
          name: '',
          description: '',
          hours: '',
          status: 'Active',
          icon: 'bi-stars',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
        }
  );

  if (isEdit && !existing) {
    return <RecordNotFound label="Facility" backTo={LIST_PATH} />;
  }

  const goBack = () => navigate(LIST_PATH);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: fakeUrl }));
    }
  };

  // Save Facility (Add or Update)
  const handleSaveFacility = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (isEdit) {
      setFacilities((prev) =>
        prev.map((item) => (item.id === existing.id ? { ...item, ...formData } : item))
      );
    } else {
      setFacilities((prev) => [{ id: Date.now(), ...formData }, ...prev]);
    }
    goBack();
  };

  return (
    <FormPageLayout
      title={isEdit ? 'Edit Facility' : 'Add New Facility'}
      subtitle="Facility details, opening hours, icon and image."
      icon="bi-stars"
      backTo={LIST_PATH}
      backLabel="Back to Facilities"
      maxWidth={800}
    >
      <form onSubmit={handleSaveFacility} className="form-page-form">
        <div className="modal-body-scrollable">
          <div className="row g-3">
            {/* Name */}
            <div className="col-12">
              <label className="form-label small fw-bold text-navy">Facility Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                required
                placeholder="e.g. Grand Ballroom"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* Hours */}
            <div className="col-md-6">
              <label className="form-label small fw-bold text-navy">Opening Hours</label>
              <input
                type="text"
                className="form-control"
                name="hours"
                placeholder="e.g. 08:00 AM - 10:00 PM"
                value={formData.hours}
                onChange={handleInputChange}
              />
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label small fw-bold text-navy">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label small fw-bold text-navy">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                placeholder="Provide details about services, access, or guidelines..."
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Icon Selection */}
            <div className="col-12">
              <label className="form-label small fw-bold text-navy">Select Icon</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className={`bi ${formData.icon}`}></i>
                </span>
                <select
                  className="form-select"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                >
                  {AVAILABLE_ICONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label} ({item.value})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload UI */}
            <div className="col-12">
              <label className="form-label small fw-bold text-navy">Facility Image</label>
              <div className="d-flex align-items-center gap-3">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="rounded border"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                )}
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <small className="text-muted d-block mt-1">
                Upload an image or paste a URL below.
              </small>
              <input
                type="text"
                className="form-control mt-2"
                name="image"
                placeholder="Image URL (optional)"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-3">
          <button
            type="button"
            className="btn btn-light px-4"
            onClick={goBack}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-gold px-4">
            {existing ? 'Update Facility' : 'Save Facility'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}
