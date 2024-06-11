import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

async function getAllEvents() {
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const events = [];
    querySnapshot.forEach((doc) => {
      const event = { id: doc.id, ...doc.data() };
      events.push(event);
    });
    console.log(events);
  } catch (e) {
    console.error('Error getting events: ' + e.message);
  }
}

async function addEvent(formData) {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      banner: 'whatisbanner?',
      tag: formData.tags.split(',').map((tag) => tag.trim()),
      title: formData.title,
      // date: Timestamp.fromDate(new Date(formData.date)),
      id_talent: formData.talent, //sementara
      description: formData.description,
      overview: formData.overview,
      opportunities: formData.opportunities,
      key_features: formData.keyFeatures,
      type: formData.eventType,
      link: formData.linkMeeting,
      location: formData.location,
      reg_start: Timestamp.fromDate(new Date(formData.reg_start)),
      reg_end: Timestamp.fromDate(new Date(formData.reg_end)),
      time_start: Timestamp.fromDate(new Date(formData.timeStart)),
      time_end: Timestamp.fromDate(new Date(formData.timeEnd)),
      created_at: Timestamp.fromDate(new Date()),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function updateEvent(eventId, updatedEvent) {
  try {
    const docRef = doc(db, 'events', eventId);
    await updateDoc(docRef, updatedEvent);
    console.log('Document updated with ID: ', docRef.id);
  } catch (e) {
    console.error('Error updating event: ', e.message);
  }
}

async function deleteEvent(eventId) {
  try {
    await deleteDoc(doc(db, 'events', eventId));
    console.log('Deleted event: ', eventId);
  } catch (e) {
    console.error('Error deleting event: ' + eventId.message);
  }
}

export { getAllEvents, addEvent, updateEvent, deleteEvent };
