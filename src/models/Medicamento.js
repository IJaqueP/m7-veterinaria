const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Medicamento = sequelize.define('medicamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    unidad_medida: {
        type: DataTypes.ENUM('mg', 'mL', 'uL'),
        allowNull: false,
        set(valor) {
            if (typeof valor === 'string') {
                const normalizar = valor.trim().toLowerCase();

                if (normalizar === 'mili gramo' || normalizar === 'miligramo') {
                    this.setDataValue('unidad_medida', 'mg');
                } else if (normalizar === 'mililitro' || normalizar === 'mili litro') {
                    this.setDataValue('unidad_medida', 'mL')
                } else if (normalizar === 'microlitro' || normalizar === 'micro litro') {
                    this.setDataValue('unidad_medida', 'uL')
                } else {
                    throw new Error('La unidad de medida debe ser "mg", "mL" o "uL"');
                }
            }
        }
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0.01],
                msg: 'El precio unitario debe ser mayor a cero'
            },
            isDecimal: {
                msg: 'El precio unitario debe ser un número decimal válido'
            }
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: {
                args: [0],
                msg: 'El stock no puede ser negativo'
            },
            isInt: {
                msg: 'El stock debe ser un número entero'
            }
        }
    }
}, {
    tableName: 'medicamentos'
});

module.exports = Medicamento;