import {
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ModelStatic,
  DataTypes
} from 'sequelize'

interface ImageModel
  extends Model<InferAttributes<ImageModel>, InferCreationAttributes<ImageModel>> {
  id: CreationOptional<number>
  fileName: string
  folderId: number | null
  createdAt: number
}

export default (sequelize: Sequelize): ModelStatic<ImageModel> => {
  return sequelize.define<ImageModel>(
    'Image',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      fileName: { type: DataTypes.TEXT, allowNull: false },
      folderId: { type: DataTypes.INTEGER, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: false }
  )
}
