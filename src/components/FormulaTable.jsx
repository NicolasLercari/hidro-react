import {Table} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import ingredientesEstaticos from './ingredientesEstaticos.js';

// const dataSource = [];
// M.G.
// S.N.G.
// Az.
// Sól.Tot.
// Lac.% s/H2O (máx = 9*)
// Dulz.Relativa
// Proteínas
// Overrun (p/p)
// Alcohol % p/p (máx = 3*)
// ºt  de Servicio = (-ºC)

const columns = [{
  title: 'Ingredientes',
  dataIndex: 'INGREDIENTES',
  key: 'INGREDIENTES',
},
{
    title: 'kilos',
    dataIndex: 'cantidad',
    key: 'cantidad'
}];

class FormulaTable extends React.Component {

  // obtenerTotalParaPropiedad = (ingredientes, propiedad) => {
  //   return ingredientes
  //     .filter(e => e[propiedad]).map(e => e[propiedad]).reduce((x,y) => x+y, 0);
  // };

  footer = () => {
    // const { ingredientesAgregados } = this.props;
    // let total = 0;
    // if (ingredientesAgregados.length){
    //   total =  ingredientesAgregados.map(e => Number(e.cantidad)).reduce((x,y) => x+y);
    // }
    // const ingredientesConTotales = this.obtenerPropiedadesConTotales(total);
    
    // // calculos balance general
    // // TODO: refactor
    // const gb = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'GB');
    // const sngl = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'SNGL');
    // const azucares =  this.obtenerTotalParaPropiedad(ingredientesConTotales, 'AzÔøΩcares');
    // const mg = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'MG');
    // const sng = this.obtenerTotalParaPropiedad(ingredientesConTotales, 'SNG');
    // const solidosTotales = gb + sngl + azucares + mg + sng;
    // // TODO: falta restarle al 100 los alcooles cuando los tenga
    // const hDosOMix = 100 - solidosTotales /*+ alcholes*/;
    // // TODO: falta restarle al 100 los alcooles cuando los tenga
    // const totalDelMix = hDosOMix + solidosTotales;
    const { balanceTotal } = this.props;
    const {gb,sngl,azucares, mg, sng, solidosTotales, hDosOMix, totalDelMix, total} = balanceTotal;
    return (
        <div>
          <p> BALANCE GENERAL </p>
          <p> GB: {gb} %</p>
          <p> S.N.G.L: {sngl} %</p>
          <p> Azucares: {azucares} %</p>
          <p> Materia Grasa (no lacteos): {mg} %</p>
          <p> Solidos No Grasos (no Lacteos): {sng} %</p>
          <p> Solidos Totales: {solidosTotales} %</p>
          <p> H2O del mix: {hDosOMix} %</p>
          <p> Total (% p/p del mix): {totalDelMix} %</p>
          <p> Total: {total} Kgs.</p>
        </div>
      );
  };

  // obtenerPropiedadesConTotales = (total) => {
  //   const { ingredientesAgregados } = this.props;
  //   let ingredientesConTotales = ingredientesAgregados.slice();
  //   for(let i=0; i < ingredientesConTotales.length; i++){
  //     const ingrediente = ingredientesConTotales[i];
  //     console.log(ingrediente.INGREDIENTES);
  //     const propiedades = Object.keys(ingrediente)
  //                       .filter(n => n !== 'INGREDIENTES' &&  n !== 'key' && n !== 'cantidad');
  //     for(let j=0; j < propiedades.length; j++){
  //       // divido por el total para obtener el porcentaje que muestra el excel
  //       ingrediente[propiedades[j]] = ingrediente.cantidad * ((ingrediente[propiedades[j]]/total));
  //       console.log(propiedades[j] + ' : ' + ingrediente[propiedades[j]]);
  //     };
  //   }
  //   return ingredientesConTotales;
  // };

  render(){
    const { ingredientesAgregados } = this.props;
    return (
      <Table
        footer={this.footer}
        dataSource={ingredientesAgregados}
        columns={columns}
        />
    );
  };
}

export default FormulaTable;