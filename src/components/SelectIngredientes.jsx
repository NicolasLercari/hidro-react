import { Select } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

import ingredientesEstaticos from './ingredientesEstaticos';
import { getNombreIngredienteByKey } from './ingredientesHelper';

const { Option } = Select;

const SelectIngredientes = ({ value, onChange }) => (
  <Select
    placeholder="Ingrese un ingrediente..."
    style={{ width: 350, margin: '2px' }}
    showSearch
    value={value}
    onChange={v => {
      const { INGREDIENTES } = getNombreIngredienteByKey(v);
      onChange(INGREDIENTES);
    }}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {ingredientesEstaticos.map(item => (
      <Option key={item.key}>{item.INGREDIENTES}</Option>
    ))}
  </Select>
);

export default SelectIngredientes;
