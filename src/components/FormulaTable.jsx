import React from 'react';
import 'antd/dist/antd.css';
import MaterialTable from "material-table";
import SelectIngredientes from './SelectIngredientes.jsx';
class CustomEditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {  
          title: 'Ingredientes',
          field: 'INGREDIENTES',
          editComponent: props => { 
            console.log(props.value);
            return (
            <SelectIngredientes
              value={props.value}
              onChange={props.onChange}
            />)}
        }, 
        {
          title: 'kilos',
          field: 'cantidad',
          type: 'numeric',
          required: true
       }
      ],
      data: []
    }
  }

  onChange = value => {
    console.log(value);  }

  render() {
    const { data, onUpdate, onAdd, onDelete } = this.props;
    return (
      <MaterialTable
        title="Receta"
        options={{
          actionsColumnIndex: this.state.columns.length,
          pageSizeOptions: 20
        }}
        columns={this.state.columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                onAdd(newData, () => resolve());
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                onUpdate(newData, oldData, () => resolve());
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                onDelete(oldData, () => resolve());
                resolve()
              }, 1000)
            }),
        }}
      />
    )
  }
}

export default CustomEditComponent;