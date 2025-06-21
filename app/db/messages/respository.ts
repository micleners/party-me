import { db } from '../db';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore/lite';
import { MessageDto } from '@/types/Message';
import { generateMessages } from './seedData';

const messagesCollection = collection(db, 'messages');

export const seedMessages = async () => {
  const messages = generateMessages(10);
  console.log('messages', messages);
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