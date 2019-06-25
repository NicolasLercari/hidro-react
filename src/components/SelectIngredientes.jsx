import { Select } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

import ingredientesEstaticos from './ingredientesEstaticos';

const Option = Select.Option;
// const onChange = value => {
//     const { onChange } = this.props;
//     console.log(value);
//     const [ingrediente] = (ingredientesEstaticos.filter(e => e.key === Number(value)));
//     onChange
// };

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
//   <Select
//     showSearch
//     style={{ width: 200 }}
//     placeholder="Select a person"
//     optionFilterProp="children"
//     onChange={onChange}
//     onFocus={onFocus}
//     onBlur={onBlur}
//     onSearch={onSearch}
//     filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//   >
//     <Option value="jack">Jack</Option>
//     <Option value="lucy">Lucy</Option>
//     <Option value="tom">Tom</Option>
//   </Select>
    <Select
    // defaultValue={ item === "" ? undefined : item.INGREDIENTES }
    placeholder="Ingrese un ingrediente..."
    style={{ width: 350, margin: '2px' }}
    showSearch
    value={props.value}
    onChange={(value) => {
      const ingrediente = getIngrediente(value);
      return props.onChange(ingrediente)
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

export default SelectIngredientes;
