import reducer, {
  resetError,
  login,
  register,
  logout,
  fetchUser,
  updateUser,
  initialState
} from '../authSlice';

describe('authSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('resetError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some error'
    };
    const action = resetError();
    expect(reducer(stateWithError, action)).toEqual({
      ...initialState,
      error: null
    });
  });

  describe('login', () => {
    test('should handle pending', () => {
      const action = { type: login.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    test('fulfilled', () => {
      const user = { name: 'Admin', email: 'admin@mail.com' };
      const action = { type: login.fulfilled.type, payload: user };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        isLoggedIn: true,
        user
      });
    });

    test('rejected', () => {
      const errorMessage = 'Login failed';
      const action = { type: login.rejected.type, payload: errorMessage };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('register', () => {
    test('should handle pending', () => {
      const action = { type: register.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    test('fulfilled', () => {
      const user = { name: 'User', email: 'user@mail.com' };
      const action = { type: register.fulfilled.type, payload: user };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        isLoggedIn: true,
        user
      });
    });

    test('rejected', () => {
      const errorMessage = 'Registration failed';
      const action = { type: register.rejected.type, payload: errorMessage };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('logout', () => {
    test('fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        isLoggedIn: true,
        user: { name: 'Admin', email: 'admin@mail.com' }
      };
      const action = { type: logout.fulfilled.type };
      const state = reducer(stateWithUser, action);

      expect(state).toEqual(initialState);
    });

    test('rejected', () => {
      const errorMessage = 'Logout failed';
      const action = { type: logout.rejected.type, payload: errorMessage };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('fetchUser', () => {
    test('pending', () => {
      const action = { type: fetchUser.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    test('fulfilled', () => {
      const user = { name: 'Fetched User', email: 'fetched@mail.com' };
      const action = { type: fetchUser.fulfilled.type, payload: user };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        isLoggedIn: true,
        user
      });
    });

    test('rejected', () => {
      const errorMessage = 'Failed to fetch user';
      const action = { type: fetchUser.rejected.type, payload: errorMessage };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('updateUser', () => {
    test('pending', () => {
      const action = { type: updateUser.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    test('fulfilled', () => {
      const updatedUser = { name: 'Updated User', email: 'updated@mail.com' };
      const action = { type: updateUser.fulfilled.type, payload: updatedUser };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        user: updatedUser
      });
    });

    test('rejected', () => {
      const errorMessage = 'Update failed';
      const action = { type: updateUser.rejected.type, payload: errorMessage };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });
});
