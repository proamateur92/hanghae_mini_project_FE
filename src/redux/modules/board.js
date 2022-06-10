// widgets.js

// Actions
const LOAD = 'board/LOAD';
const CREATE = 'board/CREATE';
const UPDATE = 'board/UPDATE';
const REMOVE = 'board/REMOVE';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default:
      return state;
  }
}

// Action Creators
export function loadBoard() {
  return { type: LOAD };
}

export function createBoard(board) {
  return { type: CREATE, board };
}

export function updateBoard(board) {
  return { type: UPDATE, board };
}

export function removeBoard(board) {
  return { type: REMOVE, board };
}
