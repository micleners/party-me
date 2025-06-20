import { faker } from '@faker-js/faker';

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

const numberOfMessages = 10;
const messages = [];
for (let i = 0; i < numberOfMessages; i++) {
  messages.push({
    id: faker.string.uuid(),
    content: faker.lorem.sentence(),
    createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
    userId: Math.floor(Math.random() * 10) + 1,
  });
}

console.log(JSON.stringify(messages, null, 2));
export const messagesJson = JSON.stringify(messages, null, 2);

// console.log("Generated messages:", messages);