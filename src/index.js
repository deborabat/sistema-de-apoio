const { app, BrowserWindow, Menu } = require('electron')
// Mantém a referência global do objeto da janela.

let win

function createWindow () {
  // Criar uma janela de navegação.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitido quando a janela é fechada.
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', function(){
    createWindow()

    const template = [
        {
            label: 'Guia',
        },
        {
            label: 'Ajuda',
            click: function(){
                Electron.shell.openExternal('http://electron.atomm.io')
            }
        },
        {
            label: 'Sair'
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});


// Finaliza quando todas as janelas estiverem fechadas.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

