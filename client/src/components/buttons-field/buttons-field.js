import React from "react";
import "./buttons-field.scss";

function ButtonsField({ modalHandler }) {
  return (
    <div className="buttons-field">
      <button
        className="btn btn-primary btn-btn-field"
        onClick={() => modalHandler()}
      >
        Добавить
      </button>
    </div>
  );
}

export default ButtonsField;
