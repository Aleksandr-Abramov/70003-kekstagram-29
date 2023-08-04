import './zoom.js';
import './filters.js';
import './avatar.js';
import { resetScale } from './zoom.js';
import { sendData } from './api.js';
import {
  showFormSubmissionSuccessMessage,
  showFormSubmissionErrorMessage,
} from '../utils/show-alert.js';

const overlayElement = document.querySelector('.img-upload__overlay');
const uploadBtnElement = document.querySelector('.img-upload__input');
const uploadBtnCloseElement = document.querySelector('.img-upload__cancel');
const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const inputHashtagElement = document.querySelector('.text__hashtags');
const uploadFormTextareaElement = document.querySelector('.text__description');
const btnSub = document.querySelector('.img-upload__submit');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}/i;
const HAS_VALID_TAG_COUNT_MESSAGE = 'нельзя указать больше пяти хэш-тегов';
const HAS_VALID_TAG_MESSAGE = 'введён невалидный хэш-тег';
const HAS_UNIQUE_TAG_MESSAGE = 'хэш-теги повторяются';
const IS_MAX_STRING_MESSAGE =
  'длина комментария не может составлять больше 140 символов';

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const normalizeTags = (tagString) =>
  tagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));

const isMaxStringLength = (value) => value.length < 140;

pristine.addValidator(
  uploadFormTextareaElement,
  isMaxStringLength,
  IS_MAX_STRING_MESSAGE
);
const hasValidCount = (value) =>
  normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasValidTag = (value) =>
  normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasUniqueTag = (value) => {
  const lowerCaseTag = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTag.length === new Set(lowerCaseTag).size;
};

pristine.addValidator(
  inputHashtagElement,
  hasValidCount,
  HAS_VALID_TAG_COUNT_MESSAGE,
  1
);
pristine.addValidator(
  inputHashtagElement,
  hasValidTag,
  HAS_VALID_TAG_MESSAGE,
  2
);
pristine.addValidator(
  inputHashtagElement,
  hasUniqueTag,
  HAS_UNIQUE_TAG_MESSAGE,
  3
);

const onShowFormModal = () => {
  overlayElement.classList.remove('hidden');

  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onHideFormModal = () => {
  uploadFormElement.reset();
  resetScale();
  uploadFormElement.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
};

const isInputFucus = () =>
  document.activeElement === inputHashtagElement ||
  document.activeElement === uploadFormTextareaElement;

function onDocumentKeydown(event) {
  if (event.key === 'Escape' && !isInputFucus()) {
    event.preventDefault();
    onHideFormModal();
  }
}

uploadFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    btnSub.setAttribute('disabled', 'disabled');
    const formData = new FormData(uploadFormElement);
    sendData(formData)
      .then(() => {
        showFormSubmissionSuccessMessage();
        onHideFormModal();
      })
      .catch(() => {
        showFormSubmissionErrorMessage();
      })
      .finally(() => btnSub.removeAttribute('disabled'));
  }
});

uploadBtnElement.addEventListener('change', onShowFormModal);
uploadBtnCloseElement.addEventListener('click', onHideFormModal);
