const minusScaleButtonElement = document.querySelector(
  '.scale__control--smaller'
);
const plasScaleButtonElement = document.querySelector(
  '.scale__control--bigger'
);
const scaleValueElement = document.querySelector('.scale__control--value');
const imagePreviewZoom = document.querySelector('.img-upload__preview img');
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
let startScalePercent = 100;
let startScaleImage = 1;

const changeScale = (value) => {
  if (value === 'minus') {
    if (startScalePercent === MIN_SCALE) {
      return;
    }
    scaleValueElement.value = `${(startScalePercent -= STEP_SCALE)}%`;
    imagePreviewZoom.style = `transform: scale(${(startScaleImage -=
      STEP_SCALE / 100)}`;
  }
  if (value === 'plas') {
    if (startScalePercent === MAX_SCALE) {
      return;
    }
    scaleValueElement.value = `${(startScalePercent += STEP_SCALE)}%`;
    imagePreviewZoom.style = `transform: scale(${(startScaleImage +=
      STEP_SCALE / 100)}`;
  }
};
const resetScale = () => {
  scaleValueElement.value = `${MAX_SCALE}%`;
  // imagePreviewZoom.style = `transform: scale(${MAX_SCALE / 100}`;
  imagePreviewZoom.style = `transform: scale(${100}%`;
  startScalePercent = 100;
  startScaleImage = 1;
};
minusScaleButtonElement.addEventListener('click', () => changeScale('minus'));
plasScaleButtonElement.addEventListener('click', () => changeScale('plas'));

export { resetScale };
