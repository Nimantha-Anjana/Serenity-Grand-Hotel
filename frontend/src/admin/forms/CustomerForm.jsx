import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import { validateCustomerForm, showSuccessAlert } from '../components/ValidationAlerts';
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

    // Centralized Validation Check
    if (!validateCustomerForm(customer)) return;

    if (isEdit) {
      setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)));
      showSuccessAlert('Success!', 'Customer updated successfully.');
    } else {
      setCustomers((prev) => [{ ...customer, id: Date.now() }, ...prev]);
      showSuccessAlert('Success!', 'Customer created successfully.');
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
    >
      <form id="customerForm" onSubmit={handleSubmit} className="form-page-form" noValidate>
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <label htmlFor="customerName" className="form-label fs-7 fw-semibold">
              Full Name *
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="bi bi-person"></i></span>
              <input
                type="text"
                id="customerName"
                name="name"
                className="form-control"
                placeholder="e.g. John Doe"
                value={customer.name}
                onChange={e => setCustomer({ ...customer, name: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="customerEmail" className="form-label fs-7 fw-semibold">
              Email Address *
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="bi bi-envelope"></i></span>
              <input
                type="email"
                id="customerEmail"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                value={customer.email}
                onChange={e => setCustomer({ ...customer, email: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="customerPhone" className="form-label fs-7 fw-semibold">
              Phone Number *
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="bi bi-telephone"></i></span>
              <input
                type="text"
                id="customerPhone"
                name="phone"
                className="form-control"
                placeholder="+1 234 567 890"
                value={customer.phone}
                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="customerRegDate" className="form-label fs-7 fw-semibold">Registration Date</label>
            <input
              type="date"
              id="customerRegDate"
              name="regDate"
              className="form-control"
              value={customer.regDate}
              onChange={e => setCustomer({ ...customer, regDate: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-8">
            <label htmlFor="customerAddress" className="form-label fs-7 fw-semibold">Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="bi bi-geo-alt"></i></span>
              <input
                type="text"
                id="customerAddress"
                name="address"
                className="form-control"
                placeholder="Street address, City, Country"
                value={customer.address}
                onChange={e => setCustomer({ ...customer, address: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="customerStatus" className="form-label fs-7 fw-semibold">Status</label>
            <select
              id="customerStatus"
              name="status"
              className="form-select"
              value={customer.status}
              onChange={e => setCustomer({ ...customer, status: e.target.value })}
            >
              <option value="New">New</option>
              <option value="Returning">Returning</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
          <button type="button" id="btnCustomerCancel" className="btn btn-secondary px-4" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" id="btnCustomerSubmit" className="btn btn-luxury-gold px-4">
            {isEdit ? 'Save Changes' : 'Create Customer'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}