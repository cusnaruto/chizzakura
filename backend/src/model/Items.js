const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Items = sequelize.define("Items", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  categoryid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  freezeTableName: true
});

// Add associations
Items.associate = (models) => {
  Items.hasMany(models.ItemReview, { foreignKey: 'itemId' });
};

module.exports = Items;