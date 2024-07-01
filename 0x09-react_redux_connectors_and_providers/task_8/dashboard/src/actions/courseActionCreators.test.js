import { fetchCourses, setCourses } from './courseActionCreators';
import fetchMock from 'jest-fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_COURSES } from './courseActionTypes';

const mockStore = configureMockStore([thunk]);

describe('tests for action creators', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch courses correctly and dispatch setCourses action', () => {
    const mockCourses = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
    ];

    fetchMock.mockResponse(JSON.stringify(mockCourses));

    const expectedActions = [
      { type: SET_COURSES, courses: mockCourses }
    ];

    const store = mockStore({});

    return store.dispatch(fetchCourses()).then(() => {
      // Return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
