import { fromJS } from 'immutable';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      courses: fromJS({}),
      notifications: fromJS({}),
      ui: fromJS({}),
    };

    expect(rootReducer(undefined, {})).toEqual(initialState);
  });
});
