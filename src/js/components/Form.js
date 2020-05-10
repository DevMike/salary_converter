import React, { Component } from "react";
import { connect } from "react-redux";
import { calcSalary } from "../actions/index";
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import $ from 'jquery';
import TextInput from "./form_elements/text_input";

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleForm: 'office'
    };
    this.salaryTypeChangeHandler = this.salaryTypeChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  salaryTypeChangeHandler(event) {
    this.setState({ visibleForm: event });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = $(event.target);
    this.props.calcSalary(form.serialize())
  };

  render() {
    const { visibleForm } = this.state;
    const { calculatedSalary } = this.props;

    const salaryInput = ()=>{
      if(visibleForm === 'remote') {
        return <TextInput
                 paramName="remote_salary"
                 paramID="remote_salary"
                 label="Current Remote Salary (Monthly, $)"
                 isRquired="true"
                />
      } else {
        return <TextInput
                 paramName="office_salary"
                 paramID="office_salary"
                 label="Current Office Salary (Monthly, $)"
                 isRquired="true"
               />
      }
    };

    return (
      <div className="container mt-20">
        <div className="form-group">
          <label htmlFor="officeSalaryType" className="col-sm-10 mt-5">
            Choose Salary Type You're Going to Compare
          </label>
          <div className="col-sm-5">
            <RadioGroup name='officeSalaryType' value={ visibleForm } onChange={ this.salaryTypeChangeHandler }>
              <RadioButton label="Office" value='office' className="col-sm-4 control-label"/>
              <RadioButton label="Remote" value='remote' className="col-sm-4 control-label"/>
            </RadioGroup>
          </div>
        </div>

        <form className="form-horizontal" onSubmit={ this.handleSubmit }>
          { salaryInput() }
          <TextInput
            paramName="vat_perc"
            paramID="vat_perc"
            label="VAT (Monthly, %)"
            isRquired="true"
          />
          <TextInput
            paramName="other_taxes"
            paramID="other_taxes"
            label="Other Taxes (Monthly, $)"
            isRquired="true"
          />
          <TextInput
            paramName="paid_expenses"
            paramID="paid_expenses"
            label="Estimated Office Expenses (Monthly, $)"
            isRquired="true"
          />
          <TextInput
            paramName="vacation_days"
            paramID="vacation_days"
            label="Vacation Days (Yearly)"
            isRquired="true"
          />
          <div className="col-sm-12">
            <button className="btn btn-primary" type="submit">Calculate respective remote salary</button>
          </div>
        </form>
        { calculatedSalary &&
          <div className="mt-3 ml-3">
            <h4>Calculated Salary is { calculatedSalary }$</h4>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  calculatedSalary: state.calculatedSalary
});

const mapDispatchToProps = (dispatch) => ({
  calcSalary: (payload) => dispatch(calcSalary(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
