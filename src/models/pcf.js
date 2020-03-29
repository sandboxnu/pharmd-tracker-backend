'use strict';
module.exports = (sequelize, DataTypes) => {
    const pcf = sequelize.define('pcf', {
        pcfID: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        submissionDate: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false
        },
        submittedBy: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('Portfolio', 'Classroom', 'IPPE', 'APPE'),
            unique: false,
            allowNull: false
        },
        reviewedBy: {
            type: DataTypes.ENUM('PCF Only', 'APCB', 'ASC'),
            unique: false,
            allowNull: false
        },
        meetingDate: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: true
        },
        decisionRendered: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        }
    });
    return pcf;
};