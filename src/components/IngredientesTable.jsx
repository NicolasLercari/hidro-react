import {Table, AutoComplete, Input} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import ingredientesEstaticos from './ingredientesEstaticos';

class IngredientesTable extends React.Component { 
  constructor(props){
    super(props);
    this.state = { filter: '' };
  }

  columns = [{
    title: 'Ingrediente',
    dataIndex: 'INGREDIENTES',
    key: 'INGREDIENTES',
  },{
    title: 'kilos',
    dataIndex: 'kilos',
    key: 'kilos',
    render: (text, record) => (
      <Input onPressEnter={event => this.handlePressEnter(event, text)} placeholder='kilos...'/>
    ),
  }
  ];


  handlePressEnter = (event, text) => {
    console.log(event.target.value);
    console.log(text);
  };  

  handleInputChange = event => {
    this.setState({
      filter: event.target.value
    });
  
  };
  
  getIngredientesFiltrado = () => {
    const { filter } = this.state;
    if(filter.length > 1) {
      return ingredientesEstaticos.filter(
        item =>
          item.INGREDIENTES.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return ingredientesEstaticos;
  };

  handleSelect = event => {
    console.log(event);
    console.log(event.target.value);
  }

  render() {
    const { filter } = this.state;
    return (
      <div>
        <Input value={filter} onChange={this.handleInputChange}  />
        <Table dataSource={this.getIngredientesFiltrado()} columns={this.columns} onSelect={this.handleSelect} />
      </div>
    );
  }
}

export default IngredientesTable;