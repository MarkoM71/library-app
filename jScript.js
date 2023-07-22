let myLibrary = [];

//CONSTRUCTOR-WAS USED PREVIOUSLY
// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

//INPUT CLASS AS PART OF THE CLASS SECTION ASSIGNMENT
class Book{
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

//ADDS TO LIBRARY
function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    if (myLibrary.some(book => book.title == title)) {
        alert("Can't submit the same book")
    } else {
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        storeData();
        displayBooks();
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
                <p class="pages">${book.pages} pages</p>
                <p class="read-status">${book.read ? "Read" : "Not Read"}</p>
                <button class="remove-button" onclick="removeBook(${i})">Remove</button>
                <button class="toggle-read-button" onclick="toggle(${i})">Toggle Read</button>
            </div>`;
        libraryContainer.appendChild(bookElement);
    }
}

//PROTOTYPE FUNCTION USED PREVIOUSLY, TOGGLE READ ADDED TO CLASS
//TOGGLE READ FUNCTION
// Book.prototype.toggleRead = function() {
//   this.read = !this.read;
// }

function toggle(index) {
    myLibrary[index].toggleRead();
    storeData();
    displayBooks();
}

//REMOVE BOOK FROM LIBRARY
function removeBook(index) {
    myLibrary.splice(index, 1);
    storeData();
    displayBooks();
}

//DISPLAY FORM BUTTON
let newBookButton = document.querySelector(".new-book-button");
const popUpForm = document.getElementById('pop-up');
newBookButton.addEventListener("click", function () {
    popUpForm.style.display = "block";
})

//CLOSE FORM BUTTON
let popUpButton = document.querySelector(".close");
popUpButton.addEventListener("click", function () {
    popUpForm.style.display = "none";
})

//CLOSE FORM WITH CLICK OUTSIDE OF MODAL
window.onclick = function(event) {
  if (event.target == popUpForm) {
    popUpForm.style.display = "none";
  }
}

//SUBMIT FORM BUTTON
document.querySelector(".new-book-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();
    let bookForm = document.querySelector(".new-book-form");
    bookForm.reset();
    popUpForm.style.display = "none";
})

//STORE LIBRARY IN LOCAL STORAGE
function storeData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//RESTORE BOOKS FROM LOCAL STORAGE WHEN PAGE REFRESHED
function restoreData() {
    if (!localStorage.myLibrary) {
        displayBooks();
    } else {
        let objects = localStorage.getItem('myLibrary')
        objects = JSON.parse(objects);
        myLibrary = objects;
        displayBooks();
    }
}

restoreData();

