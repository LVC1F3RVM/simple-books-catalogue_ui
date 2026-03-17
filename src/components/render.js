const getCoverUrl = (coverId, size = 'M') => {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg` : null;
};

export const renderState = (container, message = '', isLoading = false) => {
    if (isLoading) {
        container.innerHTML = `
            <div class="state-message">
                <div class="loader"></div>
                Downloading books...
            </div>`;
    } else {
        container.innerHTML = `<div class="state-message">${message}</div>`;
    }
};

export const renderBooks = (container, books, favorites, onToggleFavorite) => {
    container.innerHTML = '';
    
    books.forEach(book => {
        const isFav = favorites.some(fav => fav.key === book.key);
        const coverUrl = getCoverUrl(book.cover_i, 'M');
        const author = book.author_name ? book.author_name.slice(0,2).join(', ') : 'Unknown author';
        const year = book.first_publish_year || 'Unknown year';

        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <button class="btn-fav ${isFav ? 'active' : ''}" data-key="${book.key}" title="Add to Favorites">
                <span class="icon-heart-btn"></span>
            </button>
            ${coverUrl 
                ? `<img src="${coverUrl}" alt="${book.title}" class="book-cover" loading="lazy" onerror="this.outerHTML='<div class=\\'book-cover\\'>No cover available</div>'">` 
                : `<div class="book-cover">No cover available</div>`
            }
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${author}</div>
                <div class="book-year">${year}</div>
            </div>
        `;

        const favBtn = card.querySelector('.btn-fav');
        favBtn.addEventListener('click', () => onToggleFavorite(book));

        container.appendChild(card);
    });
};

export const renderFavorites = (containerList, countEl, favorites, onRemoveFavorite) => {
    containerList.innerHTML = '';
    countEl.textContent = favorites.length;

    if (favorites.length === 0) {
        containerList.innerHTML = '<div style="color: var(--text-secondary); text-align: center; padding: 1rem 0;">The Favorites list is empty</div>';
        return;
    }

    favorites.forEach(book => {
        const coverUrl = getCoverUrl(book.cover_i, 'S'); 
        const author = book.author_name ? book.author_name[0] : 'Unknown author';

        const item = document.createElement('div');
        item.className = 'fav-item';
        item.innerHTML = `
            ${coverUrl 
                ? `<img src="${coverUrl}" class="fav-cover" alt="cover">` 
                : `<div class="fav-cover" style="background:#eee; display:flex; align-items:center; justify-content:center; font-size:0.6rem;">No cover available</div>`
            }
            <div class="fav-info">
                <div class="fav-title" title="${book.title}">${book.title}</div>
                <div class="fav-author">${author}</div>
            </div>
            <button class="btn-remove-fav" title="Remove">✖</button>
        `;

        item.querySelector('.btn-remove-fav').addEventListener('click', () => onRemoveFavorite(book.key));
        containerList.appendChild(item);
    });
};