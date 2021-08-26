const { autoUpdater } = require('electron-updater')
const {dialog, ipcMain} = require('electron')

function checkUpdate(){
    const web = global.win.webContents
    web.send('setTask', '这是测试')
  if(process.platform == 'darwin'){  
  
    //我们使用koa-static将静态目录设置成了static文件夹，
    //所以访问http://127.0.0.1:9005/darwin，就相当于访问了static/darwin文件夹，win32同理
    autoUpdater.setFeedURL('https://github.com/liulangjun/electron-mac/releases/download/release-v1.0.0')  //设置要检测更新的路径
    
  }else{
    autoUpdater.setFeedURL('https://github.com/liulangjun/electron-mac/releases/download/release-v1.0.0')
  }
  
  //检测更新
  autoUpdater.checkForUpdates()
  
  //监听'error'事件
  autoUpdater.on('error', (err) => {
    console.log(err)
    web.send('setTask', JSON.stringify(err))
  })
  
  //监听'update-available'事件，发现有新版本时触发
  autoUpdater.on('update-available', () => {
    web.send('setTask', '发现新版本')
    console.log('found new version')
  })
  
  //默认会自动下载新版本，如果不想自动下载，设置autoUpdater.autoDownload = false
  
  //监听'update-downloaded'事件，新版本下载完成时触发
  autoUpdater.on('update-downloaded', () => {
      console.log('update-downloaded');
      web.send('setTask', '新包下载完成')
    dialog.showMessageBox({
      type: 'info',
      title: '应用更新',
      message: '发现新版本，是否更新？',
      buttons: ['是', '否']
    }).then((buttonIndex) => {
        web.send('setTask', 'confirm=------' + buttonIndex, buttonIndex === 0)
      if(buttonIndex.response == 0) {  //选择是，则退出程序，安装新版本
        autoUpdater.quitAndInstall() 
        app.quit()
      }
    })
    // const t = window.confirm('发现新版本，是否更新？')
    // if (t) {
    //     autoUpdater.quitAndInstall() 
    //     app.quit() 
    // }
  })
}

module.exports = {
    checkUpdate
}