import {
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ModelStatic,
  DataTypes
} from 'sequelize'

interface FolderModel
  extends Model<InferAttributes<FolderModel>, InferCreationAttributes<FolderModel>> {
  id: CreationOptional<number>
  name: string
  createdAt: number
  updatedAt: number
}

export default (sequelize: Sequelize): ModelStatic<FolderModel> => {
  return sequelize.define<FolderModel>(
    'Folder',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.TEXT, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: false }
  )
}
