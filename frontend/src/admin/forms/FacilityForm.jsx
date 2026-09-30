import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import { AVAILABLE_ICONS } from '../data/facilities';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import { validateFacilityForm, showSuccessAlert } from '../components/ValidationAlerts';
import '../css/Facilities.css';

const LIST_PATH = '/admin/facilities';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: fakeUrl }));
    }
  };

  const handleSaveFacility = (e) => {
    e.preventDefault();

    // Central Validation Check
    if (!validateFacilityForm(formData)) return;

    if (isEdit) {
      setFacilities((prev) =>
        prev.map((item) => (item.id === existing.id ? { ...item, ...formData } : item))
      );
      showSuccessAlert('Success!', 'Facility updated successfully.');
    } else {
      setFacilities((prev) => [{ id: Date.now(), ...formData }, ...prev]);
      showSuccessAlert('Success!', 'Facility created successfully.');
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
    >
      <form id="facilityForm" onSubmit={handleSaveFacility} className="form-page-form" noValidate>
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <label htmlFor="facilityName" className="form-label small fw-bold">Facility Name *</label>
            <input
              type="text"
              id="facilityName"
              name="name"
              className="form-control"
              placeholder="e.g. Grand Ballroom"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12 col-md-3">
            <label htmlFor="facilityHours" className="form-label small fw-bold">Opening Hours *</label>
            <input
              type="text"
              id="facilityHours"
              name="hours"
              className="form-control"
              placeholder="e.g. 08:00 AM - 10:00 PM"
              value={formData.hours}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12 col-md-3">
            <label htmlFor="facilityStatus" className="form-label small fw-bold">Status</label>
            <select
              id="facilityStatus"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="facilityDescription" className="form-label small fw-bold">Description</label>
            <textarea
              id="facilityDescription"
              name="description"
              className="form-control"
              rows="3"
              placeholder="Provide details about services, access, or guidelines..."
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="facilityIcon" className="form-label small fw-bold">Select Icon</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className={`bi ${formData.icon}`}></i>
              </span>
              <select
                id="facilityIcon"
                name="icon"
                className="form-select"
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

          <div className="col-12 col-md-6">
            <label htmlFor="facilityImage" className="form-label small fw-bold">Facility Image URL</label>
            <input
              type="text"
              id="facilityImage"
              name="image"
              className="form-control"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="facilityImageFile" className="form-label small fw-bold">Upload Image File</label>
            <input
              type="file"
              id="facilityImageFile"
              name="imageFile"
              className="form-control"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 border-top pt-3">
          <button type="button" id="btnFacilityCancel" className="btn btn-secondary px-4" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" id="btnFacilitySubmit" className="btn btn-luxury-gold px-4">
            {existing ? 'Update Facility' : 'Save Facility'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}