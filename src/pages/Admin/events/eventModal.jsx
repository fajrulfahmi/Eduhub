import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// import { fetchCreateEvent, fetchUpdateEvent } from '../../redux/events/actions';

export default function EventModal({ onClose, isEdit, eventData }) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    start_time: '',
    end_time: '',
    link: '',
  });
  // const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && eventData) {
      setFormData({
        ...eventData,
      });
    }
  }, [isEdit, eventData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, start_time, end_time, link } = formData;

    if (!title || !description || !start_time || !end_time || !link) {
      setError('Semua bidang harus diisi');
      return;
    }

    if (eventData) {
      // dispatch(fetchUpdateEvent(eventData._id, formData));
      console.log('update data:', eventData._id, formData);
    } else {
      // dispatch(fetchCreateEvent(formData));
      console.log('create event:', eventData._id, formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl mb-4">
          {isEdit ? 'Edit Event' : 'Add New Event'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nama Event</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Deskripsi Event</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <label className="block mb-1">Waktu Mulai</label>
              <input
                type="datetime-local"
                name="start_time"
                // value={schedule.start_time}
                onChange={() => handleChange()}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Waktu Selesai</label>
              <input
                type="datetime-local"
                name="end_time"
                // value={schedule.end_time}
                onChange={() => handleChange()}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Link</label>
            <input
              type="text"
              name="linkMeeting"
              value={formData.linkMeeting}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  eventData: PropTypes.object,
};
