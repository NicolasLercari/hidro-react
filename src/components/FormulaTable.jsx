import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import SelectIngredientes from './SelectIngredientes.jsx';
//import "./styles.css";

class ColorEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  getValue() {
    return { labelColour: this.state.value };
  }

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
  }

  handleChangeComplete = value => {
    console.log(value);
    this.setState({ value: value }, () => this.props.onCommit());
  };
  render() {
    return (
      <SelectIngredientes
        value={this.state.value}
        onChange={this.props.onChange}
      />
    );
  }
}



const rows = [
  { id: 0, title: "Task 1", issueType: "Bug", labelColour: "" },
  { id: 1, title: "Task 2", issueType: "Story", labelColour: "" },
  { id: 2, title: "Task 3", issueType: "Epic", labelColour: "" }
];

const ColorEditorWrapp = onChange => <ColorEditor onChange={onChange} />;
class Example extends React.Component {
  constructor(props){
    super(props);
    this.state = { rows };
    this.columns = [
      { key: "id", name: "ID" },
      { key: "title", name: "Title" },
      { 
        key: "labelColour",
        name: "Label Colour",
        editor: ColorEditorWrapp(props.onChange)
      }
    ];
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={3}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
      </div>
    );
  }
}

export default Example;
