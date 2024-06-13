import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './utils/firebase';

import SignUp from './pages/signup';
import SignIn from './pages/signin';
import HomePage from './pages/User/HomePage';
import DetailEvent from './pages/User/DetailEvent';
import EventsList from './pages/User/EventsList';
import Dashboard from './pages/User/Dashboard';

import AdminDashboard from './pages/Admin/dashboard';
import AdminEvents from './pages/Admin/events';
import AdminUser from './pages/Admin/users';
import AdminAddEvent from './pages/Admin/addEvent';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(null);
  console.log(`Status Admin ${isAdmin}`);

  useEffect(() => {
    // Mengambil email user dari localStorage
    const userEmail = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).email
      : null;

    const checkIfAdmin = async (email) => {
      try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          return userData.is_admin || false;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error checking admin email: ', error);
        return false;
      }
    };

    if (userEmail) {
      checkIfAdmin(userEmail)
        .then((isAdmin) => {
          setIsAdmin(isAdmin);
        })
        .catch((error) => {
          console.error('Error checking admin status: ', error);
          setIsAdmin(false);
        });
    } else {
      setIsAdmin(false);
    }
  }, []);

  const checkAdminRoute = (element) => {
    if (isAdmin === null) {
      return <div>Loading...</div>;
    } else if (isAdmin === true) {
      return element;
    } else {
      return <Navigate to="/homepage" />;
    }
  };

  return (
    <Routes>
      {/* Route yang diakses oleh User */}
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/event/:id" element={<DetailEvent />} />
      <Route path="/eventslist" element={<EventsList />} />

      {/* Route yang hanya dapat diakses oleh admin */}
      <Route path="/*" element={checkAdminRoute(<AdminDashboard />)} />
      <Route
        path="/admin-dashboard"
        element={checkAdminRoute(<AdminDashboard />)}
      />
      <Route
        path="/admin-allevent"
        element={checkAdminRoute(<AdminEvents />)}
      />
      <Route path="/admin-alluser" element={checkAdminRoute(<AdminUser />)} />
      <Route
        path="/admin-addevent"
        element={checkAdminRoute(<AdminAddEvent />)}
      />
    </Routes>
  );
}

// import { Routes, Route } from 'react-router-dom';

// // Import semua komponen halaman yang diperlukan
// import SignUp from './pages/signup';
// import SignIn from './pages/signin';
// import HomePage from './pages/User/HomePage';
// import DetailEvent from './pages/User/DetailEvent';
// import EventsList from './pages/User/EventsList';

// import AdminDashboard from './pages/Admin/dashboard';
// import AdminEvents from './pages/Admin/events';
// import AdminUser from './pages/Admin/users';
// import AdminAddEvent from './pages/Admin/addEvent';

// export default function App() {
//   return (
//     <>
//       <Routes>
//         {/* Rute-rute yang diakses oleh pengguna */}
//         <Route path="/*" element={<HomePage />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/event/:id" element={<DetailEvent />} />
//         <Route path="/eventslist" element={<EventsList />} />

//         {/* Rute-rute yang hanya dapat diakses oleh admin */}
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/admin-allevent" element={<AdminEvents />} />
//         <Route path="/admin-alluser" element={<AdminUser />} />
//         <Route path="/admin-addevent" element={<AdminAddEvent />} />
//       </Routes>
//     </>
//   );
// }
