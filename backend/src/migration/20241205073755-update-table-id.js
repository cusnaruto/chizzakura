'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add table_number column
    await queryInterface.addColumn('Tables', 'table_number', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    });

    // Update existing records with table_number equal to id
    await queryInterface.sequelize.query(
      'UPDATE Tables SET table_number = id'
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the table_number column 
    await queryInterface.removeColumn('Tables', 'table_number');
  }
};