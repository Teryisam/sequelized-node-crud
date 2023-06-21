const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        // title: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        bvn: { type: DataTypes.STRING, allowNull: false },
        dateOfBirth: { type: DataTypes.STRING, allowNull: false },
        phoneNumber: { type: DataTypes.STRING, allowNull: false },
        acctType: { type: DataTypes.STRING, allowNull: false },
        // title: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: true }
    };

    // const options = {
    //     defaultScope: {
    //         // exclude password hash by default
    //         attributes: { exclude: ['passwordHash'] }
    //     },
    //     scopes: {
    //         // include hash with this scope
    //         withHash: { attributes: {}, }
    //     }
    // };

    // return sequelize.define('User', attributes, options);
    return sequelize.define('User', attributes);
}