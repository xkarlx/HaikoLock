const initState = {
  data: [],
};

const historyReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_HISTORY':
      return {...state, data: [...state.data, action.payload]};

    case 'SET_HISTORY':
      return {...state, data: [...action.payload]};

    case 'UPDATE_HISTORY':
      newData = state.data.map(element => {
        if (element._id == action.payload._id) {
          return action.payload;
        } else {
          return element;
        }
      });
      return {...state, data: newData};

    case 'DELETE_HISTORY':
      return {
        ...state,
        data: state.data.filter(element => element._id != action.payload._id),
      };

    case 'DELETE_COMPLETE_HISTORY':
      return {...state, data: []};
    default:
      return state;
  }
};

export default historyReducer;
