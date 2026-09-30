const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export function getToken() {
  return localStorage.getItem('sgh_token');
}

export function getApiUrl(path = '') {
  return `${API_BASE_URL}/${String(path).replace(/^\//, '')}`;
}

async function request(path, options = {}) {
  const { body, headers = {}, ...rest } = options;
  const token = getToken();
  const finalHeaders = { ...headers };

  if (token) finalHeaders.Authorization = `Bearer ${token}`;
  if (body !== undefined && !(body instanceof FormData) && !finalHeaders['Content-Type']) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(getApiUrl(path), {
    ...rest,
    headers: finalHeaders,
    body: body instanceof FormData || typeof body === 'string' || body === undefined ? body : JSON.stringify(body),
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const error = new Error(data?.message || data || `Request failed (${response.status})`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

const resource = (name) => ({
  list: (query = '') => request(`${name}${query ? `?${query}` : ''}`),
  get: (id) => request(`${name}/${id}`),
  create: (data) => request(name, { method: 'POST', body: data }),
  update: (id, data) => request(`${name}/${id}`, { method: 'PUT', body: data }),
  remove: (id) => request(`${name}/${id}`, { method: 'DELETE' }),
});

export const authApi = {
  register: (formData) => request('auth/register', { method: 'POST', body: formData }),
  verifyOtp: (email, otp) => request('auth/verify-otp', { method: 'POST', body: { email, otp } }),
  resendOtp: (email) => request('auth/resend-otp', { method: 'POST', body: { email } }),
  login: (email, password, role) => request('auth/login', { method: 'POST', body: { email, password, ...(role ? { role } : {}) } }),
  forgotPassword: (email) => request('auth/forgot-password', { method: 'POST', body: { email } }),
  resetPassword: (payload) => request('auth/reset-password', { method: 'POST', body: payload }),
  me: () => request('auth/me'),
  updateProfile: (formData) => request('auth/profile', { method: 'PUT', body: formData }),
  changePassword: (currentPassword, newPassword) => request('auth/change-password', { method: 'PUT', body: { currentPassword, newPassword } }),
};

export const roomsApi = resource('rooms');
export const amenitiesApi = resource('amenities');
export const customersApi = resource('customers');
export const facilitiesApi = resource('facilities');
export const servicesApi = resource('services');
export const activitiesApi = resource('activities');
export const galleryApi = resource('gallery');
export const galleryCategoriesApi = resource('gallery-categories');
export const restaurantsApi = resource('restaurants');
export const menuCategoriesApi = resource('menu-categories');
export const menuItemsApi = resource('menu-items');
export const socialLinksApi = resource('social-links');

export const bookingsApi = {
  ...resource('bookings'),
  publicCreate: (data) => request('bookings/public', { method: 'POST', body: data }),
  availability: (roomId, checkIn, checkOut) => request(`bookings/availability?roomId=${encodeURIComponent(roomId)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`),
  payments: (id) => request(`bookings/${id}/payments`),
  addPayment: (id, data) => request(`bookings/${id}/payments`, { method: 'POST', body: data }),
};

export const diningApi = {
  restaurants: resource('dining/restaurants'),
  categories: resource('dining/categories'),
  menu: resource('dining/menu'),
};

export const messagesApi = {
  conversations: () => request('messages'),
  createConversation: (data) => request('messages', { method: 'POST', body: data }),
  messages: (conversationId) => request(`messages/${conversationId}/messages`),
  send: (conversationId, messageText) => request(`messages/${conversationId}/messages`, { method: 'POST', body: { messageText } }),
  markRead: (conversationId) => request(`messages/${conversationId}/read`, { method: 'PUT' }),
};

export const reviewsApi = {
  list: () => request('reviews'),
  create: (data) => request('reviews', { method: 'POST', body: data }),
  update: (id, data) => request(`reviews/${id}`, { method: 'PUT', body: data }),
  remove: (id) => request(`reviews/${id}`, { method: 'DELETE' }),
};

export const dashboardApi = { get: () => request('dashboard') };

export const settingsApi = {
  hotel: { get: () => request('settings/hotel'), update: (data) => request('settings/hotel', { method: 'PUT', body: data }) },
  website: { get: () => request('settings/website'), update: (data) => request('settings/website', { method: 'PUT', body: data }) },
  booking: { get: () => request('settings/booking'), update: (data) => request('settings/booking', { method: 'PUT', body: data }) },
  system: { get: () => request('settings/system'), update: (data) => request('settings/system', { method: 'PUT', body: data }) },
  notifications: { get: () => request('settings/notifications'), update: (data) => request('settings/notifications', { method: 'PUT', body: data }) },
};

export const uploadApi = { image: (file) => { const form = new FormData(); form.append('file', file); return request('upload', { method: 'POST', body: form }); } };
export const healthApi = { get: () => request('health') };

export default { request, getApiUrl, authApi, roomsApi, amenitiesApi, bookingsApi, customersApi, facilitiesApi, servicesApi, activitiesApi, galleryApi, galleryCategoriesApi, restaurantsApi, menuCategoriesApi, menuItemsApi, diningApi, messagesApi, reviewsApi, dashboardApi, settingsApi, socialLinksApi, uploadApi, healthApi };
