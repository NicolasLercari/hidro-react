import {Table} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';


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
  constructor(props){
    super(props);
  };

  footer = () => {
    const { ingredientesAgregados } = this.props;
    let total = 0;
    if (ingredientesAgregados.length){
      total =  ingredientesAgregados.map(e => Number(e.cantidad)).reduce((x,y) => x+y);
    }
    return (<p> total: {total} </p>);
  };

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