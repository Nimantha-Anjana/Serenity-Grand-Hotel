import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { AdminDataContext } from './adminDataContext';
import { ENTITIES, serverId } from '../../services/adapters';
import { amenitiesApi, galleryCategoriesApi, menuCategoriesApi } from '../../services/api';

const KEYS = Object.keys(ENTITIES); // rooms, activities, bookings, customers, ...
const EMPTY = Object.fromEntries(KEYS.map((k) => [k, []]));

const showError = (title, err) =>
  Swal.fire({ icon: 'error', title, text: err?.message || 'Something went wrong.', confirmButtonColor: '#d33' });

/**
 * Loads all admin data from the API and keeps the familiar
 * `rooms / setRooms`, `bookings / setBookings` ... interface.
 *
 * Calling a setter updates the screen immediately, then compares the old and
 * new lists and sends the difference (create / update / delete) to the backend.
 * If the server rejects a change the list is reloaded so the screen never
 * shows data that is not in the database.
 */
export default function AdminDataProvider({ children }) {
  const [lists, setLists] = useState(EMPTY);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [loadError, setLoadError] = useState('');

  const listsRef = useRef(EMPTY);
  const ctxRef = useRef({ amenities: [], galleryCategories: [], menuCategories: [], restaurants: [], bookingsRaw: [] });

  const commit = useCallback((next) => {
    listsRef.current = next;
    setLists(next);
  }, []);

  const loadAll = useCallback(async () => {
    const ctx = ctxRef.current;
    const [amenities, galleryCategories, menuCategories, ...raws] = await Promise.all([
      amenitiesApi.list(), galleryCategoriesApi.list(), menuCategoriesApi.list(),
      ...KEYS.map((k) => ENTITIES[k].list()),
    ]);
    Object.assign(ctx, { amenities, galleryCategories, menuCategories });
    const raw = Object.fromEntries(KEYS.map((k, i) => [k, raws[i]]));
    ctx.restaurants = raw.restaurants;
    ctx.bookingsRaw = raw.bookings;
    commit(Object.fromEntries(KEYS.map((k) => [k, raw[k].map((row) => ENTITIES[k].fromApi(row, ctx))])));
  }, [commit]);

  const reload = useCallback(async () => {
    try {
      await loadAll();
      setStatus('ready');
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('sgh_token');
        localStorage.removeItem('sgh_user');
        window.location.assign('/admin/login');
        return;
      }
      setLoadError(err.message || 'Could not reach the server.');
      setStatus('error');
    }
  }, [loadAll]);

  useEffect(() => { reload(); }, [reload]);

  const replaceItem = useCallback((key, matchId, item) => {
    commit({ ...listsRef.current, [key]: listsRef.current[key].map((x) => (x.id === matchId ? item : x)) });
  }, [commit]);

  const persist = useCallback(async (key, prev, next) => {
    const cfg = ENTITIES[key];
    const ctx = ctxRef.current;
    const prevById = new Map(prev.map((x) => [x.id, x]));
    const nextIds = new Set(next.map((x) => x.id));

    const created = next.filter((x) => !prevById.has(x.id));
    const updated = next.filter((x) => prevById.has(x.id) && JSON.stringify(x) !== JSON.stringify(prevById.get(x.id)));
    const removed = prev.filter((x) => !nextIds.has(x.id));
    if (!created.length && !updated.length && !removed.length) return;

    let failed = null;
    await Promise.all([
      ...created.map((x) => cfg.create(x, ctx).then((row) => replaceItem(key, x.id, cfg.fromApi(row, ctx))).catch((e) => { failed = e; })),
      ...updated.map((x) => cfg.update(x, ctx).then((row) => replaceItem(key, x.id, cfg.fromApi(row, ctx))).catch((e) => { failed = e; })),
      ...removed.map((x) => cfg.remove(x, ctx).catch((e) => { failed = e; })),
    ]);

    if (key === 'restaurants') ctx.restaurants = listsRef.current.restaurants;
    if (failed) {
      await showError('Could not save changes', failed);
      reload(); // put the screen back in sync with the database
    }
  }, [replaceItem, reload]);

  const setters = useMemo(() => {
    const out = {};
    for (const key of KEYS) {
      const name = `set${key[0].toUpperCase()}${key.slice(1)}`;
      out[name] = (valueOrFn) => {
        const prev = listsRef.current[key];
        const next = typeof valueOrFn === 'function' ? valueOrFn(prev) : valueOrFn;
        commit({ ...listsRef.current, [key]: next });
        persist(key, prev, next);
      };
    }
    return out;
  }, [commit, persist]);

  const value = { ...lists, ...setters, reload, serverId };

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" role="status" aria-label="Loading" />
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="container py-5 text-center">
        <h4 className="mb-2">Could not load data</h4>
        <p className="text-muted">{loadError}</p>
        <p className="small text-muted">Check that the backend is running (npm run dev in /backend) and the database is imported.</p>
        <button className="btn btn-dark" onClick={() => { setStatus('loading'); reload(); }}>Try again</button>
      </div>
    );
  }
  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}
