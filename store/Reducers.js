import {ACTIONS} from'./Actions';
const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.ADD_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case ACTIONS.ADD_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
      };
    case ACTIONS.ADD_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ACTIONS.ADD_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case ACTIONS.ADD_USEFUL:
      return {
        ...state,
        usefuls: action.payload,
      };
    case ACTIONS.ADD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;