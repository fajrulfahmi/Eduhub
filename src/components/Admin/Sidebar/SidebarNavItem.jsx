import { Link } from 'react-router-dom';

export const SidebarNavItem = () => {
  const handleSignOut = () => {};

  return (
    <ul className="space-y-2">
      <li className="hover:bg-gray-700 p-4">
        <Link className="text-white" to="/admin-dashboard">
          Dashboard
        </Link>
      </li>
      <li className="hover:bg-gray-700 p-4">
        <Link className="text-white" to="/admin-allevent">
          Daftar Event
        </Link>
      </li>
      <li className="hover:bg-gray-700 p-4">
        <Link className="text-white" to="/admin-alluser">
          Daftar User
        </Link>
      </li>
      <li className="hover:bg-gray-700 p-4">
        <Link className="text-white" to="/admin-talents">
          Daftar Talents
        </Link>
      </li>
      <li className="hover:bg-gray-700 p-4">
        <Link className="text-white" to="/admin-historypayments">
          History Pembayaran
        </Link>
      </li>
      <li className="hover:bg-gray-700 p-4">
        <button onClick={handleSignOut} className=" text-red-500">
          Sign Out
        </button>
      </li>
    </ul>
  );
};
