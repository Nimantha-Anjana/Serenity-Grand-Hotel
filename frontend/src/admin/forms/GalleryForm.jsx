import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import { validateGalleryForm, showSuccessAlert } from '../components/ValidationAlerts';
import '../css/Gallery.css';

const LIST_PATH = '/admin/gallery';

/**
 * Add / Edit Gallery Image form page.
 *   /admin/gallery/add        -> new image
 *   /admin/gallery/edit/:id   -> edit existing image
 */
export default function GalleryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { images, setImages } = useAdminData();

  const isEdit = id !== undefined;
  const image = isEdit ? images.find((img) => String(img.id) === id) : null;

  const [formData, setFormData] = useState(() =>
    image
      ? {
          title: image.title,
          category: image.category,
          status: image.status,
          description: image.description,
          url: image.url,
          displayOrder: image.displayOrder
        }
      : {
          title: '',
          category: 'Hotel',
          status: 'Published',
          description: '',
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
          displayOrder: images.length + 1
        }
  );

  if (isEdit && !image) {
    return <RecordNotFound label="Gallery image" backTo={LIST_PATH} />;
  }

  const goBack = () => navigate(LIST_PATH);

  const handleSaveImage = (e) => {
    e.preventDefault();

    // Central Validation Check
    if (!validateGalleryForm(formData)) return;

    if (!isEdit) {
      const newImg = {
        id: Date.now(),
        ...formData,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setImages([newImg, ...images]);
      showSuccessAlert('Success!', 'Gallery image added successfully.');
    } else {
      setImages(images.map((img) => (img.id === image.id ? { ...img, ...formData } : img)));
      showSuccessAlert('Success!', 'Gallery image updated successfully.');
    }
    goBack();
  };

  return (
    <FormPageLayout
      title={isEdit ? 'Edit Gallery Image' : 'Add Gallery Image'}
      subtitle="Image title, category, status and display order."
      icon="bi-images"
      backTo={LIST_PATH}
      backLabel="Back to Gallery"
      maxWidth={800}
    >
      <form onSubmit={handleSaveImage} className="form-page-form" noValidate>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label small fw-semibold">Image Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Presidential Suite Bedroom"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Hotel">Hotel</option>
              <option value="Rooms">Rooms</option>
              <option value="Dining">Dining</option>
              <option value="Facilities">Facilities</option>
              <option value="Events">Events</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Image URL *</label>
            <input
              type="text"
              className="form-control"
              placeholder="https://images.unsplash.com/..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold">Display Order</label>
            <input
              type="number"
              className="form-control"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label small fw-semibold">Image Upload (UI Mock)</label>
            <input type="file" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label small fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter brief description of the photo..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
          {formData.url && (
            <div className="col-12">
              <label className="form-label small fw-semibold d-block">Preview</label>
              <img src={formData.url} alt="Preview" className="img-thumbnail modal-preview-img" />
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={goBack}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-luxury-gold">
            {isEdit ? 'Update Image' : 'Save Image'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}