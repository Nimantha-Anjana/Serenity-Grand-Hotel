import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout, { RecordNotFound } from './FormPageLayout';
import { validateRoomForm, showSuccessAlert } from '../components/ValidationAlerts';
import '../css/Rooms.css';

const LIST_PATH = '/admin/rooms';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=400&q=80';

const EMPTY_ROOM = {
  number: '',
  name: '',
  type: 'Deluxe Room',
  price: '',
  guests: '2',
  bedType: '1 King Bed',
  status: 'Available',
  size: '',
  view: '',
  description: '',
  amenities: ''
};

export default function RoomForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rooms, setRooms } = useAdminData();

  const isEdit = id !== undefined;
  const room = isEdit ? rooms.find((r) => String(r.id) === id) : null;

  const [formData, setFormData] = useState(() =>
    room
      ? {
          number: room.number,
          name: room.name,
          type: room.type,
          price: room.price,
          guests: room.guests,
          bedType: room.bedType,
          status: room.status,
          size: room.size,
          view: room.view,
          description: room.description,
          amenities: room.amenities ? room.amenities.join(', ') : ''
        }
      : EMPTY_ROOM
  );

  if (isEdit && !room) {
    return <RecordNotFound label="Room" backTo={LIST_PATH} />;
  }

  const goBack = () => navigate(LIST_PATH);

  const handleSaveRoom = (e) => {
    e.preventDefault();

    // Central Validation Check
    if (!validateRoomForm(formData)) return;

    if (!isEdit) {
      const newRoom = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        guests: Number(formData.guests),
        amenities: typeof formData.amenities === 'string'
          ? formData.amenities.split(',').map((a) => a.trim())
          : formData.amenities,
        image: DEFAULT_IMAGE
      };
      setRooms([newRoom, ...rooms]);
      showSuccessAlert('Success!', 'Room created successfully.');
    } else {
      setRooms(
        rooms.map((r) =>
          r.id === room.id
            ? {
                ...r,
                ...formData,
                price: Number(formData.price),
                guests: Number(formData.guests),
                amenities: typeof formData.amenities === 'string'
                  ? formData.amenities.split(',').map((a) => a.trim())
                  : formData.amenities
              }
            : r
        )
      );
      showSuccessAlert('Success!', 'Room updated successfully.');
    }
    goBack();
  };

  return (
    <FormPageLayout
      title={isEdit ? `Edit Room #${room.number}` : 'Add New Luxury Room'}
      subtitle="Fill in the room details and save."
      icon="bi-door-open-fill"
      backTo={LIST_PATH}
      backLabel="Back to Rooms"
    >
      <form id="roomForm" onSubmit={handleSaveRoom} className="form-page-form" noValidate>
        <div className="row g-3 mb-4">
          
          
          <div className="col-12 col-md-4">
            <label htmlFor="roomNumber" className="form-label small fw-semibold">
              Room Number *
            </label>
            <input
              type="text"
              id="roomNumber"
              name="number"
              className="form-control"
              placeholder="e.g. 305"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            />
          </div>

          
          <div className="col-12 col-md-8">
            <label htmlFor="roomName" className="form-label small fw-semibold">
              Room Name *
            </label>
            <input
              type="text"
              id="roomName"
              name="name"
              className="form-control"
              placeholder="e.g. Royal Horizon Suite"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          
          <div className="col-12 col-md-6">
            <label htmlFor="roomType" className="form-label small fw-semibold">
              Room Type
            </label>
            <select
              id="roomType"
              name="type"
              className="form-select"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Executive Room">Executive Room</option>
              <option value="Suite">Suite</option>
              <option value="Family Room">Family Room</option>
              <option value="Presidential Suite">Presidential Suite</option>
            </select>
          </div>

          
          <div className="col-12 col-md-6">
            <label htmlFor="roomStatus" className="form-label small fw-semibold">
              Status
            </label>
            <select
              id="roomStatus"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          
          <div className="col-12 col-md-4">
            <label htmlFor="roomPrice" className="form-label small fw-semibold">
              Price per Night ($) *
            </label>
            <input
              type="number"
              id="roomPrice"
              name="price"
              className="form-control"
              placeholder="450"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          
          <div className="col-12 col-md-4">
            <label htmlFor="roomGuests" className="form-label small fw-semibold">
              Max Guests
            </label>
            <input
              type="number"
              id="roomGuests"
              name="guests"
              className="form-control"
              placeholder="2"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            />
          </div>

          
          <div className="col-12 col-md-4">
            <label htmlFor="roomBedType" className="form-label small fw-semibold">
              Bed Type
            </label>
            <input
              type="text"
              id="roomBedType"
              name="bedType"
              className="form-control"
              placeholder="e.g. 1 King Bed"
              value={formData.bedType}
              onChange={(e) => setFormData({ ...formData, bedType: e.target.value })}
            />
          </div>

          
          <div className="col-12 col-md-6">
            <label htmlFor="roomSize" className="form-label small fw-semibold">
              Room Size
            </label>
            <input
              type="text"
              id="roomSize"
              name="size"
              className="form-control"
              placeholder="e.g. 55 sq m"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            />
          </div>

          
          <div className="col-12 col-md-6">
            <label htmlFor="roomView" className="form-label small fw-semibold">
              View
            </label>
            <input
              type="text"
              id="roomView"
              name="view"
              className="form-control"
              placeholder="e.g. Ocean View"
              value={formData.view}
              onChange={(e) => setFormData({ ...formData, view: e.target.value })}
            />
          </div>

          
          <div className="col-12">
            <label htmlFor="roomAmenities" className="form-label small fw-semibold">
              Amenities (Comma separated)
            </label>
            <input
              type="text"
              id="roomAmenities"
              name="amenities"
              className="form-control"
              placeholder="Wi-Fi, Mini Bar, Jacuzzi, Balcony"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
            />
          </div>

          
          <div className="col-12">
            <label htmlFor="roomDescription" className="form-label small fw-semibold">
              Description
            </label>
            <textarea
              id="roomDescription"
              name="description"
              className="form-control"
              rows="3"
              placeholder="Brief room overview..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

        </div>

        
        <div className="d-flex justify-content-end gap-2 border-top pt-3">
          <button type="button" id="btnRoomCancel" className="btn btn-secondary px-4" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" id="btnRoomSubmit" className="btn btn-luxury-gold px-4">
            {isEdit ? 'Update Room' : 'Save Room'}
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}