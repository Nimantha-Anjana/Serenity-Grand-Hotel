import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// The two apps are lazy-loaded on purpose: each one has its own global CSS
// (the admin uses Bootstrap, the website uses its own reset), and lazy loading
// keeps those stylesheets from being loaded on the wrong side.
const WebApp = lazy(() => import('./web/WebApp'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          {/* Admin panel:  /admin, /admin/rooms, /admin/bookings ... */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* Public website: everything else (/, /rooms, /dining, ...) */}
          <Route path="/*" element={<WebApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
