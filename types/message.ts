import { Timestamp } from "firebase/firestore/lite";

export type Message = {
  id: number;
  content: string;
  createdAtDate: string;
  createdAtTime: string;
  partId: number;
};

export type MessageDto = {
  id: string;
  content: string;
  createdAt: Timestamp;
  partId: number;
};
