const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Paciente = sequelize.define('paciente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING
    },
    raza: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.INTEGER
    },
    esterilizado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        get() {
            const valor = this.getDataValue('esterilizado');
            return valor ? 'Sí' : 'No';
        },
        set(valor) {
            if (typeof valor === 'string') {
                this.setDataValue('esterilizado', valor.toLowerCase() === 'sí' || valor.toLowerCase() === 'si');
            } else {
                this.setDataValue('esterilizado', valor);
            }
        }
    },
    sexo: {
        type: DataTypes.ENUM('Masculino', 'Femenino'),
        allowNull: false,
        set(valor) {
            if (typeof valor === 'string') {
                const normalizar = valor.trim().toLowerCase();

                if (normalizar === 'masculino' || normalizar === 'm' || normalizar === 'macho') {
                    this.setDataValue('sexo', 'Masculino');
                } else if (normalizar === 'femenino' || normalizar === 'f' || normalizar === 'hembra') {
                    this.setDataValue('sexo', 'Femenino');
                } else {
                    throw new Error('El sexo debe ser "Masculino" o "Femenino"');
                }
            }
        }
    }
}, {
    tableName: 'pacientes'
});

module.exports = Paciente;