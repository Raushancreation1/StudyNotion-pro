import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Add any initial state properties needed for courses
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    resetCourseState: (state) => {
      // Reset the course state to initial state
      return { ...initialState };
    },
    // Add other reducers as needed
  },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
