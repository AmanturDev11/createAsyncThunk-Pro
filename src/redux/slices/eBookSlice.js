import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	books: [],
};

const bookSlice = createSlice({
	name: "eBook",
	initialState: initialState,
	reducers: {
		getBooks(state, action) {
			state.books = action.payload;
		},
		addBooks: (state, action) => {
			state.books.push(action.payload);
		},
		toggleFavoriteBook: (state, action) => {
			state.books.forEach((item) => {
				if (item.id === action.payload) {
					item.isFavorite = !item.isFavorite;
				}
			});
		},
		deleteBook: (state, action) => {
			state.books = state.books.filter((item) => item.id !== action.payload);
		},
	},
});

export const { addBooks, deleteBook, toggleFavoriteBook } = bookSlice.actions;
export const selectBooks = (state) => state.ebook.books;
export default bookSlice.reducer;

const getEbookThunk = createAsyncThunk(
  "eBook/getBooks",
  async () => {
    try {
      const response = await fetch(
				"https://ebook-862d6-default-rtdb.firebaseio.com/ebook.json"
			);
			const ebook = await response.json();
    }catch (error) {
      
    }
  });
