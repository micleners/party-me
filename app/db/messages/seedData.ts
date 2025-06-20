import { faker } from '@faker-js/faker';

function getRandomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
}

export const generateMessages = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    content: faker.lorem.sentence(),
    createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
    userId: Math.floor(Math.random() * 10) + 1,
  }));
};

export const generateMessagesJson = (count: number) => {
  JSON.stringify(generateMessages(count), null, 2);
};

export const messages = generateMessages(10);
export const messagesJson = JSON.stringify(generateMessagesJson(10), null, 2);
