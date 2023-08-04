import { getRandomInteger } from './get-random-integer.js';
import {
  messageComments,
  descriptionData,
  nameData,
} from '../data/rendom-data.js';

function getRandomComments() {
  // один или два комментария
  const commentsCount = getRandomInteger(1, 2);
  // сортировка массива в случайном порядке. Спред - чтобы сохранить исх массив.
  const randomComments = [...messageComments].sort(() => 0.5 - Math.random());
  // выбираем commentsCount  элементов
  return randomComments.slice(0, commentsCount);
}

const createComments = () => ({
  id: Math.random(),
  avatar: `../img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomComments(),
  name: nameData[(0, getRandomInteger(0, nameData.length - 1))],
});

const createObject = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: descriptionData[getRandomInteger(0, descriptionData.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComments),
});
const generateObjects = () =>
  Array.from({ length: getRandomInteger(1, 25) }, (_, index) =>
    createObject(index + 1)
  );

export { generateObjects };
