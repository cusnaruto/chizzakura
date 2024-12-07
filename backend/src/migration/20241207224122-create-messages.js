// migrations/xxxxxx-create-messages.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("messages", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        sender_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        receiver_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        timestamp: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        status: {
          type: Sequelize.ENUM("sent", "read"),
          defaultValue: "sent",
        },
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("messages");
    },
  };
  