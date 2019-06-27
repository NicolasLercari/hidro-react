import { Table, Select } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import MaterialTable from "material-table";
import ingredientesEstaticos from './ingredientesEstaticos.js';

const Option = Select.Option;

const getIngrediente = ingrediente => {
    const [result] = ingredientesEstaticos.filter(e => e.key === Number(ingrediente));
    return result;
};

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

const SelectIngredientes = props => (
    <Select
    placeholder="Ingrese un ingrediente..."
    style={{ width: 350, margin: '2px' }}
    showSearch
    value={props.value}
    onChange={(value) => {
      const { INGREDIENTES } = getIngrediente(value);
      props.onChange(INGREDIENTES);
    }}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
    {ingredientesEstaticos.map(item => (
        <Option key={item.key} >
        {item.INGREDIENTES}
        </Option>
    ))}
    </Select>
);

// export default SelectIngredientes;

/* const columns = [{
  title: 'Ingredientes',
  dataIndex: 'INGREDIENTES',
  key: 'INGREDIENTES',
}, 
{
  title: 'kilos',
  dataIndex: 'cantidad',
  key: 'cantidad'
}];

const FormulaTable = ({ ingredientesAgregados, footer }) => {
  return (
    <Table 
      dataSource={ingredientesAgregados}
      columns={columns}
      {...{footer}}
      pagination={false}
    />);
}

export default FormulaTable; */


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
          field: 'cantidad'
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
        options={{actionsColumnIndex: this.state.columns.length}}
        columns={this.state.columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  // const data = this.state.data;
                  // data.push(newData);
                  // this.setState({ data }, () => resolve());
                  onAdd(newData, () => resolve());

                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  onUpdate(newData, oldData, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  onDelete(oldData);
                }
                resolve()
              }, 1000)
            }),
        }}
      />
    )
  }
}

export default CustomEditComponent;