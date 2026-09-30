import { createContext, useContext } from 'react';

// Shared in-memory data for every admin module (rooms, bookings, customers ...).
// The list pages and the separate form pages both read/write through this,
// so an item added on a form page shows up in the list page straight away.
export const AdminDataContext = createContext(null);

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) {
    throw new Error('useAdminData must be used inside <AdminDataProvider>');
  }
  return ctx;
}
