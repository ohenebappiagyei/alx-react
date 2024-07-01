import { createSelector } from 'reselect';
import { List } from 'immutable';

const getAllCourses = state => state.get('courses', List()).valueSeq().toList();

export default getAllCourses;