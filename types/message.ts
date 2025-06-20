import { Timestamp } from "firebase/firestore/lite";

export type Message = {
  id: number;
  content: string;
  createdAtDate: string;
  createdAtTime: string;
  userId: number;
};

export type MessageDto = {
  id: string;
  content: string;
  createdAt: Timestamp;
  userId: number;
};
