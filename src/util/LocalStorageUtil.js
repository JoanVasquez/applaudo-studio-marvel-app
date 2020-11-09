export const setLocalStorageWithExpiry = (key, value, ttl) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorageWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const setFavoriteItemsToLocalStorage = (item, key) => {
  const storedItem = localStorage.getItem(key);
  if (storedItem) {
    const parseStoredItem = JSON.parse(storedItem);
    const checkedIfExists = parseStoredItem.find(
      (currItem) => currItem.id === item.id
    );
    if (!checkedIfExists) {
      parseStoredItem.push(item);
      localStorage.setItem(key, JSON.stringify(parseStoredItem));
    }
  } else {
    const newItem = [item];
    localStorage.setItem(key, JSON.stringify(newItem));
  }
};
