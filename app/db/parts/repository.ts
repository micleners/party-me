import { db } from '../db';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore/lite';
import { Part } from '@/types/Part';
import { generateParts } from './seedData';

const partsCollection = collection(db, 'parts');

export const seedParts = async () => {
  const parts = generateParts(10);
  if (!parts || parts.length === 0) {
    return { error: 'No parts to seed' };
  }

  const partsSnapshot = await getDocs(partsCollection);
  if (!partsSnapshot.empty) {
    return { error: 'Database already seeded, cannot seed more parts.' };
  }

  try {
    const batch = writeBatch(db);

    parts.forEach((item) => {
      const docRef = doc(partsCollection, item.id.toString());
      batch.set(docRef, {
        ...item,
        id: item.id,
      });
    });

    await batch.commit();

    return {
      message: 'Parts seeded successfully',
      documentsAdded: parts.length,
    };
  } catch (error) {
    return { error: 'Failed to seed parts' };
  }
};

export const dropParts = async () => {
  const partsSnapshot = await getDocs(partsCollection);
  const batch = writeBatch(db);

  partsSnapshot.docs.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });

  await batch.commit();

  return { message: 'All parts deleted successfully', documentsDeleted: partsSnapshot.size };
};

export const getParts = async () => {
  const partsSnapshot = await getDocs(partsCollection);
  const parts = partsSnapshot.docs.map((doc) => doc.data());
  return parts as Part[];
};