import { List } from 'immutable';
import getAllCourses from './courseSelector';

describe('getAllCourses selector', () => {
  it('should return an empty list if no courses are present', () => {
    const state = {
      courses: List(),
    };

    const result = getAllCourses(state);
    expect(result).toEqual([]);
  });

  it('should return all courses as a list', () => {
    const state = {
      courses: List([
        { id: 1, name: 'Course 1' },
        { id: 2, name: 'Course 2' },
      ]),
    };

    const result = getAllCourses(state);
    expect(result).toEqual([
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
    ]);
  });

  it('should return courses in the correct order', () => {
    const state = {
      courses: List([
        { id: 2, name: 'Course 2' },
        { id: 1, name: 'Course 1' },
      ]),
    };

    const result = getAllCourses(state);
    expect(result).toEqual([
      { id: 2, name: 'Course 2' },
      { id: 1, name: 'Course 1' },
    ]);
  });

  it('should handle an undefined state', () => {
    const state = undefined;
    const result = getAllCourses(state);
    expect(result).toEqual([]);
  });
});
