import React, { Component } from "react";
import "./input-field.scss";
import { DatePicker, Input, SelectPicker, Checkbox } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

const dataSelect = [
  { value: "Разработчик", label: "Разработчик" },
  { value: "Дизайнер", label: "Дизайнер" },
  { value: "Тестировщик", label: "Тестировщик" },
];

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: null,
    };
    this.pushE = this.props.push;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.fields) {
      return {
        fields: nextProps.fields,
      };
    }
    return null;
  }

  onChangeHandler(e, field) {
    this.setState((prevState) => {
      const fields = { ...prevState.fields };
      fields[field] = e;
      return {
        fields,
      };
    });
  }

  onRemoteHandler(checked) {
    this.setState({
      remote: checked,
    });
  }

  createNewEmployee() {
    const newEmployee = this.state;
    this.pushE(newEmployee);
  }

  formatDateToUser(date) {
    const day =
      date.getDate() / 10 >= 1 ? date.getDate() : `0${date.getDate()}`;
    const month =
      (date.getMonth() + 1) / 10 >= 1
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    const birth = `${day}.${month}.${date.getFullYear()}`;

    this.onChangeHandler(birth, "birth");
    const age = new Date().getFullYear() - date.getFullYear();
    this.onChangeHandler(age, "age");
  }

  formatDateToDatePicker(date) {
    const ddate = date.split(".");
    const day = ddate[0] / 10 >= 1 ? ddate[0] : ddate[0].split("")[1];
    const month = ddate[1] / 10 >= 1 ? ddate[1] - 1 : ddate[1].split("")[1] - 1;
    const year = ddate[2];
    const result = `${day} and ${month} and ${year}`;
    const newDate = new Date(year, month, day, 0, 0, 0, 0);
  }

  render() {
    const isEdit = this.props.fields;
    return (
      <div className="input-field">
        <div className="row">
          <div className="input-field__input col-lg-6">
            <label>Имя</label>
            <Input
              onChange={(e) => this.onChangeHandler(e, "firstName")}
              placeholder="Имя"
              value={this.state.fields?.firstName}
            ></Input>
          </div>
          <div className="input-field__input col-lg-6">
            <label>Фамилия</label>
            <Input
              onChange={(e) => this.onChangeHandler(e, "lastName")}
              placeholder="Фамилия"
              value={this.state.fields?.lastName}
            ></Input>
          </div>
          <div className="input-field__input col-lg-6">
            <label>Город</label>
            <Input
              onChange={(e) => this.onChangeHandler(e, "city")}
              placeholder="Город"
              value={this.state.fields?.city}
            ></Input>
          </div>
          <div className="input-field__input col-lg-6">
            <label>Улица</label>
            <Input
              onChange={(e) => this.onChangeHandler(e, "street")}
              placeholder="Улица"
              value={this.state.fields?.street}
            ></Input>
          </div>
          <div className="input-field__input col-lg-6">
            <label>Дата рождения</label>
            <DatePicker
              onChange={(date) => this.formatDateToUser(date)}
              className="customPicker"
              value={this.state.fields?.birth}
              format={"DD-MM-YYYY"}
            />
          </div>
          <div className="input-field__input col-lg-6">
            <label>Дом</label>
            <Input
              onChange={(e) => this.onChangeHandler(e, "home")}
              placeholder="Дом"
              value={this.state.fields?.home}
            ></Input>
          </div>
          <div className="input-field__input col-lg-6">
            <label>Должность</label>
            <SelectPicker
              data={dataSelect}
              style={{ width: 224 }}
              onChange={(e) => this.onChangeHandler(e, "vacancy")}
              value={this.state.fields?.vacancy}
            />
          </div>
          <div className="input-field__input col-lg-6">
            <label>Комната</label>
            <Input
              onChange={(e) => this.onChangeHandler(e, "room")}
              placeholder="Квартира"
              value={this.state.fields?.room}
            ></Input>
          </div>
          <div className="input-field__input col-lg-6">
            <Checkbox
              checked={this.state.fields?.remote}
              onChange={(value, checked) => this.onRemoteHandler(checked)}
            >
              Удаленная работа
            </Checkbox>
          </div>
          <div className="input-field__input col-lg-6">
            <label>URL Аватар</label>
            <Input
              onChange={(e) => this.onChangeHandler(e, "url")}
              placeholder="URL Аватарки"
              value={this.state.fields?.url}
            ></Input>
          </div>
        </div>

        {!isEdit ? (
          <button
            className="btn btn-success"
            onClick={() => {
              this.createNewEmployee();
              this.setState({
                fields: null,
              });
            }}
          >
            Добавить
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => {
              this.props.applyEditEmployee(this.state.fields);
              this.setState({
                fields: null,
              });
            }}
          >
            Применить изменения
          </button>
        )}
        <button
          className="btn btn-danger"
          onClick={() => {
            this.props.modalHandler();
            this.props.nullFields();
            this.setState({
              fields: null,
            });
          }}
        >
          Закрыть
        </button>
      </div>
    );
  }
}

export default InputField;
