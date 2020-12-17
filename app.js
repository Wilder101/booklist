// ES5 implementation of Book and UI objects

// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor -- contents will be inside of the Prototype
function UI() {}

// Prototype for UI -- Add Book to List
UI.prototype.addBookToList = function(book) {

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

// Prototype for UI -- Show Alert
UI.prototype.showAlert = function(message, className) {

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
    setTimeout(function(){
        document.querySelector(".alert").remove();
    }, 3000);

}

// Prototype for UI -- Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

// Prototype for UI -- Delete Book
UI.prototype.deleteBook = function(target) {

    // Check for delete
    if(target.className === "delete") {

        // Remove anchor's (a) parent's (td) parent (tr)
        target.parentElement.parentElement.remove();
    }
}


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

    // Show alert
    ui.showAlert("Book removed", "success");

    // Prevent page reload
    e.preventDefault();
});
