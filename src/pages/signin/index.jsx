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

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;

    const auth = getAuth();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const isAdmin = await checkIfAdmin(email);
      const redirectRoute = isAdmin ? '/admin-dashboard' : '/homepage';
      navigate(redirectRoute);

      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Terjadi kesalahan');
    }
  };

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
