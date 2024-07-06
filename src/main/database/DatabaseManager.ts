import path from 'path'

import { Sequelize } from 'sequelize'

import LinkModel from '@main/models/LinkModel'
import NoteModel from '@main/models/NoteModel'
import ImageModel from '@main/models/ImageModel'
import FolderModel from '@main/models/FolderModel'

class DatabaseManager {
  private sequelize: Sequelize | null = null

  public models: {
    Link?: ReturnType<typeof LinkModel>
    Note?: ReturnType<typeof NoteModel>
    Image?: ReturnType<typeof ImageModel>
    Folder?: ReturnType<typeof FolderModel>
  } = {}

  openDatabase = async (vaultPath: string): Promise<void> => {
    if (this.sequelize) {
      await this.sequelize.close()
    }

    const dbPath = path.join(vaultPath, 'database.sqlite')

    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath
    })

    this.initializeModels()

    await this.sequelize.sync()
  }

  initializeModels = (): void => {
    if (!this.sequelize) throw new Error('Sequelize instance not initialized.')

    this.models.Link = LinkModel(this.sequelize)
    this.models.Note = NoteModel(this.sequelize)
    this.models.Image = ImageModel(this.sequelize)
    this.models.Folder = FolderModel(this.sequelize)
  }

  getSequelizeInstance = (): Sequelize => {
    if (!this.sequelize) {
      throw new Error('Database not opened. Call openDatabase first.')
    }

    return this.sequelize
  }

  closeDatabase = async (): Promise<void> => {
    if (this.sequelize) {
      await this.sequelize.close()

      this.sequelize = null
    }
  }
}

const databaseManager = new DatabaseManager()

export default databaseManager
