import React from "react";
import "./search-panel.scss";

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
  }
  render() {
    return (
      <div className="search-container">
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            value={this.state.query}
            id="search-input"
            placeholder="Поиск сотрудника"
            onChange={(e) => {
              this.setState({
                query: e.target.value
              })
              this.props.search(this.state.query)
            }}
          />
          <i className="fa fa-search search-icon" />
        </label>
      </div>
    );
  }
}

export default SearchPanel;
