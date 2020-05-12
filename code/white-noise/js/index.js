console.log('index.js ok')
const DOC = document
let headerBtn = DOC.querySelector('.header-button'),
    headerBox = DOC.querySelector('.container-header'),
    mainBox = DOC.querySelector('.container-main'),
    moveLock = false

// 1. 监听 header-button click
headerBtn.addEventListener('click', btnMoveText, false)

// 2. 移动 和 内容 改变
function btnMoveText() {
    if (!moveLock) {
        clearTimeout()
        moveLock = true
        mainBox.style.transform = 'scale(1)'
        headerBox.style.transform = 'translateX(35vw)'
        setTimeout(() => {
            headerBtn.innerHTML = 'Back'
            headerBox.style.transform = 'translate(35vw,-25vh)'
        }, 500)
    } else {
        clearTimeout()
        moveLock = false
        headerBox.style.transform = 'translate(35vw,0vh)'
        setTimeout(() => {
            headerBtn.innerHTML = 'Listen Quiet'
            mainBox.style.transform = 'scale(0)'
            headerBox.style.transform = 'translate(0)'
        }, 500)
    }
}
