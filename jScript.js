let myLibrary = [];


//CONSTRUCTOR 
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//ADDS TO LIBRARY
function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    if (myLibrary.some(book => book.title == title)) {
        alert("Can't submit the same book")
    } else {
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
    }
}

//DISPLAYS BOOKS
function displayBooks() {
    let libraryContainer = document.querySelector(".library");
    libraryContainer.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookElement = document.createElement("div");
        bookElement.setAttribute("class", "book-card");
        bookElement.innerHTML = `
            <div class="card-header">
                <h3 class="title">${book.title}</h3>
                <h5 class="author">by ${book.author}</h5>
            </div>
            <div class="card-body">
                <p>${book.pages} pages</p>
                <p class="read-status>${book.read ? "Read" : "Not Read Yet"}</p>
                <button class="remove-button" onclick="removeBook(${i})">Remove</button>
                <button class="toggle-read-button" onclick"toggle(${i})">Toggle Read</button>
            </div>`;
        libraryContainer.appendChild(bookElement);
    }
}

//TOGGLE READ FUNCTION
Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function toggle(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

//REMOVE BOOK FROM LIBRARY
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

