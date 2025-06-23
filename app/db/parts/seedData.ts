import { Part } from '@/types/Part';
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

export const generateParts = (count: number): Part[] => {
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

export const parts = generateParts(10);
export const partsJson = JSON.stringify(parts, null, 2);
