import { Sequelize, DataTypes, Model } from "sequelize";

export class DocumentModel extends Model {
  public id!: number;
  public userId!: string;
  public type!: "CPF" | "RG" | "COMPROVANTE_RESIDENCIA" | "HISTORICO_ESCOLAR";
  public fileName!: string;
  public originalName!: string;
  public mimeType!: string;
  public size!: number;
  public path!: string;
  public status!: "PENDENTE" | "APROVADO" | "REJEITADO";
  public url!: string;
}

export default (sequelize: Sequelize) => {
  DocumentModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("CPF", "RG", "COMPROVANTE_RESIDENCIA", "HISTORICO_ESCOLAR"),
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      originalName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDENTE", "APROVADO", "REJEITADO"),
        allowNull: false,
        defaultValue: "PENDENTE",
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "documentos",
    }
  );
  return DocumentModel;
};
