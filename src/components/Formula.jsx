import React, { Component } from "react";
import MaterialTable from "material-table";
import './Formula.scss';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Balance from './Balance'
import SelectIngredientes from './SelectIngredientes'
import InputCantidad from './InputCantidad.jsx';
import Button from '@material-ui/core/Button';

const buttonStyles = {margin: '2px', backgroundColor: '#3f51b5', borderColor: '#3f51b5'};


class Formula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { 
          title: 'Ingredientes',
          field: 'INGREDIENTES'
        },
        { title: 'kilos', field: 'cantidad' },
      ],
      ingredientesAgregados: [],
      balanceTotal : {}
    }
  }

  actualizarBalanceTotal = () => {
    const { ingredientesAgregados } = this.state;
    let total = 0;
    if (ingredientesAgregados.length){
      total =  ingredientesAgregados.map(e => Number(e.cantidad)).reduce((x,y) => x+y);
    }
    const ingredientesConTotales = this.obtenerPropiedadesConTotales(total);
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

    // const balanceTotal = [{ propiedad: 'gb', proporcion: gb }, { propiedades: 'sngl', proporcion: sngl}
    //       , {propiedad: 'azucares', proporcion: azucares }, {propiedad: 'mg', proporcion: mg}
    //       , {propiedad: 'sng', proporcion: mg }, {propiedad: 'solidosTotales', proporcion: solidosTotales}
    //       , {propiedad: 'hDosOMix', proporcion: hDosOMix }, {propiedad: 'totalDelMix', proporcion: totalDelMix} 
    //       , { propiedad: 'total', proporcion: total }];
    
    // this.setState({ balanceTotal });
    const balanceTotal = { gb, sngl, azucares, mg, sng, solidosTotales, hDosOMix, totalDelMix, total};
    this.setState({ balanceTotal })
  };
    

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
    this.actualizarBalanceTotal();
  };

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

  obtenerPropiedadesConTotales = (total) => {
    const { ingredientesAgregados } = this.state;
    let ingredientesConTotales = [];
    for(let i=0; i < ingredientesAgregados.length; i++){
      const ingrediente = ingredientesAgregados[i];
      const propiedades = Object.keys(ingrediente)
                        .filter(n => n !== 'INGREDIENTES' &&  n !== 'key' && n !== 'cantidad');
      const ingredienteConTotal = Object.assign({}, propiedades);
      for(let j=0; j < propiedades.length; j++){
        // divido por el total para obtener el porcentaje que muestra el excel
        ingredienteConTotal[propiedades[j]] = (Number(ingrediente.cantidad)/total) * (ingredientesAgregados[i][propiedades[j]]);
      };
      ingredientesConTotales.push(ingredienteConTotal);
    }
    return ingredientesConTotales;
  };
    

  render() {
    const { ingredientesAgregados } = this.state;
    const { ingrediente, cantidad, balanceTotal } = this.state;
    return (
      <div className="FormulaContainer">
        <div className="FormulaTable">
          <MaterialTable
            title="Editable Preview"
            columns={this.state.columns}
            data={ingredientesAgregados}
            editable={{
              onRowAdd: newData =>
              new Promise((resolve, reject) => {
                  setTimeout(() => {
                      {
                        const { ingredientesAgregados } = this.state;
                        ingredientesAgregados.push(newData);
                        this.setState({ ingredientesAgregados }, () => resolve());
                      }
                      resolve();
                  }, 1000);
              }),
            }}
            components={{
              EditRow: () => (
                  <div className="AddIngrediente">
                    <SelectIngredientes value={ingrediente && ingrediente.INGREDIENTES} onChange={this.handleChangeIngrediente} />
                    <InputCantidad value={cantidad} onChange={this.handleChangeInputCantidad} />    
                    <Button color="primary" variant="contained" onClick={() => this.handleOkAgregarIngrediente(ingrediente, cantidad)}> agregar </Button>
                  </div>
                ) 
            }}
          />
        </div>
        <div className="Balance">
          <Balance balanceTotal={balanceTotal}/>
        </div>
      </div>
    )
  }
}

export default Formula;