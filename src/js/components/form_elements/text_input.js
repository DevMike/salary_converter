import React, { Component } from "react";

export default class TextInput extends Component {
  render() {
    const { paramName, paramID, label, isDefault } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={ paramID } className="col-sm-3 control-label text-right">{ label }</label>
        <div className="col-sm-2 d-inline-flex">
          <input
            type="text"
            id={ paramID }
            className="form-control"
            name={ paramName }
            required={ isDefault }
          />
        </div>
      </div>
    )
  }
}
