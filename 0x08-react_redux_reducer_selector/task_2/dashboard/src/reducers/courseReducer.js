import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

const initialState = [];

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      // Map over the data to add isSelected: false to each course
      return action.data.map(course => ({ ...course, isSelected: false }));

    case SELECT_COURSE:
      return state.map((course, index) =>
        index === action.index ? { ...course, isSelected: true } : course
      );

    case UNSELECT_COURSE:
      return state.map((course, index) =>
        index === action.index ? { ...course, isSelected: false } : course
      );

    default:
      return state;
  }
};

export default courseReducer;