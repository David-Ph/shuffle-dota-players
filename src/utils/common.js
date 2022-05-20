export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const capitalizeString = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

export const copyToClipBoard = (text) => {
  navigator.clipboard.writeText(text);
};
