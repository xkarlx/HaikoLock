const initState = {
  data: [],
  selected: undefined
};

const historyReducer = (state = initState, action) => {

  console.log(action.type,action.payload)
  switch (action.type) {
    case 'ADD_HISTORY':
      var newData =  [...state.data, action.payload["history"]]
      newData.sort(function (history1, history2) {

        // Sort by favorite         
        if (history1.readDate > history2.readDate) return -1;
        if (history1.readDate < history2.readDate) return 1;
      })
      return {...state, data:newData ,selected:action.payload["selected"]};

    case 'SET_HISTORY':
      var newData =  [...action.payload["history"]]
      newData.sort(function (history1, history2) {

        // Sort by favorite         
        if (history1.readDate > history2.readDate) return -1;
        if (history1.readDate < history2.readDate) return 1;
      })
      return {...state, data: newData,selected:action.payload["selected"]};

    case 'UPDATE_HISTORY':
      newData = state.data.map(element => {
        if (element._id == action.payload["history"]._id) {
          return action.payload["history"];
        } else {
          return element;
        }
      });
      return {...state, data: newData,selected:action.payload["selected"]};

    case 'DELETE_HISTORY':
      return {
        ...state,
        data: state.data.filter(element => element._id != action.payload["history"]._id),selected:action.payload["selected"]
      };

    case 'DELETE_COMPLETE_HISTORY':
      return {...state, data: [],selected:undefined};
    default:
      return state;
  }
};

export default historyReducer;
