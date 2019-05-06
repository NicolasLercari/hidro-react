import React, { Component } from 'react';

import FormulaTable from './FormulaTable.jsx';
import IngredientesTable from './IngredientesTable.jsx';
import { Button } from 'antd';
import ModalAgregarIngrediente from './ModalAgregarIngrediente.jsx';
import 'antd/dist/antd.css';
import SelectIngredientes from './SelectIngredientes.jsx';
import InputCantidad from './InputCantidad.jsx';

class Formula extends Component {
  
  state = { ingredientesAgregados: [] };

  handleOkAgregarIngrediente = (ingrediente, cantidad) => {
    if(!ingrediente || !cantidad) return null;
    const { ingredientesAgregados } = this.state;
    if(!ingredientesAgregados.every(e => e.INGREDIENTES !== ingrediente.INGREDIENTES)) {
      return null;
    }
    ingredientesAgregados.push(Object.assign(ingrediente, {cantidad}));
    this.setState(ingredientesAgregados);
  };

  handleChangeInputCantidad = event => {
    this.setState({ cantidad: event.target.value })
  }

  handleChangeIngrediente = ingrediente => {
    // const { ingredientes } = this.state;
    // ingredientes.push(ingrediente);
    this.setState({ ingrediente })
  }


  render = () => {
    const {ingredientesAgregados} = this.state;
    const {ingrediente, cantidad} = this.state;
    return (
        <div className="FormulaContainer" >
            {/* <IngredientesTable style={{width: '40%'}} /> */}
            {/* <ModalAgregarIngrediente handleOkAgregarIngrediente={this.handleOkAgregarIngrediente}/> */}
            <div>
              <SelectIngredientes onChange={this.handleChangeIngrediente} />
              <InputCantidad onChange={this.handleChangeInputCantidad} />
              <Button type="primary" onClick={() => this.handleOkAgregarIngrediente(ingrediente, cantidad)}> agregar ingrediente </Button>
            </div>
            <FormulaTable style={{width: '40%'}} ingredientesAgregados={ingredientesAgregados} />
        </div>
    );
  };
}

export default Formula;