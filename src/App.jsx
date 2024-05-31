import { useDispatch } from "react-redux";
import { addBooks, getEbookThunk } from "./redux/slices/eBookSlice";
import BookList from "./components/BookList/BookList";
import BookForm from "./components/BookForm/BookForm";
import Filter from "./components/Filter/Filter";
import Error from "./components/Error/Error";
import "./App.css";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();
	function onAddNewBook(newBook) {
		dispatch(addBooks(newBook));
	}

	useEffect(() => {
		dispatch(getEbookThunk());
	}, []);

	return (
		<div className="app">
			<header className="app-header">
				<h1>Book Library App</h1>
			</header>
			<main className="app-main">
				<div className="app-left-column">
					<BookForm onSubmit={onAddNewBook} />
				</div>
				<div className="app-right-column">
					<Filter />
					<BookList />
				</div>
			</main>
			<Error />
		</div>
	);
}

export default App;
