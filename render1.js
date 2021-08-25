const fs = require("fs")
const {ipcRenderer} = require('electron')
// const { BrowserWindow } = require('@electron/remote')


// const fs = require('fs')
// console.log(process);
window.addEventListener('DOMContentLoaded', () => {
    console.log(window.obj);
    const div = document.getElementById('content')
    // div.innerHTML = '犀利哥'
    // fs.readFile('./data.txt',(err, data) => {
    //     div.innerHTML = data
    // })

    // const renderer = document.getElementById('renderer')
    // renderer.onclick = () => {
    //     // ipcRenderer.send('message', '这是send的 信息')
    //     ipcRenderer.sendTo('window1','toWin1', '天龙八部')
    // }
    // ipcRenderer.on('xixi',(event,data) => {
    //     div.innerHTML = data
    // })
    ipcRenderer.on('toWin1',(event,data) => {
        console.log('-----toWin1--收到');
        div.innerHTML = data
    })

// const win = new BrowserWindow({ width: 800, height: 600 })

    // console.log(win);
    // win.loadURL('https://baidu.com')
})
// window.onload = function() {
//     console.log(123);
//     const div = document.getElementById('content')
//     div.innerHTML = process.env.node
// }