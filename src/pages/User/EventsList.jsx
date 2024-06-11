import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import CardEvent from '../../components/User/CardEvent';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsArray = [];
      querySnapshot.forEach((doc) => {
        const event = { id: doc.id, ...doc.data() };
        eventsArray.push(event);
      });
      setEvents(eventsArray);
      setLoading(false);
    } catch (e) {
      setError('Error getting events: ' + e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Event List</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {events.map((event) => (
          <CardEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
