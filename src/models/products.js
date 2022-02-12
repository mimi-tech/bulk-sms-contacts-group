const { DataTypes } = require("sequelize");

module.exports = (db) => {
  const schema = db.define(
    "Products",
    {

      productId: { type: DataTypes.UUID, primaryKey: true },
     
      productName:{type: DataTypes.STRING, allowNull: false},

      productType:{type: DataTypes.STRING, allowNull: false},

      productImageUrl:{type: DataTypes.STRING, allowNull: false},

      productSize:{type: DataTypes.STRING, allowNull: false},

      productRate:{type: DataTypes.DOUBLE, allowNull: false},

      productLike:{type: DataTypes.INTEGER, allowNull: false},

      productOwnerId:{type: DataTypes.STRING, allowNull: false},

      productOwnerFirstName:{type: DataTypes.STRING, allowNull: false},

      productOwnerLastName:{type: DataTypes.STRING, allowNull: false},
      
      productStock:{type: DataTypes.INTEGER, allowNull: false},

      productPrice:{type: DataTypes.INTEGER, allowNull: true},

      dateAdded:{type: DataTypes.STRING, allowNull: false},
      
      
    },
    {
      timestamps: true,
      tableName: "Products",
    }
  );
  schema.prototype.transform = function (admin) {
    let cols = [
    "productId",
    "productName",
    "productType",
    "productImageUrl",
    "productSize",
    "productRate",
    "productLike",
    "productOwnerId",
    "productOwnerFirstName",
    "productStock",
    "dateAdded"

  ];
    cols = admin ? [...cols, "createdAt"] : cols;
    const data = {};
    cols.forEach((v) => {
      data[v] = this.dataValues[v];
    });
    return data;
  };
  
  return schema;
};
