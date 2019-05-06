import { Modal, Button } from 'antd';
import React, { Component } from 'react';

import SelectIngredientes from './SelectIngredientes.jsx';

import InputCantidad from './InputCantidad.jsx';

class ModalAgregarIngrediente extends React.Component {
  
  constructor(props){
      super(props);
      this.state = { visible: false, ingredientes: [] };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    const { handleOkAgregarIngrediente } = this.props;
    const {ingrediente, cantidad} = this.state;
    handleOkAgregarIngrediente(ingrediente, cantidad)
    this.setState({
      visible: false,
      ingredientes: [],
      ingrediente: ''
    });
  }

  handleChangeInputCantidad = event => {
    this.setState({ cantidad: event.target.value })
  }

  handleChangeIngrediente = ingrediente => {
    const { ingredientes } = this.state;
    ingredientes.push(ingrediente);
    this.setState({ ingredientes, ingrediente })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      cantidad: ''
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Agregar Ingrediente...
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <SelectIngredientes onChange={this.handleChangeIngrediente} />
          <InputCantidad onChange={this.handleChangeInputCantidad} />
        </Modal>
      </div>
    );
  }
}

export default ModalAgregarIngrediente;