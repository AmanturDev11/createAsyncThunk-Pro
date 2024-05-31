import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	books: [],
	isLoading: false,
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
	extraReducers: (builder) => {
		builder.addCase(getEbookThunk.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(getEbookThunk.fulfilled, (state, action) => {
			state.books = action.payload;
			state.isLoading = false;
		});
		builder.addCase(getEbookThunk.rejected, (state, action) => {});
	},
});

export const { addBooks, deleteBook, toggleFavoriteBook, getBooks } =
	bookSlice.actions;
export const selectBooks = (state) => state.ebook.books;
export default bookSlice.reducer;

export const getEbookThunk = createAsyncThunk(
	"eBook/getBooks",
	async (_, thunkApi) => {
		try {
			const response = await fetch(
				"https://ebook-862d6-default-rtdb.firebaseio.com/ebook.json"
			);
			const ebook = await response.json();
			const transormedBooks = Object.entries(ebook).map(
				([key, title, author]) => {
					return { title, author, id: key };
				}
			);
			return transormedBooks;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);
