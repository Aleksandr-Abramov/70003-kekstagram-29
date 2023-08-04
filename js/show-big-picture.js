import { createHtmlElement } from '../utils/create-html-element.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector(
  '.comment-show-count' //счетчик
);
const commentCountMessageElement = document.querySelector('.comments-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentLoaderElement =
  bigPictureElement.querySelector('.comments-loader'); //кнопка
const bodyElement = document.body;
const cancelButtonElement = bigPictureElement.querySelector(
  '.big-picture__cancel'
);

const COMMENT_PER_PORTION = 5;
let commentShow = 0;
let dataComments;

const renderComments = (comments) => {
  commentShow += COMMENT_PER_PORTION;
  if (commentShow >= comments.length) {
    commentLoaderElement.classList.add('hidden');
    commentShow = comments.length;
  } else {
    commentLoaderElement.classList.remove('hidden');
  }
  commentListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.slice(0, commentShow).forEach((item) => {
    const comment = createHtmlElement(item);
    fragment.append(comment);
  });

  commentCountElement.textContent = commentShow;
  commentCountMessageElement.textContent = comments.length;
  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentShow = 0;
};
function onDocumentKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureElement.querySelector('.big-picture__img').firstElementChild.src =
    url;
  bigPictureElement.querySelector('.big-picture__img').firstElementChild.alt =
    description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  dataComments = data.comments;
  document.addEventListener('keydown', onDocumentKeydown);
  renderPictureDetails(data);
  renderComments(data.comments);
};
commentLoaderElement.addEventListener('click', () => renderComments(dataComments));

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showBigPicture };
