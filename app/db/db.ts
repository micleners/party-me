import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore/lite';
import messages from './data/messages/messages.json';
import { MessageDto } from '@/types/message';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messagesCollection = collection(db, 'messages');

export const seedMessages = async () => {
  if (!messages || messages.length === 0) {
    return { error: 'No messages to seed' };
  }

  const messagesSnapshot = await getDocs(messagesCollection);
  const existingIds = new Set(messagesSnapshot.docs.map(doc => doc.id));

  const alreadySeeded = messages.some(msg => existingIds.has(msg.id));
  if (alreadySeeded) {
    return { error: 'Database already seeded with seed data.' };
  }


  try {
    const batch = writeBatch(db);

    messages.forEach((item) => {
      const docRef = doc(messagesCollection, item.id);
      batch.set(docRef, {
        ...item,
        createdAt: new Date(),
        id: docRef.id,
      });
    });

    await batch.commit();

    return {
      message: 'Database seeded successfully',
      documentsAdded: messages.length,
    };
  } catch (error) {
    return { error: 'Failed to seed database' };
  }
};

export const dropMessages = async () => {
  const messagesSnapshot = await getDocs(messagesCollection);
  const batch = writeBatch(db);

  messagesSnapshot.docs.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });

  await batch.commit();

  return { message: 'All messages deleted successfully', documentsDeleted: messagesSnapshot.size };
}

export const getMessages = async () => {
  const messagesSnapshot = await getDocs(messagesCollection);
  const messages = messagesSnapshot.docs.map((doc) => doc.data());
  return messages as MessageDto[];
};
