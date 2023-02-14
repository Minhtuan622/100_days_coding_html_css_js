let btnCreate = document.getElementById('create')
let btnClear = document.getElementById("clear")
let btnColor = document.getElementById("input-color")
let btnErase = document.getElementById("erase")
let btnPain = document.getElementById('paint')
let widthValue = document.getElementById("width-value")
let heightValue = document.getElementById("height-value")
let gridWidh = document.getElementById("width")
let gridHeight = document.getElementById("height")
let display = document.querySelector(".display")

let events = {
  mouse: {
    down: 'mousedown',
    up: 'mouseup',
    move: 'mousemove'
  },
  touch: {
    down: 'touchstart',
    up: 'touchend',
    move: 'touchmove'
  }
}

let devicetype = ''
let draw = false
let erase = false

const istouchdevice = () => {
  try {
    document.createEvent('TouchEvent')
    devicetype = 'touch'
    return true
  } catch (e) {
    devicetype = 'mouse'
    return false
  }
}
istouchdevice()

btnCreate.addEventListener('click', ()=>{
  display.innerHTML = ''
  let count = 0
  for (let i = 0; i < gridHeight.value; i++) {
    count += 1
    let div = document.createElement('div')
    div.classList.add('gridRow')
    for (let j = 0; j < gridWidh.value; j++) {
      count += 1
      let col = document.createElement('div')
      col.classList.add('gridCol')
      col.setAttribute('id', `gridCol${count}`)
      col.addEventListener(events[devicetype].down, ()=>{
        draw = true
        if (erase) col.style.backgroundColor = 'transparent'
        else col.style.backgroundColor = btnColor.value
      })
      col.addEventListener(events[devicetype].move, (e)=>{
        let elementId = document.elementFromPoint(
          !istouchdevice() ? e.clientX : e.touches[0].clientX,
          !istouchdevice() ? e.clientY : e.touches[0].clientY
        ).id
        checker(elementId)
      })
      col.addEventListener(events[devicetype].up, () => draw = false)
      div.appendChild(col)
    }
    display.appendChild(div)
  }
})

function checker(elementId) {
  let gridCols = document.querySelectorAll('.gridCol')
  gridCols.forEach((element) => {
    if (elementId === element.id){
      if (draw && !erase) element.style.backgroundColor = btnColor.value
      else if (draw && erase) element.style.backgroundColor = 'transparent'
    }
  })
}

btnClear.addEventListener('click', () => display.innerHTML = '')
btnErase.addEventListener('click', () => erase = true)
btnPain.addEventListener('click', () => erase = false)
gridWidh.addEventListener('input', () => widthValue.innerHTML = gridWidh.value < 9 ? `0${gridWidh.value}` : gridWidh.value)
gridHeight.addEventListener('input', () => heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value)

window.onload = () => {
  gridHeight.value = 0
  gridWidh.value = 0
}
