import { Table } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import SelectIngredientes from './SelectIngredientes.jsx';


const getColumns = onChange => {
  return [{
    title: 'Ingredientes',
    dataIndex: 'INGREDIENTES',
    key: 'INGREDIENTES',
    render: (value) => {
      console.log(value);
      return <SelectIngredientes value={value || "..."} onChange={onChange} />
    }
  }, 
  {
    title: 'kilos',
    dataIndex: 'cantidad',
    key: 'cantidad'
  }];
}

const FormulaTable = ({ ingredientesAgregados, footer, onChange }) => {
  return (
    <Table 
      dataSource={ingredientesAgregados}
      columns={getColumns(onChange)}
      {...{footer}}
      pagination={false}
    />);
}

export default FormulaTable;