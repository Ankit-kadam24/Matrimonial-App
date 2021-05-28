import { db } from "../index";
import { DataTypes } from "sequelize";
import User from "./user.schema";
import { uuid } from "../../server/utils";

const RelativeContact = db.schema.define(
  "RelativeContacts",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    tableName: "RelativeContacts",
    indexes: [{ fields: ["UserId"] }],
    hooks: {
      beforeValidate: function (payload: any, options) {
        payload.id = uuid();
      },
    },
  }
);

export default RelativeContact;
