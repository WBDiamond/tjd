import indexStyles from '../styles/index.css'
import modalStyles from '../styles/modal.css'
import nodeStyles from '../styles/node.css'
import sliderStyles from '../styles/slider.css'
import nodePhotos from '../public/images/nodes/*.jpg'
import coords from '../public/constants/coords'

const main = document.querySelector('main')
const modal = document.getElementById('myModal')
const span = document.getElementsByClassName('close')[0]
const closingDivs = document.getElementsByClassName('closingDiv')
const imageDiv = document.getElementsByClassName('imageDiv')[0]
const monument = document.getElementsByClassName('monument')[0]
const hamburger = document.getElementsByClassName('hamburger')[0]
const hamburgerImg = document.getElementsByClassName('hamburgerImg')[0]
const menuModal = document.getElementsByClassName('menuModal')[0]
const slider = document.getElementById('myRange')
const crossImg = document.getElementById('crossImg')

for (let i = 0; closingDivs.length > i; i++) {
  closingDivs[i].onclick = () => {
    modal.style.display = 'none'
    menuModal.style.display = 'none'
    closingDivs[i].style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}
const hamburgerCLick = (e) => {
  e.preventDefault()
  menuModal.style.display = 'flex'
  closingDivs[0].style.display = 'block'
  closingDivs[1].style.display = 'block'
}
hamburger.onclick = hamburgerCLick
hamburger.ontouchstart = hamburgerCLick
hamburgerImg.onclick = hamburgerCLick
hamburgerImg.ontouchstart = hamburgerCLick

const createModalContent = (coord, parent, closingDiv) => {
  const content = document.createElement('div')
  content.className = 'modal-content'
  const close = span.cloneNode(true)
  close.style.display = 'flex'
  close.onclick = () => {
    parent.style.display = 'none'
    closingDiv.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
  content.appendChild(close)
  const photos = []
  if (coord.picturesFolder) {
    const photoContainer = document.createElement('div')
    photoContainer.className = 'photoContainer'
    for (let i = 1; i <= coord.picturesNumber; i++) {
      const img = document.createElement('img')
      img.className = 'photo'
      img.src = nodePhotos[`${coord.picturesFolder}_${i}`]
      photos.push(img)
      photoContainer.appendChild(img)
    }
    content.appendChild(photoContainer)
  }

  if (coord.picturesNumber > 1) {
    const photoSlider = document.createElement('span')
    let currentPhoto = 0
    photoSlider.className = 'photoSlider'
    let dots = []
    for (let i = 1; i <= coord.picturesNumber; i++) {
      const dot = document.createElement('span')
      dots.push(dot)
      photoSlider.appendChild(dot)
    }
    dots.forEach((dot, i) => {
      dot.onclick = () => {
        dots.forEach((inPhotos, index) => {
          inPhotos.className = inPhotos.className.replace(' checked', '')
          photos[index].style.display = 'none'
        })
        dot.className += ' checked'
        currentPhoto = i
        photos[i].style.display = 'block'
      }
    })
    for (let i = 0; photos.length > i; i++) {
      photos[i].onclick = () => {
        dots[i === photos.length - 1 ? 0 : i + 1].click()
      }
    }

    photos[photos.length - 1].click()
    content.appendChild(photoSlider)
  }
  const textContent = document.createElement('div')
  textContent.className = 'content'
  if (coord.header) {
    const header = document.createElement('h3')
    header.textContent = coord.header
    textContent.appendChild(header)
  }

  if (coord.subHeader) {
    const header = document.createElement('h4')
    header.textContent = coord.subHeader
    textContent.appendChild(header)
  }

  if (coord.text) {
    const text = document.createElement('p')
    text.textContent = coord.text
    textContent.appendChild(text)
  }
  content.appendChild(textContent)

  return content
}

coords.forEach(coord => {
  const newModal = document.createElement('div')
  newModal.className = 'modal'
  const closingDiv = document.createElement('div')
  closingDiv.className = 'closingDiv'
  closingDiv.onclick = () => {
    newModal.style.display = 'none'
    closingDiv.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
  newModal.appendChild(closingDiv)

  const cross = document.createElement('button')
  const cloneImg = crossImg.cloneNode()
  cloneImg.style.display = 'block'
  cross.appendChild(cloneImg)
  cross.className = 'nodeButton'
  if (screen.width > 600) {
    cross.style.top = coord.top
    cross.style.left = coord.left
    cross.className += ` ${coord.picturesFolder}`
  } else {
    cross.style.top = coord.smallScreen.top
    cross.style.left = coord.smallScreen.left
  }
  cross.onclick = () => {
    const oldModal = document.querySelector('.modal')
    newModal.appendChild(createModalContent(coord, newModal, closingDiv))
    main.replaceChild(newModal, oldModal)
    newModal.style.display = 'flex'
    newModal.style.overflowX = 'hidden'
    closingDiv.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }
  cross.onmousedown = (e) => {
    mouseDown = true
    dragStart = imageDiv.scrollLeft + e.x
  }
  cross.onmousemove = (e) => {
    if (mouseDown) {
      imageDiv.scrollLeft = dragStart - e.x
      slider.value = dragStart - e.x
    }
  }
  cross.onmouseup = onMouseLeave
  cross.draggable = false
  imageDiv.appendChild(cross)
})

monument.onload = () => {
  imageDiv.scrollLeft = (monument.width - imageDiv.clientWidth) / 2
  slider.max = monument.width - imageDiv.clientWidth
  slider.value = (monument.width - imageDiv.clientWidth) / 2
}
let dragStart = 0
let mouseDown = false

slider.oninput = (e) => {
  imageDiv.scrollLeft = e.target.value
}

monument.onmousedown = (e) => {
  mouseDown = true
  dragStart = imageDiv.scrollLeft + e.x
}

monument.onmousemove = (e) => {
  if (mouseDown) {
    imageDiv.scrollLeft = dragStart - e.x
    slider.value = dragStart - e.x
  }
}

monument.ontouchstart = (e) => {
  mouseDown = true
  dragStart = imageDiv.scrollLeft + e.touches[0].clientX
}

monument.ontouchmove = (e) => {
  if (mouseDown) {
    imageDiv.scrollLeft = dragStart - e.touches[0].clientX
    slider.value = dragStart - e.touches[0].clientX
  }
}

monument.onmouseup = onMouseLeave
monument.onmouseleave = onMouseLeave
monument.onmouseout = onMouseLeave
monument.ontouchcancel = onTouchLeave
monument.ontouchend = onTouchLeave

function onMouseLeave(e) {
  if (mouseDown) {
    mouseDown = false
    imageDiv.scrollLeft = dragStart - e.x
  }
}

function onTouchLeave(e) {
  if (mouseDown) {
    mouseDown = false
    imageDiv.scrollLeft = dragStart - e.touches[0].clientX
  }
}
