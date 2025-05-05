import {
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ModelStatic,
  DataTypes
} from 'sequelize'

interface LinkModel extends Model<InferAttributes<LinkModel>, InferCreationAttributes<LinkModel>> {
  id: CreationOptional<number>
  url: string
  title: string | null
  iconUrl: string | null
  folderId: number | null
  productPrice: string | null
  readTime: string | null
  isPinned: boolean
  createdAt: number
  updatedAt: number
}

export default (sequelize: Sequelize): ModelStatic<LinkModel> => {
  return sequelize.define<LinkModel>(
    'Link',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      url: { type: DataTypes.TEXT, allowNull: false, unique: true },
      title: { type: DataTypes.TEXT, allowNull: true },
      iconUrl: { type: DataTypes.TEXT, allowNull: true },
      folderId: { type: DataTypes.INTEGER, allowNull: true },
      productPrice: { type: DataTypes.TEXT, allowNull: true },
      readTime: { type: DataTypes.TEXT, allowNull: true },
      isPinned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: false }
  )
}
