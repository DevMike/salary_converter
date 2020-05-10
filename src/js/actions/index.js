import api from "../utils/api";
import { CALC_SALARY, CALC_SALARY_SUCCESS } from "../constants/action-types"

export const calcSalarySuccess = (json) => ({
  type: CALC_SALARY_SUCCESS,
  calculatedSalary: json.data
});

export const calcSalary = (payload) => (dispatch, action) => {
  dispatch({ type: CALC_SALARY, payload });
  api.get(`/calculate_salary?${payload}`, {method: 'GET'})
    .then(json => {
      dispatch(calcSalarySuccess(json))
    });
};
