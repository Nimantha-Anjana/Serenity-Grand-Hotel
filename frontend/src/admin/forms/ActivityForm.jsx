import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import '../css/Activities.css';

const LIST_PATH = '/admin/activities';

const categories = ['Wellness', 'Recreation', 'Adventure', 'Family', 'Dining', 'Entertainment', 'Events'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Add / Edit Activity form page.
 *   /admin/activities/add        -> new activity
 *   /admin/activities/edit/:id   -> edit existing activity
 */
export default function ActivityForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activities, setActivities } = useAdminData();

  const isEdit = id !== undefined;
  const activity = isEdit ? activities.find((a) => String(a.id) === id) : null;

  const [formData, setFormData] = useState(() =>
    activity
      ? { ...activity }
      : {
          name: '',
          category: 'Wellness',
          shortDesc: '',
          fullDesc: '',
          duration: '1 Hour',
          location: '',
          price: '',
          priceType: 'Paid',
          days: ['Monday', 'Wednesday'],
          startTime: '09:00',
          endTime: '10:00',
          order: activities.length + 1,
          status: 'Active',
          featured: false,
          image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80'
        }
  );
  const [imagePreview, setImagePreview] = useState(activity ? activity.image : '');

  if (isEdit && !activity) {
    return <RecordNotFound label="Activity" backTo={LIST_PATH} />;
  }

  const goBack = () => navigate(LIST_PATH);

  // Day Checkbox Toggle Handler
  const handleDayToggle = (day) => {
    const currentDays = formData.days || [];
    if (currentDays.includes(day)) {
      setFormData({ ...formData, days: currentDays.filter((d) => d !== day) });
    } else {
      setFormData({ ...formData, days: [...currentDays, day] });
    }
  };

  // Local Image Upload Handler (UI Only)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData({ ...formData, image: url });
    }
  };

  // Save Activity Form Submit Handler
  const handleSaveActivity = (e) => {
    e.preventDefault();
    if (isEdit) {
      setActivities(activities.map((a) => (a.id === activity.id ? { ...formData, id: a.id } : a)));
    } else {
      setActivities([{ ...formData, id: Date.now() }, ...activities]);
    }
    goBack();
  };

  return (
    <FormPageLayout
      title={isEdit ? 'Edit Activity' : 'Add New Activity'}
      subtitle="Set the activity details, schedule and visibility."
      icon="bi-journal-plus"
      backTo={LIST_PATH}
      backLabel="Back to Activities"
      maxWidth={1000}
    >
      <form onSubmit={handleSaveActivity} className="form-page-form">
        <div className="row g-3 modal-body-scroll">
          {/* Activity Name */}
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Activity Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Sunset Beach Walk"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Category */}
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Category *</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Short Description */}
          <div className="col-12">
            <label className="form-label small fw-semibold">Short Description *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Brief summary for card preview"
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              required
            />
          </div>

          {/* Full Description */}
          <div className="col-12">
            <label className="form-label small fw-semibold">Full Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Detailed activity description and inclusions"
              value={formData.fullDesc}
              onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
            ></textarea>
          </div>

          {/* Duration */}
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold">Duration *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 2 Hours"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div className="col-12 col-md-8">
            <label className="form-label small fw-semibold">Location *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Oceanfront Pavilion"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          {/* Price */}
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold">Price *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. $45 or Free"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          {/* Price Type */}
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold">Price Type</label>
            <select
              className="form-select"
              value={formData.priceType}
              onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
            >
              <option value="Paid">Paid</option>
              <option value="Complimentary">Complimentary</option>
            </select>
          </div>

          {/* Display Order */}
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold">Display Order</label>
            <input
              type="number"
              className="form-control"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
            />
          </div>

          {/* Start & End Time */}
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Starting Time</label>
            <input
              type="time"
              className="form-control"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Ending Time</label>
            <input
              type="time"
              className="form-control"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>

          {/* Available Days Checkboxes */}
          <div className="col-12">
            <label className="form-label small fw-semibold d-block mb-2">Available Days</label>
            <div className="d-flex flex-wrap gap-2">
              {weekDays.map((day) => {
                const isChecked = (formData.days || []).includes(day);
                return (
                  <div key={day} className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`day-${day}`}
                      checked={isChecked}
                      onChange={() => handleDayToggle(day)}
                    />
                    <label className="form-check-label small" htmlFor={`day-${day}`}>
                      {day.slice(0, 3)}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Image & Preview */}
          <div className="col-12">
            <label className="form-label small fw-semibold">Activity Image</label>
            <input type="file" className="form-control mb-2" accept="image/*" onChange={handleImageChange} />
            {(imagePreview || formData.image) && (
              <div className="modal-img-preview-box">
                <img src={imagePreview || formData.image} alt="Preview" className="img-preview" />
              </div>
            )}
          </div>

          {/* Status & Featured Options */}
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-12 col-md-6 d-flex align-items-end">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="featuredCheck"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label className="form-check-label fw-semibold small text-navy" htmlFor="featuredCheck">
                Mark as Featured Activity
              </label>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-4">
          <button type="button" className="btn btn-outline-secondary" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" className="btn btn-luxury-gold">
            {isEdit ? 'Update Activity' : 'Save Activity'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}
