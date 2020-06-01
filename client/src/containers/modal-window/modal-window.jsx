import React, { Component } from "react";
import "./modal-window.scss";
import Avatar from "../../components/avatar";
import InputField from "../../components/input-field";
import Row from "../../hoc/row";

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  pushEmployees(employee) {
    // Добавить работника
    this.setState({
      employees: [...this.state.employees, employee],
    });
    // Прокинуть в App массив работников
    this.props.updateEmployees(employee);
    // Закрыть окно
    this.props.modalHandler();
  }

  render() {
    const { isVisible, modalHandler } = this.props;
    const visible = isVisible ? "" : "d-none";

    const defaultValues = this.props.defaultValues;
    const avatar = defaultValues ? defaultValues.url : null;
    return (
      <div className={`modal-window ${visible}`}>
        <div className="container">
          <div className="modal-window__content">
            <Row
              left={<Avatar url={avatar} />}
              right={
                <InputField
                  modalHandler={modalHandler}
                  fields={this.props.defaultValues}
                  push={this.pushEmployees.bind(this)}
                  nullFields={this.props.nullFields}
                  applyEditEmployee={this.props.applyEditEmployee}
                />
              }
            />
            <div className="modal-window__buttons"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWindow;
