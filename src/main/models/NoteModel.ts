import {
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ModelStatic,
  DataTypes
} from 'sequelize'

interface NoteModel extends Model<InferAttributes<NoteModel>, InferCreationAttributes<NoteModel>> {
  id: CreationOptional<number>
  content: string
  folderId: number | null
  createdAt: number
  updatedAt: number
}

export default (sequelize: Sequelize): ModelStatic<NoteModel> => {
  return sequelize.define<NoteModel>(
    'Note',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      folderId: { type: DataTypes.INTEGER, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: false }
  )
}
