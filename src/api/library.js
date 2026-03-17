export const fetchBooksApi = async (query, type) => {
    const url = `https://openlibrary.org/search.json?${type}=${encodeURIComponent(query)}&limit=20`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};