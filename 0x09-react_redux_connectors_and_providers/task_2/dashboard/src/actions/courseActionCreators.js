import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

// Action creators
export const fetchCourseSuccess = (data) => ({
  type: FETCH_COURSE_SUCCESS,
  data
});

export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index
});

export const unselectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index
});


export const boundSelectCourse = (index) => (dispatch) => {
  dispatch(selectCourse(index));
};

export const boundUnselectCourse = (index) => (dispatch) => {
  dispatch(unselectCourse(index));
};
