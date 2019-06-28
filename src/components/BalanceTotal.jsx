import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress } from 'reactstrap';
import './BalanceTotal.scss';

const BalanaceTotal = ({ balanceTotal }) => {
  const {
    gb,
    sngl,
    azucares,
    mg,
    sngnl,
    dulzuraRelativa,
    solidosTotales,
    hDosOMix,
    totalDelMix,
    total
  } = balanceTotal;
  return (
    <div className="BalanceTotal">
      <div className="text-center" color="success">
        GB: {gb} %
      </div>
      <Progress value={gb} />
      <div className="text-center">S.N.G.L: {sngl} %</div>
      <Progress value={sngl} />
      <div className="text-center">S.N.G (no lacteo): {sngnl} %</div>
      <Progress value={sngnl} />
      <div className="text-center">S.N.G: {sngnl + sngl} %</div>
      <Progress value={sngnl + sngl} />
      <div className="text-center">Azucares: {azucares} %</div>
      <Progress value={azucares} />
      <div className="text-center">Materia Grasa (no lacteos): {mg} %</div>
      <Progress value={mg} />
      {/* la dulzura relativa en el excel se multiplica por P/P que es un porcentaje */}
      <div className="text-center">
        Dulzura relativa: {dulzuraRelativa && dulzuraRelativa * 100} %
      </div>
      <Progress value={dulzuraRelativa && dulzuraRelativa * 100} />
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
