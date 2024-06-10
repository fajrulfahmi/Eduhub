import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import SignUp from '../pages/signup';
import SignIn from '../pages/signin';
import HomePage from '../pages/User/HomePage';
import DetailEvent from '../pages/User/DetailEvent';
import EventsList from '../pages/User/EventsList';

import AdminDashboard from '../pages/Admin/dashboard';
import AdminEvents from '../pages/Admin/events';
import AdminUser from '../pages/Admin/users';
import AdminAddEvent from '../pages/Admin/addEvent';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/event/:id" element={<DetailEvent />} />
      <Route path="/eventslist" element={<EventsList />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-allevent" element={<AdminEvents />} />
      <Route path="/admin-alluser" element={<AdminUser />} />
      <Route path="/admin-addevent" element={<AdminAddEvent />} />
    </>,
  ),
);
