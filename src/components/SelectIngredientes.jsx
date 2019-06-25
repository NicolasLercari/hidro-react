/* eslint-disable no-console */
import { Select } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

import ingredientesEstaticos from './ingredientesEstaticos';

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
    onChange={(value) => props.onChange(getIngrediente(value).INGREDIENTES)}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
    {ingredientesEstaticos.map(item => (
        <Option key={item.key} >
        {item.INGREDIENTES}
        </Option>
    ))}
    </Select>
);

export default SelectIngredientes;
