const myLibrary = [];

// function as constructor
function Book() {
    if (!new.target) {
        throw new Error("You must use the 'new' constructor");
    }
    this.id = crypto.randomUUID();
}

// function to add book to library
function addBookToLibrary(title, author, synopsis, category, isRead) {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.synopsis = synopsis;
    book.category = category;
    book.isRead = isRead;

    myLibrary.push(book);

    console.log(myLibrary);
    console.log(book);
}

// function for display
function display() {
    const main = document.querySelector("main");
    main.innerHTML = "";
    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("data-book-id", book.id);

        let text;

        const title = document.createElement("h2");
        text = document.createTextNode(`${book.title}`);
        title.appendChild(text);

        const author = document.createElement("h3");
        text = document.createTextNode(`${book.author}`);
        author.appendChild(text);

        const category = document.createElement("span");
        text = document.createTextNode(`Category: ${book.category}`);
        category.appendChild(text);

        const SVGNameSpace = "http://www.w3.org/2000/svg";

        const svgElement = document.createElementNS(SVGNameSpace, "svg");

        svgElement.setAttribute("viewBox", "0 0 24 24");

        if (book.isRead) {
            svgElement.setAttribute("fill", "green");
            
            const svgTitle = document.createElementNS(SVGNameSpace, "title");
            text = document.createTextNode("check-circle");
            svgTitle.appendChild(text);

            const svgPath = document.createElementNS(SVGNameSpace, "path");
            svgPath.setAttribute(
                "d",
                "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            );

            svgElement.appendChild(svgTitle);
            svgElement.appendChild(svgPath);
        } else {
            svgElement.setAttribute("fill", "red");
            const svgTitle = document.createElementNS(SVGNameSpace, "title");
            text = document.createTextNode("close-circle");
            svgTitle.appendChild(text);

            const svgPath = document.createElementNS(SVGNameSpace, "path");
            svgPath.setAttribute(
                "d",
                "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
            );

            svgElement.appendChild(svgTitle);
            svgElement.appendChild(svgPath);
        }

        const synopsis = document.createElement("p");
        text = document.createTextNode(`${book.synopsis}`);
        synopsis.appendChild(text);

        const utlBox = document.createElement("div");
        utlBox.setAttribute("class", "utl-box");

        const markReadBtn = document.createElement("input");
        markReadBtn.setAttribute("type", "button");
        markReadBtn.setAttribute("value", "Mark as Read");

        const removeBtn = document.createElement("input");
        removeBtn.setAttribute("type", "button");
        removeBtn.setAttribute("value", "Remove");

        utlBox.appendChild(markReadBtn);
        utlBox.appendChild(removeBtn);

        card.appendChild(svgElement);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(category);
        card.appendChild(synopsis);
        card.appendChild(utlBox);

        main.appendChild(card);
    });
}

const popup = document.querySelector(".popup");
const form = document.getElementById("add-book-form");

function handleAddBookBtn() {
    popup.classList.remove("hidden");
}

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData.entries()));
    addBookToLibrary(
        formData.get("title"),
        formData.get("author"),
        formData.get("synopsis"),
        formData.get("category"),
        formData.get("isRead") === "true"
    );
    display();
    popup.classList.add("hidden");
}

Book.prototype.changeReadStatus = function (status) {
    this.isRead = status;
}

// TODO: Remove Button Handle
// TODO: Mark As Read Handle
function handleCardClick(e) {
    const card = e.target.closest(".card");

    if (!card) return;

    const bookId = card.dataset.bookId;

    if (e.target.matches("input[value='Remove']")) {
        const index = myLibrary.findIndex(book => book.id === bookId);

        if (index !== -1) {
            myLibrary.splice(index, 1);
            display();
        }
    }

    if (e.target.matches("input[value='Mark as Read']")) {
        const book = myLibrary.find(book => book.id === bookId);

        if (book) {
            book.changeReadStatus(true);
            display();
        }
    }
}

// MAIN
(function name() {
    addBookToLibrary("Harry Potter", "J.K Rowling", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, porro.", "Fantasy", true);
    addBookToLibrary("Ambatukam", "Peter", " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem repellendus inventore est quis! Quam, sint!", "Comedy", false);

    display();

    const newBook = document.querySelector("nav input");
    newBook.addEventListener("click", handleAddBookBtn);

    const closeFormBtn = document.getElementById("close");
    closeFormBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup.classList.add("hidden");
    });

    form.addEventListener("submit", handleSubmit);

    const main = document.querySelector("main");
    main.addEventListener("click", handleCardClick);
})()