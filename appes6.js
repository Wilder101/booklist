// ES6 implementation of Book and UI objects, plus Local Storage

// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI {

    // Add book to list method
    addBookToList(book) {
    
        // Grab book list
        const list = document.getElementById("book-list");

        // Create a tr element
        const row = document.createElement("tr");

        // Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    // Show alert method
    showAlert(message, className) {

        // Create a div
        const div = document.createElement("div");
        
        // Add classes
        div.className = `alert ${className}`;

        // Add text
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector(".container");

        // Get form
        const form = document.querySelector("#book-form");

        // Insert new alert div before the form
        container.insertBefore(div, form);

        // Show for 3 seconds
        setTimeout(function() {
            document.querySelector(".alert").remove();
        }, 3000);
    }

    // Delete book method
    deleteBook(target) {

        // Check for delete
        if(target.className === "delete") {

            // Remove anchor's (a) parent's (td) parent (tr)
            target.parentElement.parentElement.remove();
        }
    }

    // Clear fields method
    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
}

// Local Storage Class with static methods (which do not require instantiation)
class Store {

    // Get books method
    static getBooks() {

        // Local variable
        let books;

        // Check Local Storage for any stored books
        if(localStorage.getItem("books") === null) {

            // Set to empty array
            books = [];

        // Capture existing books in Local Storage
        } else {

            // Parse Local Storage entry from a string to an array
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    // Display books method
    static displayBooks() {

        // Local array of books
        const books = Store.getBooks();

        books.forEach(function(book) {

            // Instantiate UI
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });
    }

    // Add book method
    static addBook(book) {

        // Local array of books
        const books = Store.getBooks();

        // Push new book onto book array
        books.push(book);

        // Set Local Storage
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Remove book method
    static removeBook(isbn) {

        // Local array of books
        const books = Store.getBooks();

        // Check books for matching ibn
        books.forEach(function(book, index) {

            // Take out matching isbn
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        // Set Local Storage
        localStorage.setItem("books", JSON.stringify(books));
    }
}

// Event Listener for DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function(e){

    // Get form inputs
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          isbn = document.getElementById("isbn").value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate input
    if(title === "" || author === "" || isbn === "") {
        
        // Error alert
        ui.showAlert("Please fill in all fields", "error");

    } else {

        // Add book to list
        ui.addBookToList(book);

        // Add book to Local Storage
        Store.addBook(book);

        // Show success
        ui.showAlert("Book Added!", "success");

        // Clear fields
        ui.clearFields();
    }

    // Prevent page reload
    e.preventDefault();
});

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function(e){

    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Remove from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show alert
    ui.showAlert("Book removed", "success");

    // Prevent page reload
    e.preventDefault();
});
