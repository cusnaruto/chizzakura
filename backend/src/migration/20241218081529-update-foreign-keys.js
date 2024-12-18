module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove existing foreign key constraints for orderdetails
    await queryInterface.removeConstraint('orderdetails', 'orderdetails_ibfk_1');
    await queryInterface.removeConstraint('orderdetails', 'orderdetails_ibfk_2');

    // Add updated constraints for orderdetails
    await queryInterface.addConstraint('orderdetails', {
      fields: ['orderId'], // Field pointing to `orders` table
      type: 'foreign key',
      name: 'orderdetails_ibfk_1',
      references: {
        table: 'orders',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    await queryInterface.addConstraint('orderdetails', {
      fields: ['itemId'], // Field pointing to `items` table
      type: 'foreign key',
      name: 'orderdetails_ibfk_2',
      references: {
        table: 'items',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Remove existing foreign key constraints for itemreviews
    await queryInterface.removeConstraint('itemreviews', 'itemreviews_ibfk_1');
    await queryInterface.removeConstraint('itemreviews', 'itemreviews_ibfk_2');
    await queryInterface.removeConstraint('itemreviews', 'itemreviews_ibfk_3');

    // Add updated constraints for itemreviews
    await queryInterface.addConstraint('itemreviews', {
      fields: ['orderId'], // Field pointing to `orders` table
      type: 'foreign key',
      name: 'itemreviews_ibfk_1',
      references: {
        table: 'orders',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('itemreviews', {
      fields: ['itemId'], // Field pointing to `items` table
      type: 'foreign key',
      name: 'itemreviews_ibfk_2',
      references: {
        table: 'items',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('itemreviews', {
      fields: ['userId'], // Field pointing to `users` table
      type: 'foreign key',
      name: 'itemreviews_ibfk_3',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    // Remove existing foreign key constraints for itemreviews
    await queryInterface.removeConstraint('orders', 'orders_ibfk_1');

    // Add updated constraints for itemreviews
    await queryInterface.addConstraint('orders', {
      fields: ['tableId'], // Field pointing to `orders` table
      type: 'foreign key',
      name: 'orders_ibfk_1',
      references: {
        table: 'tables',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the constraints for orderdetails
    await queryInterface.removeConstraint('orderdetails', 'orderdetails_ibfk_1');
    await queryInterface.removeConstraint('orderdetails', 'orderdetails_ibfk_2');

    await queryInterface.addConstraint('orderdetails', {
      fields: ['orderId'],
      type: 'foreign key',
      name: 'orderdetails_ibfk_1',
      references: {
        table: 'orders',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('orderdetails', {
      fields: ['itemId'],
      type: 'foreign key',
      name: 'orderdetails_ibfk_2',
      references: {
        table: 'items',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    // Revert the constraints for itemreviews
    await queryInterface.removeConstraint('itemreviews', 'itemreviews_ibfk_1');
    await queryInterface.removeConstraint('itemreviews', 'itemreviews_ibfk_2');
    await queryInterface.removeConstraint('itemreviews', 'itemreviews_ibfk_3');

    await queryInterface.addConstraint('itemreviews', {
      fields: ['orderId'],
      type: 'foreign key',
      name: 'itemreviews_ibfk_1',
      references: {
        table: 'orders',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    await queryInterface.addConstraint('itemreviews', {
      fields: ['itemId'],
      type: 'foreign key',
      name: 'itemreviews_ibfk_2',
      references: {
        table: 'items',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    await queryInterface.addConstraint('itemreviews', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'itemreviews_ibfk_3',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    // Remove existing foreign key constraints for itemreviews
    await queryInterface.removeConstraint('orders', 'orders_ibfk_1');

    // Add updated constraints for itemreviews
    await queryInterface.addConstraint('orders', {
      fields: ['tableId'], // Field pointing to `orders` table
      type: 'foreign key',
      name: 'orders_ibfk_1',
      references: {
        table: 'tables',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  },
};
