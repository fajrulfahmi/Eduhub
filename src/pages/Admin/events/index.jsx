import { useEffect, useState } from 'react';
// import {
//   useSelector,
//   useDispatch
// } from 'react-redux';
// import {
//    Navigate,
//   useNavigate,
// } from 'react-router-dom';

import SButton from '../../../components/Admin/Button';
import Sidebar from '../../../components/Admin/Sidebar';
import Topbar from '../../../components/Admin/Topbar/Topbar';
import EventModal from './eventModal';

export default function AdminEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) return <Navigate to="/signin" replace={true} />;
    //dispath()
  }, []);

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="mx-auto w-full p-5">
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-bold text-2xl">Daftar Event</h1>
            <SButton
              action={handleCreateEvent}
              className="bg-blue-500 hover:bg-blue-600 font-medium text-white text-lg px-4 py-2 rounded-xl"
            >
              Add Event
            </SButton>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="card border border-slate-400 p-10 rounded-lg">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-medium">Nama Kegiatan</h2>
                <hr />
                <p>Deskripsi Kegiatan</p>
                <p>Nama Pembicara</p>
                <p>Link Zoom</p>
                <div className="flex flex-col">
                  <p className="font-semibold">Jadwal:</p>
                  <p></p>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">Status Kegiatan:</p>
                    <p className="bg-emerald-500 text-white text-center font-medium uppercase px-3 py-2 rounded-lg">
                      Online
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">Harga:</p>
                    <p className="text-xl">10.000</p>
                  </div>
                </div>
                <hr className="bg-slate-400" />
                <div className="flex items-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    // onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    // onClick={handlePopUpDelete}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <EventModal
          onClose={() => setIsModalOpen(false)}
          // isEdit={isEdit}
          eventData={selectedEvent}
        />
      )}
    </div>
  );
}
