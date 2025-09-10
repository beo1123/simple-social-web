'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    searchQuery: string;
    sortBy: 'newest' | 'oldest';
    filterByUser: string;
}

const initialState: SearchState = {
    searchQuery: '',
    sortBy: 'newest',
    filterByUser: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setSortBy(state, action: PayloadAction<'newest' | 'oldest'>) {
            state.sortBy = action.payload;
        },
        setFilterByUser(state, action: PayloadAction<string>) {
            state.filterByUser = action.payload;
        },
        resetSearch(state) {
            state.searchQuery = '';
            state.sortBy = 'newest';
            state.filterByUser = '';
        },
    },
});

export const { setSearchQuery, setSortBy, setFilterByUser, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;