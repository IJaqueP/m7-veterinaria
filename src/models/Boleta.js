const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Boleta = sequelize.define('boletas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subtotal_medicamentos: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    subtotal_examenes: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }, 
    subtotal_accesorios: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    total:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    fecha_emision: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: 'Debe ser una fecha válida'
            },
            noFuturo(valor) {
                if (new Date(valor) > new Date()) {
                    throw new Error('La fecha de emisión no puede ser futura');
                }
            }
        }
    },
    metodo_pago: {
        type: DataTypes.ENUM('Efectivo', 'Crédito', 'Débito', 'Transferencia'),
        allowNull: false,
        set(valor) {
            if (typeof valor === 'string') {
                const normalizar = valor.trim().toLowerCase();

                if (normalizar === 'efectivo' || normalizar === 'e' || normalizar === 'efect') {
                    this.setDataValue('metodo_pago', 'Efectivo');
                } else if (normalizar === 'credito' || normalizar === 'c' || normalizar === 'cred') {
                    this.setDataValue('metodo_pago', 'Crédito');
                } else if (normalizar === 'debito' || normalizar === 'd' || normalizar === 'deb') {
                    this.setDataValue('metodo_pago', 'Débito');
                } else if (normalizar === 'transferencia' || normalizar === 't' || normalizar === 'trans') {
                    this.setDataValue('metodo_pago', 'Transferencia')
                } else {
                    throw new Error('El método de pago debe ser "Efectivo", "Crédito", "Débito" o "Transferencia"');
                }
            }
        }
    }
}, {
    tableName: 'boletas'
});

module.exports = Boleta;