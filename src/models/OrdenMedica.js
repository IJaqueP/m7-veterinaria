const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrdenMedica = sequelize.define('orden_medica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_orden: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: 'Debe ser una fecha válida'
            },
            noFuturo(valor) {
                if (new Date(valor) > new Date()) {
                    throw new Error('La fecha de la orden no puede ser futura');
                }
            }
        }
    },
    observacion: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        get() {
            const valor = this.getDataValue('estado');
            return valor ? 'Activa' : 'No Activa';
        },
        set(valor) {
            if (typeof valor === 'string') {
                this.setDataValue('estado', valor.toLowerCase() === 'activa' || valor.toLowerCase() === 'activo');
            } else {
                this.setDataValue('estado', valor);
            }
        }
    }
}, {
    tableName: 'ordenes_medicas'
});

module.exports = OrdenMedica;