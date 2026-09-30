import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import '../css/Dining.css';

const LIST_PATH = '/admin/dining';

const EMPTY_RECORD = {
  name: '',
  category: 'Main Course',
  price: '',
  availability: 'Available',
  description: '',
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=80'
};

/**
 * Add / Edit Menu Item form page.
 *   /admin/dining/menu/add        -> new
 *   /admin/dining/menu/edit/:id   -> edit existing
 */
export default function MenuItemForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { menuItems, setMenuItems } = useAdminData();

  const isEdit = id !== undefined;
  const existing = isEdit ? menuItems.find((x) => String(x.id) === id) : null;

  const [record, setRecord] = useState(() => (existing ? { ...existing } : { ...EMPTY_RECORD }));

  if (isEdit && !existing) {
    return <RecordNotFound label="Menu Item" backTo={LIST_PATH} />;
  }

  const goBack = () => navigate(LIST_PATH);

  const handleSave = (e) => {
    e.preventDefault();
    if (isEdit) {
      setMenuItems((prev) => prev.map((x) => (x.id === record.id ? record : x)));
    } else {
      setMenuItems((prev) => [...prev, { ...record, id: Date.now() }]);
    }
    goBack();
  };

  return (
    <FormPageLayout
      title={isEdit ? 'Edit Menu Item' : 'Add New Menu Item'}
      subtitle="Dish name, price, category and availability."
      icon="bi-cup-hot-fill"
      backTo={LIST_PATH}
      backLabel="Back to Dining"
      maxWidth={800}
    >
      <form onSubmit={handleSave} className="form-page-form">
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-8">
            <label className="form-label fs-7 fw-semibold">Item Name</label>
            <input
              type="text"
              className="form-control luxury-select"
              required
              value={record.name}
              onChange={e => setRecord({ ...record, name: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label fs-7 fw-semibold">Price ($)</label>
            <input
              type="number"
              className="form-control luxury-select"
              required
              value={record.price}
              onChange={e => setRecord({ ...record, price: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label fs-7 fw-semibold">Category</label>
            <select
              className="form-select luxury-select"
              value={record.category}
              onChange={e => setRecord({ ...record, category: e.target.value })}
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
              value={record.availability}
              onChange={e => setRecord({ ...record, availability: e.target.value })}
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
              value={record.description}
              onChange={e => setRecord({ ...record, description: e.target.value })}
            ></textarea>
          </div>
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

        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
          <button type="button" className="btn btn-secondary d-flex align-items-center gap-1" onClick={goBack}>
            <i className="bi bi-x-circle"></i> Cancel
          </button>
          <button type="submit" className="btn btn-luxury-gold d-flex align-items-center gap-1">
            <i className="bi bi-check-circle"></i> Save Menu Item
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}
