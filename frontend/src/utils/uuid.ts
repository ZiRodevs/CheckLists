import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);
const UUID_LENGTH = 10;

export const uuid = (uuidLength: number = UUID_LENGTH) => {
  return nanoid(uuidLength);
};
