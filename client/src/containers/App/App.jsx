import React, { Component } from "react";
import SearchPanel from "../../components/search-panel";
import ButtonsField from "../../components/buttons-field";
import "./app.scss";
import ModalWindow from "../modal-window";
import EmployesTable from "../../components/employees-table";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false,
      employees: [],
      fields: null,
      searchResults: null
    };
  }

  componentDidMount() {
    this.updateDB();
  }

  viewSearchResults(query) {
    if (query === "") {
      this.setState({
        searchResults: null
      })
    }
    const allData = this.state.employees
    console.log(allData, 'allData')
    const sortedData = allData.filter((item) => 
      item.firstName.indexOf(query) !== -1
    )
    if (sortedData.length === 0) {
      this.setState({
        searchResults: null
      })
    }
    console.log(sortedData, 'sortedData')
    this.setState({
      searchResults: sortedData
    })
  }

  updateDB() {
    axios.get("http://localhost:3333/employees").then((employees) => {
      const employeesArray = employees.data;
      this.setState({
        employees: employeesArray,
      });
    });
  }

  // Открытие-закрытие модального окна
  modalHandler() {
    this.setState({
      isModalActive: this.state.isModalActive ? false : true,
    });
  }

  // Обнуление поля работника, рассматриваемого в данный момент
  nullFields() {
    this.setState({
      fields: null,
    });
  }

  // Добавление нового работника в массив данных
  async updateEmployees(employee) {
    axios
      .post("http://localhost:3333/employees", {
        data: {
          ...this.formatEmployee(employee),
        },
      })
      .then((res) => {
        this.setState({
          employees: [...this.state.employees, res.data],
        });
      });
  }

  deleteEmployee(id) {
    axios
      .delete("http://localhost:3333/employees", {
        data: {
          id,
        },
      })
      .then((res) => {
        const newEmployees = this.state.employees.filter(
          (e) => e._id !== res.data._id
        );
        this.setState({
          employees: newEmployees,
        });
      });
  }

  editEmployee(id) {
    // Открываю модальное окно
    this.modalHandler();
    const { employees } = this.state;
    // Нахожу конкретного работника
    const edit = employees.find((emp) => emp._id === id);
    // Создаю объект этого работника
    const fields = {
      firstName: edit.firstName,
      lastName: edit.lastName,
      id: edit._id,
      age: edit.age,
      address: edit.address,
      birth: edit.birth,
      url: edit.url,
      remote: edit.remote,
      vacancy: edit.vacancy,
      city: edit.city,
      street: edit.street,
      home: edit.home,
      room: edit.room,
    };
    // Передаю этот объект в InputFields для редактирования
    this.setState({
      fields: fields,
    });
  }

  // Фиксирую изменения при редактировании карточки
  applyEditEmployee(employee) {
    axios
      .post("http://localhost:3333/employees/edit", {
        data: {
          ...employee,
        },
      })
      .then((res) => {
        const newEmployees = this.state.employees.filter(
          (emp) => emp._id !== res.data._id
        );
        this.setState({
          employees: [...newEmployees, res.data],
        });
      });

    this.modalHandler();
  }

  formatEmployee(employee) {
    const { fields } = employee;
    const address = `Город ${fields.city} ул. ${fields.street} д. ${fields.home} кв. ${fields.room}`;
    return {
      age: fields.age,
      firstName: fields.firstName,
      lastName: fields.lastName,
      birth: fields.birth,
      vacancy: fields.vacancy,
      remote: true,
      city: fields.city,
      home: fields.home,
      street: fields.street,
      room: fields.room,
      address: address,
      url: fields.url,
    };
  }

  render() {
    const { employees } = this.state;
    // const defaultValues = isDefault ? "" : values
    return (
      <div>
        <div className="app container">
          {/* <SearchPanel search={this.viewSearchResults.bind(this)}/> */}
          <ButtonsField
            modalHandler={this.modalHandler.bind(this)}
          ></ButtonsField>
          <EmployesTable
            data={this.state.searchResults ? this.state.searchResults : employees}
            delete={this.deleteEmployee.bind(this)}
            edit={this.editEmployee.bind(this)}
          />
        </div>
        <ModalWindow
          updateEmployees={this.updateEmployees.bind(this)}
          isVisible={this.state.isModalActive}
          modalHandler={this.modalHandler.bind(this)}
          //Данные о текущем работнике
          defaultValues={this.state.fields}
          nullFields={this.nullFields.bind(this)}
          applyEditEmployee={this.applyEditEmployee.bind(this)}
        />
      </div>
    );
  }
}

export default App;
