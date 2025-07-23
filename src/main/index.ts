import { join } from 'path'

import '@main/handlers/index'

import icon from '../../resources/icon.png?asset'
import trayIcon from '../../resources/vault.png?asset'

import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { app, shell, BrowserWindow, ipcMain, protocol, net, Tray, Menu } from 'electron'

import apiManager from '@main/api/APIManager'

let mainWindow: BrowserWindow | null = null

let tray: Tray | null = null

let isQuitting = false

function createTray(): void {
  tray = new Tray(trayIcon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: (): void => {
        showDockIcon()

        if (mainWindow) {
          mainWindow.show()
        } else {
          createWindow()
        }
      }
    },
    {
      label: 'Quit Vault',
      click: (): void => {
        app.quit()
      }
    }
  ])

  tray.setToolTip('vault')

  tray.setContextMenu(contextMenu)
}

function createWindow(): void {
  showDockIcon()

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 560,
    minHeight: 420,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    ...(process.platform === 'darwin' && {
      titleBarStyle: 'hidden',
      trafficLightPosition: {
        x: 20,
        y: 20
      }
    })
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()

    if (mainWindow) {
      try {
        apiManager.stop()

        apiManager.initialize(mainWindow)

        apiManager.start()
      } catch (error) {
        console.error('Failed to start API server:', error)
      }
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault()

      mainWindow?.hide()

      if (BrowserWindow.getAllWindows().every((win) => !win.isVisible())) {
        hideDockIcon()
      }
    } else {
      apiManager.stop()
    }

    return false
  })

  mainWindow.on('show', () => {
    showDockIcon()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  protocol.handle('vault', (request) => {
    const filePath = request.url.slice('vault://'.length)

    return net.fetch('file://' + filePath)
  })

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createTray()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    mainWindow = null
  }
})

app.on('before-quit', () => {
  isQuitting = true

  apiManager.stop()
})

app.on('will-quit', () => {
  apiManager.stop()
})

// Add dock show/hide handlers
function showDockIcon(): void {
  if (process.platform === 'darwin') {
    app.dock.show()
  }
}

function hideDockIcon(): void {
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
