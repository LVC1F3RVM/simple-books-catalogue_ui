import './styles/main.css';

import { debounce } from './utils/debounce.js';
import { getFavorites, saveFavorites } from './utils/storage.js';
import { fetchBooksApi } from './api/library.js';
import { initTheme, toggleTheme } from './components/theme.js';
import { renderState, renderBooks, renderFavorites } from './components/render.js';

// DOM
const el = {
    searchInput: document.getElementById('searchInput'),
    searchTypes: document.getElementsByName('searchType'),
    resultsContainer: document.getElementById('resultsContainer'),
    favoritesList: document.getElementById('favoritesList'),
    favCount: document.getElementById('favCount'),
    themeToggle: document.getElementById('themeToggle')
};

// State
let state = {
    results: [],
    favorites: getFavorites(),
    isLoading: false
};

// Init theme
initTheme();
el.themeToggle.addEventListener('click', toggleTheme);

// UI update function
const updateUI = () => {
    renderBooks(el.resultsContainer, state.results, state.favorites, handleToggleFavorite);
    renderFavorites(el.favoritesList, el.favCount, state.favorites, handleRemoveFavorite);
};

// Add/remove favorites
const handleToggleFavorite = (book) => {
    const isFav = state.favorites.some(fav => fav.key === book.key);
    
    if (isFav) {
        state.favorites = state.favorites.filter(fav => fav.key !== book.key);
    } else {
        state.favorites.push({
            key: book.key,
            title: book.title,
            author_name: book.author_name,
            cover_i: book.cover_i,
            first_publish_year: book.first_publish_year
        });
    }
    
    saveFavorites(state.favorites);
    updateUI();
};

const handleRemoveFavorite = (bookKey) => {
    state.favorites = state.favorites.filter(fav => fav.key !== bookKey);
    saveFavorites(state.favorites);
    updateUI();
};

// Search handler with debounce
const handleSearch = debounce(async () => {
    const query = el.searchInput.value;
    let type = 'q';
    el.searchTypes.forEach(radio => {
        if (radio.checked) type = radio.value;
    });

    // 1. Empty query check
    if (!query.trim()) {
        state.results = [];
        renderState(el.resultsContainer, 'Start typing to search for books...', false);
        return;
    }

    // 2. Minimum character count check (at least 3)
    if (query.trim().length < 3) {
        state.results = [];
        renderState(el.resultsContainer, 'Enter at least 3 characters to start searching...', false);
        return;
    }

    state.isLoading = true;
    renderState(el.resultsContainer, '', true); // Show loader

    try {
        const data = await fetchBooksApi(query, type);
        
        if (data.docs.length === 0) {
            state.results = [];
            renderState(el.resultsContainer, 'No books found for your search query.', false);
        } else {
            state.results = data.docs;
            updateUI();
        }
    } catch (err) {
        renderState(el.resultsContainer, `Error: ${err.message}`, false);
    } finally {
        state.isLoading = false;
    }
}, 600);

// Event listeners
el.searchInput.addEventListener('input', handleSearch);
el.searchTypes.forEach(radio => radio.addEventListener('change', () => {
    if(el.searchInput.value) handleSearch();
}));

// Initial render
renderFavorites(el.favoritesList, el.favCount, state.favorites, handleRemoveFavorite);