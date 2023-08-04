import { renderThumbnails } from './creating-thumbnails.js';
const filtersContainerElement = document.querySelector('.img-filters');

const RANDOM_PICTURE_LIMIT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
let filter = Filter.DEFAULT;
let pictures = [];

const getFilterPictures = () => {
  switch (filter) {
    case Filter.RANDOM:
      return [...pictures]
        .sort(() => 0.5 - Math.random())
        .slice(0, RANDOM_PICTURE_LIMIT);
    case Filter.DISCUSSED:
      return [...pictures].sort(
        (a, b) => b.comments.length - a.comments.length
      );
    default:
      return pictures;
  }
};

filtersContainerElement.addEventListener('click', (e) => {
  if (!e.target.matches('button')) {
    return;
  }

  if (e.target.id === filter) {
    return;
  }

  const activeBtn = e.target;
  filtersContainerElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  activeBtn.classList.add('img-filters__button--active');
  filter = activeBtn.id;
  renderThumbnails(getFilterPictures());
});

const initFilters = (picturesData) => {
  filtersContainerElement.classList.remove('img-filters--inactive');
  pictures = [...picturesData];
};

export { initFilters };
