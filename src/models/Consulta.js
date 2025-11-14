const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Consulta = sequelize.define('consulta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_consulta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: 'Debe ser una fecha válida'
            },
            noFuturo(valor) {
                if (new Date(valor) > new Date()) {
                    throw new Error('La fecha de consulta no puede ser futura');
                }
            }
        }
    },
    diagnostico: {
        type: DataTypes.TEXT
    },
    observaciones: {
        type: DataTypes.TEXT
    },
    requiere_hospitalizacion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        get() {
            const valor = this.getDataValue('requiere_hospitalizacion');
            return valor ? 'Sí' : 'No';
        },
        set(valor) {
            if (typeof valor === 'string') {
                this.setDataValue('requiere_hospitalizacion', valor.toLowerCase() === 'sí' || valor.toLowerCase() === 'si');
            } else {
                this.setDataValue('requiere_hospitalizacion', valor);
            }
        }
    }
}, {
    tableName: 'consultas'
});

module.exports = Consulta;