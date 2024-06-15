import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { db } from '../../utils/firebase';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;

        try {
          const q = query(
            collection(db, 'users'),
            where('email', '==', userEmail),
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserData(userData);
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      } else {
        console.log('No user is logged in');
      }

      setLoading(false);
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Email: {userData.email}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Role: {userData.role}</p>
      <p>Event: </p>
      <ul>
        {userData.joinedEvents &&
          userData.joinedEvents.map((event) => (
            <li key={event.id}>
              <p>Event ID: {event.id}</p>
              <p>
                Status Selesai:{' '}
                {event.isComplete ? 'Completed' : 'Already Registered'}
              </p>
              <p>Title: {event.title}</p>
              <p>Date: {event.date}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dashboard;

// import { useEffect, useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../utils/firebase';

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userEmail = localStorage.getItem('user')
//         ? JSON.parse(localStorage.getItem('user')).email
//         : null;

//       if (userEmail) {
//         try {
//           const q = query(
//             collection(db, 'users'),
//             where('email', '==', userEmail),
//           );
//           const querySnapshot = await getDocs(q);

//           if (!querySnapshot.empty) {
//             const userData = querySnapshot.docs[0].data();
//             setUserData(userData);
//           }
//         } catch (error) {
//           console.error('Error fetching user data: ', error);
//         }
//       }

//       setLoading(false);
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!userData) {
//     return <div>No user data found.</div>;
//   }

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       <p>Email: {userData.email}</p>
//       <p>First Name: {userData.firstName}</p>
//       <p>Last Name: {userData.lastName}</p>
//       <p>Role: {userData.role}</p>
//       <p>Event: </p>
//       {/* Tambahkan informasi pengguna lainnya di sini */}
//     </div>
//   );
// };

// export default Dashboard;
