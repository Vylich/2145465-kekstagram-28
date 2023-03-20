import { showAlert, isEscapeKey, showMessageUpload } from './util.js';
import { MAX_HASHTAG_COUNT, HASHTAG_REGEX } from './variables.js';
import { postData } from './api.js';

const uploadFormNode = document.querySelector('.img-upload__form');
const fieldHashtagNode = uploadFormNode.querySelector('.text__hashtags');
const fieldDescribeNode = uploadFormNode.querySelector('.text__description');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const submitButton = uploadFormNode.querySelector('#upload-submit');

const hashtagPristine = new Pristine(uploadFormNode, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

const validateHashtag = (string) => HASHTAG_REGEX.test(string) || string === '';

const validateHashtagCount = (string) => string.split('').filter((tag) => tag === '#').length <= MAX_HASHTAG_COUNT;

const validateSimilarHashtags = (string) => {
  const stringArr = string.replaceAll(' ', '').toLowerCase().split('#');
  stringArr.shift();
  const unique = Array.from(new Set(stringArr));
  return stringArr.length === unique.length;
};

hashtagPristine.addValidator(
  fieldHashtagNode,
  validateHashtag,
  'Не верно введен хештег!'
);

hashtagPristine.addValidator(
  fieldHashtagNode,
  validateHashtagCount,
  'Максимальное количество хештегов: 5!'
);

hashtagPristine.addValidator(
  fieldHashtagNode,
  validateSimilarHashtags,
  'Одинаковые хештеги!'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
  uploadFormNode.reset();
};

const setUserFormSubmit = (onSuccess) => {
  uploadFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = hashtagPristine.validate();
    if (isValid) {
      blockSubmitButton();
      postData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          showMessageUpload();
        })
        .catch(
          (err) => {
            showAlert(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

fieldHashtagNode.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

fieldDescribeNode.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

export {setUserFormSubmit};
