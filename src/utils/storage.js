const STORAGE_KEY = 'library_favorites';

export const getFavorites = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveFavorites = (favorites) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};