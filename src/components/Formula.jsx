import React, { Component } from "react";
import './Formula.scss';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Balance from './Balance'
import SelectIngredientes from './SelectIngredientes'
import InputCantidad from './InputCantidad.jsx';
import Button from '@material-ui/core/Button';
import FormulaTable from './FormulaTable.jsx';
import { getIngredienteObjectByName } from './ingredientesHelper.js';

const buttonStyles = {margin: '2px', backgroundColor: '#3f51b5', borderColor: '#3f51b5'};

class Formula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientesAgregados: [],
      balanceTotal : {}
    }
  }

  actualizarBalanceTotal = ingredientesAgregados => {
    let total = 0;
    if (ingredientesAgregados.length){
      total =  ingredientesAgregados.map(e => Number(e.cantidad)).reduce((x,y) => x+y);
    }
    const ingredientesConTotales = this.obtenerPropiedadesConTotales(ingredientesAgregados, total);
    //const ingredientesProporcion = ingredientesAgregados.map(e => Number(e.cantidad)/total);
    //const ingredientesConTotales = this.obtener(ingredientesProporcion, total);

    // calculos balance general
    // TODO: refactor
    const gb = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'GB');
    const sngl = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'SNGL');
    const azucares =  this.obtenerTotalParaPropiedad(ingredientesConTotales, 'AzÔøΩcares');
    const mg = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'MG');
    const sng = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'SNG');
    const solidosTotales = gb + sngl + azucares + mg + sng;
    // TODO: falta restarle al 100 los alcooles cuando los tenga
    const hDosOMix = 100 - solidosTotales /*+ alcholes*/;
    // TODO: falta restarle al 100 los alcooles cuando los tenga
    const totalDelMix = hDosOMix + solidosTotales;

    const balanceTotal = { gb, sngl, azucares, mg, sng, solidosTotales, hDosOMix, totalDelMix, total};
    this.setState({ balanceTotal })
  };
    
  handleEditIngrediente = (ingrediente, cantidad) => {
    const { ingredientesAgregados } = this.state;
    ingredientesAgregados.forEach(ingredienteAEditar => {
      if(ingredienteAEditar.INGREDIENTES === ingrediente.INGREDIENTES){
        ingredienteAEditar.cantidad = cantidad;
        return;
      }
    })
    this.setState({
      ingredientesAgregados, 
      ingrediente: undefined,
      cantidad: undefined
    });
    this.actualizarBalanceTotal();
  };

  handleOkAgregarIngrediente = (ingrediente, cantidad) => {
    if(!ingrediente || !cantidad) return null;
    const { ingredientesAgregados } = this.state;
    if(!ingredientesAgregados.every(e => e.INGREDIENTES !== ingrediente.INGREDIENTES)) {
      this.handleEditIngrediente(ingrediente, cantidad);
      return;
    }
    ingredientesAgregados.push(Object.assign(ingrediente, {cantidad}));
    this.setState({
      ingredientesAgregados,
      ingrediente: undefined,
      cantidad: undefined
    });
    this.actualizarBalanceTotal();
  };

  onUpdate = (newIngrediente, oldIngrediente, callback) => {
    const { ingredientesAgregados } = this.state;
    const index = ingredientesAgregados.indexOf(oldIngrediente);
    ingredientesAgregados[index] = newIngrediente;
    this.setState({ ingredientesAgregados }, callback);
    this.actualizarBalanceTotal(ingredientesAgregados);
  }

  onAdd = (newIngrediente, callback) => {
    const { ingredientesAgregados } = this.state;
    ingredientesAgregados.push(newIngrediente);
    this.setState({ ingredientesAgregados }, callback);
    this.actualizarBalanceTotal(ingredientesAgregados);
  }

  onDelete = (oldIngrediente, callback) => {
    let { ingredientesAgregados } = this.state;
    const index = ingredientesAgregados.indexOf(oldIngrediente);
    ingredientesAgregados.splice(index, 1);
    this.setState({ ingredientesAgregados }, callback);
    this.actualizarBalanceTotal(ingredientesAgregados);
  }

  obtenerTotalParaPropiedad = (ingredientes, propiedad) => {
    return ingredientes
      .filter(e => e[propiedad]).map(e => e[propiedad]).reduce((x,y) => x+y, 0);
  };
  
  handleChangeInputCantidad = event => {
    this.setState({ cantidad: event.target.value })
  }
  
  handleChangeIngrediente = ingrediente => {
    this.setState({ ingrediente })
  }

  obtenerPropiedadesConTotales = (ingredientes, total) => {
    let ingredientesConTotales = [];
    for(let i=0; i < ingredientes.length; i++){
      const ingrediente = getIngredienteObjectByName(ingredientes[i].INGREDIENTES);
      const propiedades = Object.keys(ingrediente)
                        .filter(n => n !== 'INGREDIENTES' &&  n !== 'key' && n !== 'cantidad');
      const ingredienteConTotal = Object.assign({}, propiedades);
      for(let j=0; j < propiedades.length; j++){
        // divido por el total para obtener el porcentaje que muestra el excel
        ingredienteConTotal[propiedades[j]] = (Number(ingredientes[i].cantidad)/total) * (ingrediente[propiedades[j]]);
      };
      ingredientesConTotales.push(ingredienteConTotal);
    }
    return ingredientesConTotales;
  };

  render() {
    const { ingredientesAgregados } = this.state;
    const { ingrediente, cantidad, balanceTotal } = this.state;
    const { onAdd, onUpdate, onDelete } = this;
    return (
      <div className="FormulaContainer">
        <div className="FormulaTable">
          <FormulaTable 
            data={ingredientesAgregados}
            {...{ onAdd, onUpdate, onDelete }} />
        </div>
        <div className="Balance">
          <Balance {...{balanceTotal}}/>
        </div>
      </div>
    )
  }
}

export default Formula;