# **Simple Books Catalogue**

## **Task**
[cite_start]The goal of this project is to implement a small web application (without using any external libraries or frameworks) that allows users to search for books by title via a public API (Open Library), view the results, and add their favorite books to a "favorites" list with data persistence[cite: 3, 32].

You can find the full task description here: [Link to the Task Document](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view?ts=69ae7ff7) *(Note: adjust this link if you upload the PDF to your repository)*.

**Implemented Features:**
- [cite_start]Book search via Open Library API[cite: 43, 66].
- [cite_start]Favorites list with `localStorage` persistence[cite: 60].
- [cite_start]**Bonus:** "On-the-fly" search using debounce[cite: 82].
- [cite_start]**Bonus:** Theme management (Light/Dark mode)[cite: 80].
- [cite_start]**Bonus:** Search filtering (by everywhere, title, or author)[cite: 79].

## **How to run the app**

[cite_start]This project uses **Vite** as a module bundler to optimize the code[cite: 31, 35]. 

### **Prerequisites**
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### **Installation & Running locally**
1. **Clone the repository to your local machine.**
2. **Navigate to the project folder and install the dependencies:** npm install
3. **To start the local development server:** npm run dev
4. **Open the provided local URL (usually http://localhost:5173/) in your browser.**

## **Build for Production**
To build the application for production, run: **npm run build**.
This command bundles the application into the **dist/** folder. As per the requirements, the build is configured to output exactly **3 items**: an **index.html** file, a single **.js** file (containing logic and injected styles), and an **assets/** folder containing SVG icons.

## **Folder Structure**
```
simple-books-catalogue_ui/
├── assets/                 # Contains static visual assets (SVG icons for the logo, search bar, and favorites)
│
├── src/                    # The main source folder containing all JavaScript logic and styles  
│   ├── api/                # Contains functions for interacting with external services (Open Library API fetches)
│   │   └── library.js 
│   ├── components/         # Contains UI-related logic (DOM rendering functions and theme toggle management)
│   │   ├── render.js
│   │   └── theme.js
│   ├── styles/             # Contains the global CSS file (main.css) with CSS variables and responsive layout styles
│   │   └── main.css          
│   ├── utils/ # Contains helper functions (debounce.js for search optimization & storage.js for localStorage interactions)
│   │   ├── debounce.js
│   │   └── storage.js
│   └── main.js # The application's entry point that initializes the state, sets up event listeners, and connects all modules 
│
├── .gitignore              # Git ignore rules
├── index.html              # The main HTML template of the application  
├── package.json            # Project dependencies (npm)  
├── README.md               # Basic startup instructions 
└── vite.config.js          # Configuration file for Vite, ensuring the correct production build output  
```