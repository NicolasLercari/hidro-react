import React, { forwardRef } from 'react';
import 'antd/dist/antd.css';
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import SelectIngredientes from './SelectIngredientes.jsx';
import './FormulaTable.scss';

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <IconButton
      variant="contained"
      size="small"
      {...props}
      ref={ref}
      className="AddButton"
    >
      <AddIcon fontSize="small" />
      Agregar
    </IconButton>
  ))
};

class FormulateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          cellStyle: {
            zIndex: 0
          },
          title: 'Ingredientes',
          field: 'INGREDIENTES',
          editComponent: ({ value, onChange }) => (
            <SelectIngredientes value={value} onChange={onChange} />
          )
        },
        {
          title: 'kilos',
          field: 'cantidad',
          type: 'numeric',
          cellStyle: {
            zIndex: 0
          },
          required: true
        }
      ]
    };
  }

  render() {
    const { data, onUpdate, onAdd, onDelete } = this.props;
    const { columns } = this.state;
    return (
      <MaterialTable
        title="Receta"
        options={{
          actionsColumnIndex: columns.length,
          pageSizeOptions: 20
        }}
        icons={tableIcons}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (!data.every(e => e.INGREDIENTES !== newData.INGREDIENTES)) {
                  alert(
                    `El ingrediente ${
                      newData.INGREDIENTES
                    } ya esta agregado. Si desea cambiarlo, edítelo.`
                  );
                  return resolve();
                }
                onAdd(newData, () => resolve());
                resolve();
              }, 100);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                onUpdate(newData, oldData, () => resolve());
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                onDelete(oldData, () => resolve());
                resolve();
              }, 1000);
            })
        }}
      />
    );
  }
}

export default FormulateTable;
