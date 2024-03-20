const http = require("http");
const url = require("url");

const books = [
	{ id: 1, name: "arrow of God", author: "Chinua Achebe" },
	{ id: 2, name: "things fall apart", author: "Chinua Achebe" },
	{ id: 3, name: " Trials of brother Jero", author: "Wole Soyinka" },
	{ id: 4, name: "The man died", author: "Wole Soyinka" },
	{ id: 5, name: "Forgive me Maryam", author: "Mohamed Turkur Garba" },
	{ id: 6, name: "Murder!", author: "Mohamed Turkur Garba" },
];

const behaviour = (req, res) => {
	const parsedurl = url.parse(req.url, true);
	const path = parsedurl.pathname;
	//GET /books
	if (req.method === "GET" && path === "/books") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.write(JSON.stringify(books));
		res.end();
	}

	//PUT /books
	if (req.method === "PUT" && path === "/books") {
		//example http://localhost:8900/books?id=1&name=no%20gree%20for%20nodejs&author=Ezeanaka%20Nathaniel
		const updatedBook = {
			id: parseInt(parsedurl.query.id),
			name: parsedurl.query.name,
			author: parsedurl.query.author,
		};
		books.forEach((book, index) => {
			if (updatedBook.id === book.id) {
				books[index] = updatedBook;

				res.write(
					`${
						book.name
					} have been successfully updated. These are the books remaining ${JSON.stringify(
						books
					)}`
				);
				console.log(`${book.name} have been successfully updated`);

				res.end();
			}
		});
	}

	//DELETE /books
	if (req.method === "DELETE" && path === "/books") {
		//example http://localhost:8900/books?id=1
		const id = parseInt(parsedurl.query.id);
		console.log(id, typeof id);
		books.forEach((book, index) => {
			if (id === book.id) {
				books.splice(index, 1);

				res.write(
					`${
						book.name
					} have been successfully removed. These are the books remaining ${JSON.stringify(
						books
					)}`
				);
				console.log(`${book.name} have been successfully removed`);

				res.end();
			}
		});
	}
	// GET/books/author
	if (req.method === "GET" && path === "/books/author/") {
		//example http://localhost:8900/books/author/?author=Chinua%20Achebe
		const author = parsedurl.query.author;
		console.log(author);
		const authoredbooks = books.filter((book) => book.author === author);
		res.writeHead(200, { "Content-type": "application/json" });
		res.write(JSON.stringify(authoredbooks));
		res.end();
	}
	//POST books/authors
	if (req.method === "POST" && path === "/books/author") {
		//example post request post http://localhost:8900/books?name=purple&author=chimamnda
		const newbook = {
			id: books.length + 1,
			name: parsedurl.query.name,
			author: parsedurl.query.author,
		};

		books.push(newbook);
		res.write(JSON.stringify(books));
		res.end();
	}

	//PUT /books/author

	if (req.method === "PUT" && path === "/books/author") {
		//example http://localhost:8900/books/author?author=Chinua%20Achebe&updatedAuthor=Ezeanaka%20Nathaniel
		const author = parsedurl.query.author;
		const updatedAuthor = parsedurl.query.updatedAuthor;
		console.log(author, updatedAuthor);
		books.forEach((book) => {
			if (author === book.author) {
				book.author = updatedAuthor;
			}
		});

		res.write(`succesfully updated author ${JSON.stringify(books)}`);

		res.end();
	}
};

const server = http.createServer(behaviour);

server.listen(8900, null, null, () => {
	console.log("sever is on on port 8900");
});