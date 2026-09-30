import Swal from 'sweetalert2';

// Universal Alert Handlers
export const showSuccessAlert = (title, text) => {
  Swal.fire({
    icon: 'success',
    title: title || 'Success!',
    text: text || 'Operation completed successfully.',
    confirmButtonColor: '#c5a880',
    timer: 2000
  });
};

export const showErrorAlert = (title, text) => {
  Swal.fire({
    icon: 'error',
    title: title || 'Validation Error',
    text: text || 'Please fill in all required fields correctly.',
    confirmButtonColor: '#d33'
  });
};

const isEmpty = (value) => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
};

// All Form Validators
export const validateActivityForm = (data) => {
  if (isEmpty(data.name)) return showErrorAlert('Activity Name Required', 'Please enter the activity name.') && false;
  if (isEmpty(data.category)) return showErrorAlert('Category Required', 'Please select a category.') && false;
  if (isEmpty(data.shortDesc)) return showErrorAlert('Short Description Required', 'Please enter a short description.') && false;
  if (isEmpty(data.duration)) return showErrorAlert('Duration Required', 'Please enter duration.') && false;
  if (isEmpty(data.location)) return showErrorAlert('Location Required', 'Please enter activity location.') && false;
  if (isEmpty(data.price)) return showErrorAlert('Price Required', 'Please specify the price.') && false;
  if (isEmpty(data.startTime) || isEmpty(data.endTime)) return showErrorAlert('Time Required', 'Please set both starting and ending times.') && false;
  if (isEmpty(data.days)) return showErrorAlert('Days Required', 'Please select at least one day.') && false;
  return true;
};

export const validateBookingForm = (data) => {
  if (isEmpty(data.guestName)) return showErrorAlert('Guest Name Required', 'Please enter guest full name.') && false;
  if (isEmpty(data.guestEmail)) return showErrorAlert('Guest Email Required', 'Please enter guest email.') && false;
  if (isEmpty(data.guestPhone)) return showErrorAlert('Guest Phone Required', 'Please enter guest phone number.') && false;
  if (isEmpty(data.roomName)) return showErrorAlert('Room Name Required', 'Please enter room name.') && false;
  if (isEmpty(data.roomNumber)) return showErrorAlert('Room Number Required', 'Please enter room number.') && false;
  if (isEmpty(data.checkIn) || isEmpty(data.checkOut)) return showErrorAlert('Dates Required', 'Please select Check-In and Check-Out dates.') && false;
  if (isEmpty(data.amount) || isNaN(Number(data.amount))) return showErrorAlert('Amount Required', 'Please enter valid total amount.') && false;
  return true;
};

export const validateCustomerForm = (data) => {
  if (isEmpty(data.name)) return showErrorAlert('Name Required', 'Please enter customer name.') && false;
  if (isEmpty(data.email)) return showErrorAlert('Email Required', 'Please enter customer email.') && false;
  if (isEmpty(data.phone)) return showErrorAlert('Phone Required', 'Please enter customer phone number.') && false;
  return true;
};

export const validateFacilityForm = (data) => {
  if (isEmpty(data.name)) return showErrorAlert('Facility Name Required', 'Please enter facility name.') && false;
  if (isEmpty(data.hours)) return showErrorAlert('Hours Required', 'Please enter opening hours.') && false;
  return true;
};

export const validateGalleryForm = (data) => {
  if (isEmpty(data.title)) return showErrorAlert('Title Required', 'Please enter photo title.') && false;
  if (isEmpty(data.url)) return showErrorAlert('Image URL Required', 'Please provide image URL.') && false;
  return true;
};

export const validateMenuItemForm = (data) => {
  if (isEmpty(data.name)) return showErrorAlert('Item Name Required', 'Please enter menu item name.') && false;
  if (isEmpty(data.price) || isNaN(Number(data.price))) return showErrorAlert('Price Required', 'Please enter valid price.') && false;
  return true;
};

export const validateRestaurantForm = (data) => {
  if (isEmpty(data.name)) return showErrorAlert('Restaurant Name Required', 'Please enter restaurant name.') && false;
  if (isEmpty(data.cuisine)) return showErrorAlert('Cuisine Required', 'Please enter cuisine type.') && false;
  if (isEmpty(data.hours)) return showErrorAlert('Hours Required', 'Please enter opening hours.') && false;
  if (isEmpty(data.location)) return showErrorAlert('Location Required', 'Please enter location.') && false;
  return true;
};

export const validateRoomForm = (data) => {
  if (isEmpty(data.number)) return showErrorAlert('Room Number Required', 'Please enter room number.') && false;
  if (isEmpty(data.name)) return showErrorAlert('Room Name Required', 'Please enter room name.') && false;
  if (isEmpty(data.price) || isNaN(Number(data.price))) return showErrorAlert('Price Required', 'Please enter valid price.') && false;
  return true;
};

export const validateServiceForm = (data) => {
  if (isEmpty(data.name)) return showErrorAlert('Service Name Required', 'Please enter service name.') && false;
  if (isEmpty(data.shortDesc)) return showErrorAlert('Short Description Required', 'Please enter short description.') && false;
  if (isEmpty(data.price)) return showErrorAlert('Price Required', 'Please enter price.') && false;
  return true;
};