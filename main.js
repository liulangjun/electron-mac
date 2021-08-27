const {app, BrowserWindow, ipcMain, screen, Tray} = require('electron')
const path = require('path')
const {checkUpdate} = require('./system/checkVersion')
const {dialog} = require('electron')


function createRemindWindow () {
    //创建提醒窗口
    remindWindow = new BrowserWindow({
        // fullscreen: true,
        width: 200,
        height: 200,
        webPreferences: {
            nodeIntegration: true, //是否集成node
            contextIsolation: false, //Electron 12.0以上版本需要的额外设置此项
            enableRemoteModule: true
        }
    })
   
    // const tray = new Tray()
    // //获取屏幕尺寸
    const logo = path.relative(__dirname, './img/logo.png')
    const size = screen.getPrimaryDisplay().workAreaSize
    console.log('size', size);
      const tray = new Tray(logo)
    //获取托盘位置的y坐标（windows在右下角，Mac在右上角）
    const { y } = tray.getBounds()
    // console.log('remindWindow',tray);
    //获取窗口的宽高
    const { height, width } = remindWindow.getBounds()
    console.log('height, width', height, width);
    //计算窗口的y坐标
    const yPosition = process.platform === 'darwin' ? y : y - height
    
    //setBounds设置窗口的位置
    remindWindow.setBounds({
      x: size.width - width,     //x坐标为屏幕宽度 - 窗口宽度
      y: yPosition,
      height: 200,
      width: 200
    })
    
    //当有多个应用时，提醒窗口始终处于最上层
    remindWindow.setAlwaysOnTop(true)
    remindWindow.loadFile(path.join(__dirname,'./index2.html'))
    remindWindow.on('closed', () => { 
        console.log('closed------');
        remindWindow = null 
    })
    // remindWindow.loadURL(`file://${__dirname}/src/remind.html`)
}

function createWindow() {
    const window = new BrowserWindow({
        // fullscreen: true,
        width: 700,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname,'./preload.js'),
            nodeIntegration: true, //是否集成node
            contextIsolation: false, //Electron 12.0以上版本需要的额外设置此项
            enableRemoteModule: true
        }
    })
    global.win = window
    // require('devtron').install()
    window.webContents.openDevTools()
    
    const web = window.webContents
    
    window.loadFile(path.join(__dirname,'./index.html'))



    ipcMain.on('message',(event, arg) => {
        console.log('message----', arg);
        event.reply('xixi','嘻嘻123')
    })


    // setTimeout(() => {
    //     createRemindWindow()
    // }, 5000);

    // const window1 = new BrowserWindow({
    //     // fullscreen: true,
    //     width: 400,
    //     height: 500,
    //     webPreferences: {
    //         // preload: path.join(__dirname,'./preload.js'),
    //         nodeIntegration: true, //是否集成node
    //         contextIsolation: false, //Electron 12.0以上版本需要的额外设置此项
    //         enableRemoteModule: true
    //     }
    // })

    // // require('devtron').install()
    // // window.webContents.openDevTools()
    
    // const web1 = window1.webContents
    // // console.log(web1);
    // window1.loadFile(path.join(__dirname,'./index2.html'))

    // setTimeout(() => {
    //     web.send('setTask', '主进程来的值123')
    // }, 5000);
    // const window1 = new BrowserWindow({
    //     // useContentSize: false,
    //     center: true,
    //     // x: 0,
    //     // y: 0,
    //     width: 300,
    //     height: 300,
    //     parent: window,
    //     // parent: window,
    //     webPreferences: {
    //         nodeIntegration: true
    //     }
    // })
    // window1.webContents.openDevTools()
    // window1.loadFile('./index2.html')
}
app.whenReady().then(() => {
    createWindow()
    checkUpdate() 
    
    // console.log(process.version);
})

app.on('window-all-closed',function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})