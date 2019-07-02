const hamburger = document.getElementsByClassName('hamburger')[0]
const hamburgerImg = document.getElementsByClassName('hamburgerImg')[0]
const menuModal = document.getElementsByClassName('menuModal')[0]
const closingDiv = document.getElementsByClassName('closingDiv')[0]

closingDiv.onclick = () => {
  menuModal.style.display = 'none'
  closingDiv.style.display = 'none'
  document.body.style.overflow = 'auto'
}

const hamburgerCLick = (e) => {
  e.preventDefault()
  menuModal.style.display = 'flex'
  closingDiv.style.display = 'block'
}
hamburger.onclick = hamburgerCLick
hamburger.ontouchstart = hamburgerCLick
hamburgerImg.onclick = hamburgerCLick
hamburgerImg.ontouchstart = hamburgerCLick