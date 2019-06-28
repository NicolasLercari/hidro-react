import ingredientesEstaticos from './ingredientesEstaticos';

const getIngredienteObjectByName = ingrediente => {
  const [result] = ingredientesEstaticos.filter(
    e => e.INGREDIENTES === ingrediente
  );
  return result;
};

const getNombreIngredienteByKey = ingrediente => {
  const [result] = ingredientesEstaticos.filter(
    e => e.key === Number(ingrediente)
  );
  return result;
};

export { getIngredienteObjectByName, getNombreIngredienteByKey };
