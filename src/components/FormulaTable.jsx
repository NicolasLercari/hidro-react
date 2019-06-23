import { Table } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

const columns = [{
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

export default FormulaTable;