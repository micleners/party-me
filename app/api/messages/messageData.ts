import { Message } from "@/types/message";

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

const sampleContents = [
  "How's it going?",
  "Did you see the news today?",
  "Let's meet up later.",
  "What are your plans for the weekend?",
  "Just finished my project!",
  "Can you help me with this bug?",
  "Lunch at noon?",
  "Happy birthday!",
  "Congrats on your promotion!",
  "See you soon!"
];

export const messages: Message[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  content: sampleContents[i],
  createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
  userId: 1,
}));
