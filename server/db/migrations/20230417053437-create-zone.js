/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Zones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rusName: {
        type: Sequelize.STRING,
      },
      zoneName: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      powerValue: {
        type: Sequelize.BOOLEAN,
      },
      soundValue: {
        type: Sequelize.BOOLEAN,
        defaultValue: null,
      },
      ledValue: {
        type: Sequelize.BOOLEAN,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Zones');
  },
};
