import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

import Title from '../../components/User/Title';
import Content from '../../components/User/Content';
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/User/Footer';

const DetailEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvent = async () => {
    try {
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvent({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError('No such document!');
      }
      setLoading(false);
    } catch (e) {
      setError('Error getting document: ' + e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {event && (
        <div>
          <div className="lg:mx-[4rem] sm:max-sm mx-[1rem] py-[1rem]">
            <Navbar />
            <Title
              title={event.title}
              start={formatDateAndTime(event.reg_start)}
              end={formatDateAndTime(event.reg_end)}
            />

            <Content
              date={formatDate(event.time_start)}
              time={`${formatTime(event.time_start)} - ${formatTime(
                event.time_end,
              )}`}
              place={event.location}
              start={event.description}
              overview={event.overview}
              netOp={event.opportunities}
              keyFeatures={event.key_features}
            ></Content>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailEvent;
