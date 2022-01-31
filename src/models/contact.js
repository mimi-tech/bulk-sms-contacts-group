const { DataTypes } = require("sequelize");

module.exports = (db) => {
  const schema = db.define(
    "ContactGroup",
    {

      id: { type: DataTypes.UUID, primaryKey: true },

      authId:{type: DataTypes.STRING, allowNull: false},

      contacts: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
      
      contactName:{type: DataTypes.STRING, allowNull: false}
    },
    {
      timestamps: true,
      tableName: "ContactGroup",
    }
  );
  schema.prototype.transform = function (admin) {
    let cols = [
    "id",
    "authId",
    "contacts",
    "contactName"
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
