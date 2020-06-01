import React, { Component } from "react";
import { Cell, Column, Table, HeaderCell } from "rsuite-table";
import { Checkbox } from "rsuite";
import "rsuite-table/dist/css/rsuite-table.css";
import "./employes-table.scss";
import ImageCell from "../image-cell";

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: "46px" }}>
      <Checkbox value={rowData[dataKey]} inline onChange={onChange} />
    </div>
  </Cell>
);

class EmployesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortColumn: "id",
    };
    this.handleSortColumn = this.handleSortColumn.bind(this);
  }

  getData() {
    const { sortColumn, sortType } = this.state;
    const { data } = this.props;

    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  }


  handleSortColumn(sortColumn, sortType) {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      console.log(sortColumn);
      this.setState({
        sortColumn,
        sortType,
        loading: false,
      });
    }, 500);
  }
  render() {
    return (
      <div>
        <Table
          height={800}
          data={this.getData()}
          sortColumn={this.state.sortColumn}
          sortType={this.state.sortType}
          onSortColumn={this.handleSortColumn}
          loading={this.state.loading}
          onRowClick={(data) => {
            
          }}
          rowHeight={100}
        >
          <Column verticalAlign="middle" align="center" sortable resizable>
            <HeaderCell>Превью</HeaderCell>
            <ImageCell dataKey="url" />
          </Column>

          <Column
            verticalAlign="middle"
            width={130}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>Имя</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column
            verticalAlign="middle"
            width={130}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>Фамилия</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column
            verticalAlign="middle"
            width={200}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>Дата рождения</HeaderCell>
            <Cell dataKey="birth" />
          </Column>

          <Column
            verticalAlign="middle"
            width={80}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>Возраст</HeaderCell>
            <Cell dataKey="age" />
          </Column>

          <Column
            verticalAlign="middle"
            width={200}
            sortable
            resizable
            align="center"
          >
            <HeaderCell>Должность</HeaderCell>
            <Cell dataKey="vacancy" />
          </Column>

          <Column verticalAlign="middle" width={200} resizable align="center">
            <HeaderCell>Удаленная работа</HeaderCell>
            <CheckCell dataKey="remote" onChange={this.handleCheck} />
          </Column>

          <Column verticalAlign="middle" width={200} resizable align="center">
            <HeaderCell>Адрес</HeaderCell>
            <Cell dataKey="address" />
          </Column>

          <Column verticalAlign="middle" resizable align="center" width={200}>
            <HeaderCell>Действия</HeaderCell>

            <Cell>
              {(rowData) => {
                return (
                  <span>
                    <a
                      className="btn-cell"
                      onClick={() => this.props.edit(rowData._id)}
                    >
                      {" "}
                      Редактировать{" "}
                    </a>{" "}
                    |{" "}
                    <a
                      className="btn-cell"
                      onClick={() => this.props.delete(rowData._id)}
                    >
                      {" "}
                      Удалить{" "}
                    </a>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  }
}

export default EmployesTable;
