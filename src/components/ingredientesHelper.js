import ingredientesEstaticos from './ingredientesEstaticos.js';

const getIngredienteObjectByName = ingrediente => {
    const [result] = ingredientesEstaticos.filter(e => e.INGREDIENTES === ingrediente);
    return result;
};

export { getIngredienteObjectByName };