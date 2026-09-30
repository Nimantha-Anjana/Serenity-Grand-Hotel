import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import '../css/Customers.css';

const LIST_PATH = '/admin/customers';

const createEmptyCustomer = () => ({
  name: '',
  email: '',
  phone: '',
  address: '',
  status: 'New',
  regDate: new Date().toISOString().split('T')[0],
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  totalBookings: 0,
  lastVisit: '-',
  recentBookings: []
});

/**
 * Add / Edit Customer form page.
 *   /admin/customers/add        -> new customer
 *   /admin/customers/edit/:id   -> edit existing customer
 */
export default function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { customers, setCustomers } = useAdminData();

  const isEdit = id !== undefined;
  const existing = isEdit ? customers.find((c) => String(c.id) === id) : null;

  const [customer, setCustomer] = useState(() => (existing ? { ...existing } : createEmptyCustomer()));

  if (isEdit && !existing) {
    return <RecordNotFound label="Customer" backTo={LIST_PATH} />;
  }

  const goBack = () => navigate(LIST_PATH);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)));
    } else {
      setCustomers((prev) => [{ ...customer, id: Date.now() }, ...prev]);
    }
    goBack();
  };

  return (
    <FormPageLayout
      title={isEdit ? 'Edit Customer Profile' : 'Add New Customer'}
      subtitle={isEdit ? 'Update the guest contact details and status.' : 'Register a new guest profile.'}
      icon={isEdit ? 'bi-pencil-square' : 'bi-person-plus-fill'}
      backTo={LIST_PATH}
      backLabel="Back to Customers"
      maxWidth={800}
    >
      {isEdit ? (
        <form onSubmit={handleSubmit} className="form-page-form">
          <div className="row g-3 mb-3">
            <div className="col-12">
              <label className="form-label fs-7 fw-semibold">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted"><i className="bi bi-person"></i></span>
                <input
                  type="text"
                  className="form-control luxury-select"
                  required
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted"><i className="bi bi-envelope"></i></span>
                <input
                  type="email"
                  className="form-control luxury-select"
                  required
                  value={customer.email}
                  onChange={e => setCustomer({ ...customer, email: e.target.value })}
                />
              </div>
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Phone Number</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted"><i className="bi bi-telephone"></i></span>
                <input
                  type="text"
                  className="form-control luxury-select"
                  required
                  value={customer.phone}
                  onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="col-12">
              <label className="form-label fs-7 fw-semibold">Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted"><i className="bi bi-geo-alt"></i></span>
                <input
                  type="text"
                  className="form-control luxury-select"
                  value={customer.address}
                  onChange={e => setCustomer({ ...customer, address: e.target.value })}
                />
              </div>
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Status</label>
              <select
                className="form-select luxury-select"
                value={customer.status}
                onChange={e => setCustomer({ ...customer, status: e.target.value })}
              >
                <option value="New">New</option>
                <option value="Returning">Returning</option>
                <option value="Active">Active</option>
              </select>
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Registration Date</label>
              <input
                type="date"
                className="form-control luxury-select"
                value={customer.regDate}
                onChange={e => setCustomer({ ...customer, regDate: e.target.value })}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 pt-3 border-top">
            <button type="button" className="btn btn-secondary d-flex align-items-center gap-1" onClick={goBack}>
              <i className="bi bi-x-lg"></i> Cancel
            </button>
            <button type="submit" className="btn btn-luxury-gold d-flex align-items-center gap-1">
              <i className="bi bi-save-fill"></i> Save Changes
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="form-page-form">
          <div className="row g-3 mb-3">
            <div className="col-12">
              <label className="form-label fs-7 fw-semibold">
                Full Name <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted"><i className="bi bi-person"></i></span>
                <input
                  type="text"
                  className="form-control luxury-select"
                  placeholder="e.g. John Doe"
                  required
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">
                Email Address <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted"><i className="bi bi-envelope"></i></span>
                <input
                  type="email"
                  className="form-control luxury-select"
                  placeholder="name@example.com"
                  required
                  value={customer.email}
                  onChange={e => setCustomer({ ...customer, email: e.target.value })}
                />
              </div>
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">
                Phone Number <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted"><i className="bi bi-telephone"></i></span>
                <input
                  type="text"
                  className="form-control luxury-select"
                  placeholder="+1 234 567 890"
                  required
                  value={customer.phone}
                  onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="col-12">
              <label className="form-label fs-7 fw-semibold">Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted"><i className="bi bi-geo-alt"></i></span>
                <input
                  type="text"
                  className="form-control luxury-select"
                  placeholder="Street address, City, Country"
                  value={customer.address}
                  onChange={e => setCustomer({ ...customer, address: e.target.value })}
                />
              </div>
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Status</label>
              <select
                className="form-select luxury-select"
                value={customer.status}
                onChange={e => setCustomer({ ...customer, status: e.target.value })}
              >
                <option value="New">New</option>
                <option value="Returning">Returning</option>
                <option value="Active">Active</option>
              </select>
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Registration Date</label>
              <input
                type="date"
                className="form-control luxury-select"
                value={customer.regDate}
                onChange={e => setCustomer({ ...customer, regDate: e.target.value })}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 pt-3 border-top">
            <button type="button" className="btn btn-secondary d-flex align-items-center gap-1" onClick={goBack}>
              <i className="bi bi-x-lg"></i> Cancel
            </button>
            <button type="submit" className="btn btn-luxury-gold d-flex align-items-center gap-1">
              <i className="bi bi-check-lg"></i> Create Customer
            </button>
          </div>
        </form>
      )}
    </FormPageLayout>
  );
}
