import { faker } from '@faker-js/faker';

const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateMessages = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    content: faker.lorem.sentence(),
    createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
    partId: Math.floor(Math.random() * 10) + 1,
  }));
};

export const messages = generateMessages(10);
export const messagesJson = JSON.stringify(messages, null, 2);
