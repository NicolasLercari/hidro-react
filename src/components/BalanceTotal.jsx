import React from 'react';

const BalanaceTotal = ({ balanceTotal }) => {
  const { gb, sngl, azucares, mg, sng, solidosTotales, hDosOMix, totalDelMix, total } = balanceTotal;
  return (
    <div className="BalanceCard" style={{width: '50%'}}>
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

export default BalanaceTotal;