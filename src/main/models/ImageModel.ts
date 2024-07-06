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
  filePath: string
  folderId: number | null
  createdAt: number
}

export default (sequelize: Sequelize): ModelStatic<ImageModel> => {
  return sequelize.define<ImageModel>(
    'Image',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      filePath: { type: DataTypes.TEXT, allowNull: false },
      folderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Folders', key: 'id' }
      },
      createdAt: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: false }
  )
}
