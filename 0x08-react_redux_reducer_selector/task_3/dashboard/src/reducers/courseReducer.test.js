import courseReducer from "./courseReducer";
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

describe("courseReducer", () => {
  it("should return the initial state", () => {
    expect(courseReducer(undefined, {})).toEqual([]);
  });

  it("should handle FETCH_COURSE_SUCCESS", () => {
    const coursesData = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 }
    ];

    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: coursesData
    };

    expect(courseReducer([], action)).toEqual([
      { id: 1, name: "ES6", credit: 60, isSelected: false },
      { id: 2, name: "Webpack", credit: 20, isSelected: false },
      { id: 3, name: "React", credit: 40, isSelected: false }
    ]);
  });

  it("should handle SELECT_COURSE", () => {
    const initialState = [
      { id: 1, name: "ES6", credit: 60, isSelected: false },
      { id: 2, name: "Webpack", credit: 20, isSelected: false },
      { id: 3, name: "React", credit: 40, isSelected: false }
    ];

    const action = {
      type: SELECT_COURSE,
      index: 1
    };

    expect(courseReducer(initialState, action)).toEqual([
      { id: 1, name: "ES6", credit: 60, isSelected: false },
      { id: 2, name: "Webpack", credit: 20, isSelected: true },
      { id: 3, name: "React", credit: 40, isSelected: false }
    ]);
  });

  it("should handle UNSELECT_COURSE", () => {
    const initialState = [
      { id: 1, name: "ES6", credit: 60, isSelected: false },
      { id: 2, name: "Webpack", credit: 20, isSelected: true },
      { id: 3, name: "React", credit: 40, isSelected: false }
    ];

    const action = {
      type: UNSELECT_COURSE,
      index: 1
    };

    expect(courseReducer(initialState, action)).toEqual([
      { id: 1, name: "ES6", credit: 60, isSelected: false },
      { id: 2, name: "Webpack", credit: 20, isSelected: false },
      { id: 3, name: "React", credit: 40, isSelected: false }
    ]);
  });
});