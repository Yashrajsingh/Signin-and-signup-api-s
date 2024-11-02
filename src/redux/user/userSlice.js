import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to set loading to true at the start of sign-in
        signInStart: (state) => {
            state.loading = true;
            state.error = null; // Clear any previous error
        },
        // Action to update state upon successful sign-in
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        // Action to handle sign-in failure
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Export actions for use in components or thunks
export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;

// Export reducer to be included in the store
export default userSlice.reducer;
