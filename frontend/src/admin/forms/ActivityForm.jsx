import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import '../css/Activities.css';
import { validateActivityForm, showSuccessAlert } from '../components/ValidationAlerts';

const LIST_PATH = '/admin/activities';

const categories = ['Wellness', 'Recreation', 'Adventure', 'Family', 'Dining', 'Entertainment', 'Events'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

  const handleDayToggle = (day) => {
    const currentDays = formData.days || [];
    if (currentDays.includes(day)) {
      setFormData({ ...formData, days: currentDays.filter((d) => d !== day) });
    } else {
      setFormData({ ...formData, days: [...currentDays, day] });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData({ ...formData, image: url });
    }
  };

  const handleSaveActivity = (e) => {
    e.preventDefault();

    // Centralized Validation Check
    if (!validateActivityForm(formData)) return;

    if (isEdit) {
      setActivities(activities.map((a) => (a.id === activity.id ? { ...formData, id: a.id } : a)));
      showSuccessAlert('Success!', 'Activity updated successfully.');
    } else {
      setActivities([{ ...formData, id: Date.now() }, ...activities]);
      showSuccessAlert('Success!', 'Activity created successfully.');
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
    >
      <form id="activityForm" onSubmit={handleSaveActivity} className="form-page-form" noValidate>
        <div className="row g-3 modal-body-scroll">
          
          {/* Activity Name */}
          <div className="col-12 col-md-6">
            <label htmlFor="activityName" className="form-label small fw-semibold">
              Activity Name *
            </label>
            <input
              type="text"
              id="activityName"
              name="name"
              className="form-control"
              placeholder="e.g. Sunset Beach Walk"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="col-12 col-md-6">
            <label htmlFor="activityCategory" className="form-label small fw-semibold">
              Category *
            </label>
            <select
              id="activityCategory"
              name="category"
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
            <label htmlFor="activityShortDesc" className="form-label small fw-semibold">
              Short Description *
            </label>
            <input
              type="text"
              id="activityShortDesc"
              name="shortDesc"
              className="form-control"
              placeholder="Brief summary for card preview"
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
            />
          </div>

          {/* Full Description */}
          <div className="col-12">
            <label htmlFor="activityFullDesc" className="form-label small fw-semibold">
              Full Description
            </label>
            <textarea
              id="activityFullDesc"
              name="fullDesc"
              className="form-control"
              rows="3"
              placeholder="Detailed activity description and inclusions"
              value={formData.fullDesc}
              onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
            ></textarea>
          </div>

          {/* Duration */}
          <div className="col-12 col-md-4">
            <label htmlFor="activityDuration" className="form-label small fw-semibold">
              Duration *
            </label>
            <input
              type="text"
              id="activityDuration"
              name="duration"
              className="form-control"
              placeholder="e.g. 2 Hours"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>

          {/* Location */}
          <div className="col-12 col-md-8">
            <label htmlFor="activityLocation" className="form-label small fw-semibold">
              Location *
            </label>
            <input
              type="text"
              id="activityLocation"
              name="location"
              className="form-control"
              placeholder="e.g. Oceanfront Pavilion"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Price */}
          <div className="col-12 col-md-4">
            <label htmlFor="activityPrice" className="form-label small fw-semibold">
              Price *
            </label>
            <input
              type="text"
              id="activityPrice"
              name="price"
              className="form-control"
              placeholder="e.g. $45 or Free"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          {/* Price Type */}
          <div className="col-12 col-md-4">
            <label htmlFor="activityPriceType" className="form-label small fw-semibold">
              Price Type
            </label>
            <select
              id="activityPriceType"
              name="priceType"
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
            <label htmlFor="activityOrder" className="form-label small fw-semibold">
              Display Order
            </label>
            <input
              type="number"
              id="activityOrder"
              name="order"
              className="form-control"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
            />
          </div>

          {/* Starting Time */}
          <div className="col-12 col-md-6">
            <label htmlFor="activityStartTime" className="form-label small fw-semibold">
              Starting Time *
            </label>
            <input
              type="time"
              id="activityStartTime"
              name="startTime"
              className="form-control"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />
          </div>

          {/* Ending Time */}
          <div className="col-12 col-md-6">
            <label htmlFor="activityEndTime" className="form-label small fw-semibold">
              Ending Time *
            </label>
            <input
              type="time"
              id="activityEndTime"
              name="endTime"
              className="form-control"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>

          {/* Available Days Checkboxes */}
          <div className="col-12">
            <label className="form-label small fw-semibold d-block mb-2">
              Available Days *
            </label>
            <div className="d-flex flex-wrap gap-2" id="activityDaysContainer">
              {weekDays.map((day) => {
                const isChecked = (formData.days || []).includes(day);
                return (
                  <div key={day} className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`day-${day.toLowerCase()}`}
                      name="days"
                      value={day}
                      checked={isChecked}
                      onChange={() => handleDayToggle(day)}
                    />
                    <label className="form-check-label small" htmlFor={`day-${day.toLowerCase()}`}>
                      {day.slice(0, 3)}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Image */}
          <div className="col-12">
            <label htmlFor="activityImageInput" className="form-label small fw-semibold">
              Activity Image
            </label>
            <input
              type="file"
              id="activityImageInput"
              name="imageFile"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleImageChange}
            />
            {(imagePreview || formData.image) && (
              <div className="modal-img-preview-box">
                <img src={imagePreview || formData.image} alt="Preview" className="img-preview" id="activityImagePreview" />
              </div>
            )}
          </div>

          {/* Status */}
          <div className="col-12 col-md-6">
            <label htmlFor="activityStatus" className="form-label small fw-semibold">
              Status
            </label>
            <select
              id="activityStatus"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Featured Option */}
          <div className="col-12 col-md-6 d-flex align-items-end">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="featuredCheck"
                name="featured"
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
          <button type="button" id="btnActivityCancel" className="btn btn-outline-secondary" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" id="btnActivitySubmit" className="btn btn-luxury-gold">
            {isEdit ? 'Update Activity' : 'Save Activity'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}