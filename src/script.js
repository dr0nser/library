// variables
let myLibrary = [];

// components
const overlay = document.getElementById("overlay");
const inputWindow = document.getElementById("input-window");
const welcomeScreen = document.getElementById("welcome");
const bookScreen = document.getElementById("books");
const bookDisplayGrid = document.getElementById("book-grid");
const inputForm = document.getElementById("form");

// buttons
const btn_openInputWindow = document.querySelectorAll(".btn-open-input-window");
const btn_removeBook = document.querySelectorAll(".btn-remove-book");

// input fields
const input_bookTitle = document.getElementById("title");
const input_bookAuthor = document.getElementById("author");
const input_bookPages = document.getElementById("pages");
const input_bookRead = document.getElementById("read");


//functions
function clearInputForm() {
    input_bookTitle.value = '';
    input_bookAuthor.value = '';
    input_bookPages.value = '';
    input_bookRead.checked = false;
}
function openInputWindow() {
    clearInputForm();
    overlay.style.display = "flex";
    inputWindow.style.display = "flex";
}
function closeInputWindow() {
    overlay.style.display = "none";
    inputWindow.style.display = "none";
}
function showWelcomeScreen() {
    welcomeScreen.style.display = "flex";
    bookScreen.style.display = "none";
}
function showBookScreen() {
    welcomeScreen.style.display = "none";
    bookScreen.style.display = "block";
}
function handleInput(e) {
    e.preventDefault();
    const   newBook_title = input_bookTitle.value, 
            newBook_author = input_bookAuthor.value,
            newBook_pages = input_bookPages.value,
            newBook_read = input_bookRead.checked;
    const bookObject = myLibrary.find(({ title }) => title == newBook_title );
    const newBook = {
        title: newBook_title,
        author: newBook_author,
        pages: newBook_pages,
        read: newBook_read
    };
    // no book present with the new book title, i.e. insert the new book in library
    if (bookObject == undefined) {
        myLibrary.push(newBook);
    } 
    // book is present in library so modify the current book
    else {
        myLibrary[myLibrary.indexOf(bookObject)] = newBook;
    }
    closeInputWindow();
    refreshDisplay();
}
function displayBookCards() {
    bookDisplayGrid.innerHTML = '';
    myLibrary.forEach(book => {
        const newBookCard = document.createElement("div");
        newBookCard.classList.add("card");
        newBookCard.innerHTML = `
            <p class="title" id="title">${book.title}</p>
            <p class="author">- by <span id="author">${book.author}</span></p>
            <p class="pages"><span id="pages">${book.pages}</span> pages</p>
            <p class="read">${book.read ? "Read" : "Not Read Yet"}</p>
            <div class="buttons">
                <button class="btn-edit-book">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="none" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button class="btn-remove-book">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="none" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        `;
        bookDisplayGrid.appendChild(newBookCard);
    })
}
function refreshDisplay() {
    if (myLibrary.length == 0) {
        showWelcomeScreen();
    } else {
        displayBookCards();
        showBookScreen();
    }
    document.querySelectorAll(".btn-edit-book").forEach(button => button.onclick = () => {
        const bookTitle = button.parentElement.parentElement.querySelector("#title").innerHTML;
        const bookObject = myLibrary.find(({ title }) => title == bookTitle);
        openInputWindow();
        input_bookTitle.value = bookObject.title;
        input_bookAuthor.value = bookObject.author;
        input_bookPages.value = bookObject.pages;
        input_bookRead.checked = bookObject.read;
    });
    document.querySelectorAll(".btn-remove-book").forEach(button => button.onclick = () => {
        const bookTitle = button.parentElement.parentElement.querySelector("#title").innerHTML;
        const bookObject = myLibrary.find(({ title }) => title == bookTitle);
        myLibrary.splice(myLibrary.indexOf(bookObject), 1);
        refreshDisplay();
    });
}

//events
btn_openInputWindow.forEach(button => button.onclick = () => {
    openInputWindow();
});
overlay.onclick = () => {
    closeInputWindow();
}
inputForm.addEventListener("submit", handleInput);

// initiate
refreshDisplay();