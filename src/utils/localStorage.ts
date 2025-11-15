export const getLocalStorageItem = item => {
  return JSON.parse(localStorage.getItem(item));
};

export const setLocalStorageItem = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data));
};
