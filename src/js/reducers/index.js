import { CALC_SALARY, CALC_SALARY_SUCCESS } from "../constants/action-types";

const initialState = {
  calculatedSalary: ''
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CALC_SALARY:
      return {};
    case CALC_SALARY_SUCCESS:
      return Object.assign({}, state, { calculatedSalary: action.calculatedSalary.ExpectedSalary });
    default:
      return state;
  }
}

export default rootReducer;
