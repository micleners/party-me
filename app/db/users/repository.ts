import { db } from '../db';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore/lite';
import { User } from '@/types/User';
import { generateUsers } from './seedData';

const usersCollection = collection(db, 'users');

export const seedUsers = async () => {
  const users = generateUsers(10);
  if (!users || users.length === 0) {
    return { error: 'No users to seed' };
  }

  const usersSnapshot = await getDocs(usersCollection);
  if (!usersSnapshot.empty) {
    return { error: 'Database already seeded, cannot seed more users.' };
  }

  try {
    const batch = writeBatch(db);

    users.forEach((item) => {
      const docRef = doc(usersCollection, item.id.toString());
      batch.set(docRef, {
        ...item,
        id: item.id,
      });
    });

    await batch.commit();

    return {
      message: 'Users seeded successfully',
      documentsAdded: users.length,
    };
  } catch (error) {
    return { error: 'Failed to seed users' };
  }
};

export const dropUsers = async () => {
  const usersSnapshot = await getDocs(usersCollection);
  const batch = writeBatch(db);

  usersSnapshot.docs.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });

  await batch.commit();

  return { message: 'All users deleted successfully', documentsDeleted: usersSnapshot.size };
};

export const getUsers = async () => {
  const usersSnapshot = await getDocs(usersCollection);
  const users = usersSnapshot.docs.map((doc) => doc.data());
  return users as User[];
};