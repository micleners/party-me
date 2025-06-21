import { User } from '@/types/User';
import { faker } from '@faker-js/faker';

const defaultColors = [
  'dark',
  'gray',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
];

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      id: i + 1,
      color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
      firstName,
      lastName,
      initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
      persona: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
    };
  });
};

export const users = generateUsers(10);
export const usersJson = JSON.stringify(users, null, 2);
