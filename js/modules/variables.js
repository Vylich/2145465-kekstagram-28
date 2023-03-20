const EFFECTS_DATA = {
  chrome: {
    filter: 'grayscale',
    measurement: '',
  },
  sepia: {
    filter: 'sepia',
    measurement: '',
  },
  marvin: {
    filter: 'invert',
    measurement: '%',
  },
  phobos: {
    filter: 'blur',
    measurement: 'px',
  },
  heat: {
    filter: 'brightness',
    measurement: '',
  },
  none: {
    filter: '',
    measurement: '',
  },
};
const COMMENT_NUMBERS_TO_SHOW = 5;
const HASHTAG_REGEX = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const DEFAULT_SCALE_IMAGE = 100;
const STEP_SCALE_IMAGE = 25;

export {
  COMMENT_NUMBERS_TO_SHOW,
  HASHTAG_REGEX,
  MAX_HASHTAG_COUNT,
  DEFAULT_SCALE_IMAGE,
  EFFECTS_DATA,
  STEP_SCALE_IMAGE,
};
