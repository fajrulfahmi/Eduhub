import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormSignIn from './formSignIn';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const db = getFirestore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;

        // Cek apakah email adalah email admin
        const isAdmin = await checkIfAdmin(email);

        // Menentukan rute redirect berdasarkan status admin atau bukan
        const redirectRoute = isAdmin ? '/admin-dashboard' : '/homepage';

        // Simpan informasi pengguna ke local storage
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect ke rute
        navigate(redirectRoute);
      })
      .catch(() => {
        alert('Terjadi kesalahan');
      });
  };

  // Fungsi untuk memeriksa apakah email adalah email admin
  const checkIfAdmin = async (email) => {
    try {
      const q = query(collection(db, 'admins'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking admin email: ', error);
      return false;
    }
  };

  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div
        className="flex flex-col justify-between p-10"
        style={{
          backgroundImage: `url('./images/img-signin.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          objectFit: 'cover',
        }}
      >
        <p className="text-3xl text-colorprimary font-extrabold">
          InsightGathers.
        </p>
        <div className="flex flex-col gap-40">
          <p className="text-3xl text-white font-medium">
            We provide various top-notch events to help you enhance your skills
            in the field of technology.
          </p>
          <span className="copyright w-1/3 text-colorprimary font-medium">
            Copyright © 2024 InsightGathers All Right Reserved
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between p-10 gap-10">
        <div className="flex w-full flex-col items-center justify-center mt-40 gap-10">
          <h1 className="w-4/5 text-center text-5xl font-semibold">
            Welcome Back
          </h1>
          <p className="w-[60%] text-center text-lg font-medium">
            Please enter your details.
          </p>
          <FormSignIn
            className="mb-20"
            handleSubmit={handleEmailPasswordLogin}
            onChange={handleInputChange}
            valueEmail={formData.email}
            valuePassword={formData.password}
          />
          <span className="text-lg text-colorgray font-medium">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-black font-bold underline">
              Sign Up
            </Link>
          </span>
        </div>
        <ul className="self-end flex items-end gap-5">
          <li>
            <Link to="#terms-of-service" className="font-semibold">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="#privacy-police" className="font-semibold">
              Privacy Police
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

// import { useState } from 'react';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import FormSignIn from './formSignIn';

// export default function SignIn() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleEmailPasswordLogin = (e) => {
//     e.preventDefault();
//     const email = formData.email;
//     const password = formData.password;

//     const auth = getAuth();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((result) => {
//         localStorage.setItem('user', JSON.stringify(result.user));
//         navigate('/homepage');
//       })
//       .catch(() => {
//         alert('Terjadi kesalahan');
//       });
//   };

//   return (
//     <div className="grid grid-cols-2 w-full h-screen">
//       <div
//         className="flex flex-col justify-between p-10"
//         style={{
//           backgroundImage: `url('./images/img-signin.png')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           objectFit: 'cover',
//         }}
//       >
//         <p className="text-3xl text-colorprimary font-extrabold">
//           InsightGathers.
//         </p>
//         <div className="flex flex-col gap-40">
//           <p className="text-3xl text-white font-medium">
//             We provide various top-notch events to help you enhance your skills
//             in the field of technology.
//           </p>
//           <span className="copyright w-1/3 text-colorprimary font-medium">
//             Copyright © 2024 InsightGathers All Right Reserved
//           </span>
//         </div>
//       </div>
//       <div className="flex flex-col items-center justify-between p-10 gap-10">
//         <div className="flex w-full flex-col items-center justify-center mt-40 gap-10">
//           <h1 className="w-4/5 text-center text-5xl font-semibold">
//             Welcome Back
//           </h1>
//           <p className="w-[60%] text-center text-lg font-medium">
//             Please enter your details.
//           </p>
//           <FormSignIn
//             className="mb-20"
//             handleSubmit={handleEmailPasswordLogin}
//             onChange={handleInputChange}
//             valueEmail={formData.email}
//             valuePassword={formData.password}
//           />
//           <span className="text-lg text-colorgray font-medium">
//             Don’t have an account?{' '}
//             <Link to="/signup" className="text-black font-bold underline">
//               Sign Up
//             </Link>
//           </span>
//         </div>
//         <ul className="self-end flex items-end gap-5">
//           <li>
//             <Link to="#terms-of-service" className="font-semibold">
//               Terms of Service
//             </Link>
//           </li>
//           <li>
//             <Link to="#privacy-police" className="font-semibold">
//               Privacy Police
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// import { Link } from 'react-router-dom';

// import FormSignIn from './formSignIn';

// export default function SignIn() {
//   return (
//     <div className="grid grid-cols-2 w-full h-screen">
//       <div
//         className="flex flex-col justify-between p-10"
//         style={{
//           backgroundImage: `url('./images/img-signin.png')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           objectFit: 'cover',
//         }}
//       >
//         <p className="text-3xl text-colorprimary font-extrabold">
//           InsightGathers.
//         </p>
//         <div className="flex flex-col gap-40">
//           <p className="text-3xl text-white font-medium">
//             We provide various top-notch events to help you enhance your skills
//             in the field of technology.
//           </p>
//           <span className="copyright w-1/3 text-colorprimary font-medium">
//             Copyright © 2024 InsightGathers All Right Reserved
//           </span>
//         </div>
//       </div>
//       <div className="flex flex-col items-center justify-between p-10 gap-10">
//         <div className="flex w-full flex-col items-center justify-center mt-40 gap-10">
//           <h1 className="w-4/5 text-center text-5xl font-semibold">
//             Welcome Back
//           </h1>
//           <p className="w-[60%] text-center text-lg font-medium">
//             Please enter your details.
//           </p>
//           <FormSignIn className="mb-20" />
//           <span className="text-lg text-colorgray font-medium">
//             Don’t have an account?{' '}
//             <Link to="/" className="text-black font-bold underline">
//               Sign Up
//             </Link>
//           </span>
//         </div>
//         <ul className="self-end flex items-end gap-5">
//           <li>
//             <Link to="#terms-of-service" className="font-semibold">
//               Terms of Service
//             </Link>
//           </li>
//           <li>
//             <Link to="#privacy-police" className="font-semibold">
//               Privacy Police
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
