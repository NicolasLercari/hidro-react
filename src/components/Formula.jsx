import React, { Component } from 'react';
import './Formula.scss';
import Balance from './Balance.jsx';
import FormulaTable from './FormulaTable.jsx';
import { getIngredienteObjectByName } from './ingredientesHelper';

class Formula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientesAgregados: [],
      balanceTotal: {}
    };
  }

  actualizarBalanceTotal = ingredientesAgregados => {
    let total = 0;
    if (ingredientesAgregados.length) {
      total = ingredientesAgregados
        .map(e => Number(e.cantidad))
        .reduce((x, y) => x + y);
    }
    const ingredientesConTotales = this.obtenerPropiedadesConTotales(
      ingredientesAgregados,
      total
    );

    // calculos balance general
    // TODO: refactor
    const dulzuraRelativa = this.obtenerTotalParaPropiedad(
      ingredientesConTotales,
      'F_D_R_'
    );
    const gb = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'GB');
    const sngl = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'SNGL');
    const azucares = this.obtenerTotalParaPropiedad(
      ingredientesConTotales,
      'AzÔøΩcares'
    );
    const mg = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'MG');
    const sngnl = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'SNG');
    const solidosTotales = gb + sngl + azucares + mg + sngnl;
    // TODO: falta restarle al 100 los alcooles cuando los tenga
    const hDosOMix = 100 - solidosTotales;
    // TODO: falta restarle al 100 los alcooles cuando los tenga
    const totalDelMix = hDosOMix + solidosTotales;

    const balanceTotal = {
      dulzuraRelativa,
      gb,
      sngl,
      azucares,
      mg,
      sngnl,
      solidosTotales,
      hDosOMix,
      totalDelMix,
      total
    };
    this.setState({ balanceTotal });
  };

  onUpdate = (newIngrediente, oldIngrediente, callback) => {
    const { ingredientesAgregados } = this.state;
    const index = ingredientesAgregados.indexOf(oldIngrediente);
    ingredientesAgregados[index] = newIngrediente;
    this.setState({ ingredientesAgregados }, callback);
    this.actualizarBalanceTotal(ingredientesAgregados);
  };

  onAdd = (newIngrediente, callback) => {
    const { ingredientesAgregados } = this.state;
    if (
      !ingredientesAgregados.every(
        e => e.INGREDIENTES !== newIngrediente.INGREDIENTES
      )
    ) {
      callback();
      window.alert(
        `El ingrediente ${
          newIngrediente.INGREDIENTES
        } ya esta agregado. Si desea cambiarlo, edítelo.`
      );
      return;
    }
    if (!newIngrediente.cantidad) {
      callback();
      window.alert('Debe ingresar una cantidad para guardar el ingrediente');
      return;
    }
    ingredientesAgregados.push(newIngrediente);
    this.setState({ ingredientesAgregados }, callback);
    this.actualizarBalanceTotal(ingredientesAgregados);
  };

  onDelete = (oldIngrediente, callback) => {
    const { ingredientesAgregados } = this.state;
    const index = ingredientesAgregados.indexOf(oldIngrediente);
    ingredientesAgregados.splice(index, 1);
    this.setState({ ingredientesAgregados }, callback);
    this.actualizarBalanceTotal(ingredientesAgregados);
  };

  obtenerTotalParaPropiedad = (ingredientes, propiedad) =>
    ingredientes
      .filter(e => e[propiedad])
      .map(e => e[propiedad])
      .reduce((x, y) => x + y, 0);

  obtenerPropiedadesConTotales = (ingredientes, total) => {
    const ingredientesConTotales = [];
    for (let i = 0; i < ingredientes.length; i++) {
      const ingrediente = getIngredienteObjectByName(
        ingredientes[i].INGREDIENTES
      );
      const propiedades = Object.keys(ingrediente).filter(
        n => n !== 'INGREDIENTES' && n !== 'key' && n !== 'cantidad'
      );
      const ingredienteConTotal = Object.assign(
        { proporcionEnMix: Number(ingredientes[i].cantidad) / total },
        propiedades
      );
      for (let j = 0; j < propiedades.length; j++) {
        // divido por el total para obtener el porcentaje que muestra el excel
        ingredienteConTotal[propiedades[j]] =
          (Number(ingredientes[i].cantidad) / total) *
          ingrediente[propiedades[j]];
      }
      ingredientesConTotales.push(ingredienteConTotal);
    }
    return ingredientesConTotales;
  };

  render() {
    const { ingredientesAgregados } = this.state;
    const { balanceTotal } = this.state;
    const { onAdd, onUpdate, onDelete } = this;
    return (
      <div className="FormulaContainer">
        <div className="FormulaTable">
          <FormulaTable
            data={ingredientesAgregados}
            {...{ onAdd, onUpdate, onDelete }}
          />
        </div>
        <div className="Balance">
          <Balance {...{ balanceTotal }} />
        </div>
      </div>
    );
  }
}

export default Formula;
