import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Progress } from 'reactstrap';

const BalanaceTotal = ({ balanceTotal }) => {
  const { gb, sngl, azucares, mg, sng, solidosTotales, hDosOMix, totalDelMix, total } = balanceTotal;
  return (
    <div className="BalanceCard"> 
      <div className="text-center" color="success" >GB: {gb} %</div>
      <Progress value={gb} />
      <div className="text-center">S.N.G.L: {sngl} %</div>
      <Progress value={sngl} />
      <div className="text-center">Azucares: {azucares} %</div>
      <Progress value={azucares} />
      <div className="text-center">Materia Grasa (no lacteos): {mg} %</div>
      <Progress value={mg} />
      <div className="text-center">Solidos Totales: {solidosTotales} %</div>
      <Progress value={solidosTotales} />
      <div className="text-center">H2O del mix: {hDosOMix} %</div>
      <Progress value={hDosOMix} />
      <div className="text-center">Total (% p/p del mix): {totalDelMix} %</div>
      <Progress value={totalDelMix} />
      <div className="text-center"> Total: {total} Kgs.</div>
      <Progress value={total} />
    </div>
  );
};

export default BalanaceTotal;