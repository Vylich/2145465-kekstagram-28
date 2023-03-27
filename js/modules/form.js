import { isEscapeKey } from './util.js';
import { clearEnterData } from './edit-photo.js';
import { FILE_FORMATS } from './variables.js';

const pageBodyNode = document.querySelector('body');
const imgUploadPopupNode = document.querySelector('.img-upload__overlay');
const imgInputNode = document.querySelector('#upload-file');
const imgPreviewNode = document.querySelector('.img-upload__preview');
const smallImgPreviewNode = document.querySelectorAll('.effects__preview');
const cancelUploadNode = document.querySelector('#upload-cancel');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeUserModal();
  }
};

const openUserModal = () => {
  imgUploadPopupNode.classList.remove('hidden');
  pageBodyNode.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUserModal = () => {
  imgUploadPopupNode.classList.add('hidden');
  pageBodyNode.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgInputNode.value = '';
  clearEnterData();
};

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgPreviewNode.children[0].src = img;
  smallImgPreviewNode.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
};

cancelUploadNode.addEventListener('click', () => {
  closeUserModal();
});

imgInputNode.addEventListener('change', () => {
  openUserModal();
  const file = imgInputNode.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_FORMATS.some((it) => fileName.endsWith(it));

  if (matches) {
    displayImage(file);
  }
});

export {openUserModal, closeUserModal, imgPreviewNode};
