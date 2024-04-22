import { ACTIONS } from "./Actions";
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
    case ACTIONS.ADD_DOCTOR:
      return {
        ...state,
        doctors: action.payload,
      };
    case ACTIONS.ADD_USER:
      return {
        ...state,
        users: action.payload,
      };
    case ACTIONS.ADD_SERVICE:
      return {
        ...state,
        services: action.payload,
      };
    case ACTIONS.ADD_SUBSERVICE_DIRECTION:
      return {
        ...state,
        subservice_directions: action.payload,
      };
    case ACTIONS.ADD_SUBSERVICE:
      return {
        ...state,
        subservices: action.payload,
      };
    case ACTIONS.ADD_ARTICLE:
      return {
        ...state,
        articles: action.payload,
      };
    case ACTIONS.ADD_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };
    case ACTIONS.ADD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case ACTIONS.ADD_WIDGET:
      return {
        ...state,
        widgets: action.payload,
      };
    case ACTIONS.ADD_PRICE:
      return {
        ...state,
        prices: action.payload,
      };
    case ACTIONS.ADD_ACTION:
      return {
        ...state,
        prices: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
