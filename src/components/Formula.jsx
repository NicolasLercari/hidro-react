import React, { Component } from 'react';

import FormulaTable from './FormulaTable.jsx';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import SelectIngredientes from './SelectIngredientes.jsx';
import InputCantidad from './InputCantidad.jsx';
import './Formula.scss';

const buttonStyles = {margin: '2px', backgroundColor: '#3f51b5', borderColor: '#3f51b5'};

class Formula extends Component {
  constructor(props) {
    super(props);
    this.state = { ingredientesAgregados: [] };
  }

  handleOkAgregarIngrediente = (ingrediente, cantidad) => {
    if(!ingrediente || !cantidad) return null;
    const { ingredientesAgregados } = this.state;
    if(!ingredientesAgregados.every(e => e.INGREDIENTES !== ingrediente.INGREDIENTES)) {
      return null;
    }
    ingredientesAgregados.push(Object.assign(ingrediente, {cantidad}));
    this.setState({
      ingredientesAgregados,
      ingrediente: undefined,
      cantidad: undefined
    });
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
            <div className="InputIngredientes" >
              <SelectIngredientes value={ingrediente && ingrediente.INGREDIENTES} onChange={this.handleChangeIngrediente} />
              <InputCantidad value={cantidad} onChange={this.handleChangeInputCantidad} />
              <Button style={buttonStyles} type="primary" onClick={() => this.handleOkAgregarIngrediente(ingrediente, cantidad)}> agregar ingrediente </Button>
            </div>
            <FormulaTable style={{width: '40%'}} ingredientesAgregados={ingredientesAgregados} />
        </div>
    );
  };
}

export default Formula;