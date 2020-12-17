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

// Prototype for UI -- Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function(e){

    // Get form inputs
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          isbn = document.getElementById("isbn").value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui.clearFields();

    // Prevent page reload
    e.preventDefault();
});
