const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrdenAccesorio = sequelize.define('ordenes_accesorios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orden_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ordenes_medicas',
            key: 'id'
        }
    },
    accesorio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'accesorios',
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0.01],
                msg: 'El subtotal no puede ser menor a cero'
            },
            isDecimal: {
                msg: 'El valor del subtotal debe ser un número decimal válido'
            }
        }
    }
}, {
    tableName: 'ordenes_accesorios'
});

module.exports = OrdenAccesorio;