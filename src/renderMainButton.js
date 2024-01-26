export default function renderMainButton({toggle, color, renderTarget, startHidden}) {
  const button = document.createElement('button')
  button.id = 'QuiqContactUsButton'
  button.onclick = () => toggle()
  button.style.backgroundColor = color || '#3f4654'
  if (startHidden) {
    button.style.display = 'none'
  }

  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  icon.setAttribute('width', '30')
  icon.setAttribute('height', '30')
  icon.setAttribute('viewBox', '0 0 576 500')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    'M416,160 C416,71.6 322.9,0 208,0 C93.1,0 0,71.6 0,160 C0,194.3 14.1,225.9 38,252 C24.6,282.2 2.5,306.2 2.2,306.5 C2.66453526e-15,308.8 -0.6,312.2 0.7,315.2 C2,318.2 4.8,320 8,320 C44.6,320 74.9,307.7 96.7,295 C128.9,310.7 167,320 208,320 C322.9,320 416,248.4 416,160 Z M538,380 C561.9,354 576,322.3 576,288 C576,221.1 522.5,163.8 446.7,139.9 C447.6,146.5 448,153.2 448,160 C448,265.9 340.3,352 208,352 C197.2,352 186.7,351.2 176.3,350.1 C207.8,407.6 281.8,448 368,448 C409,448 447.1,438.8 479.3,423 C501.1,435.7 531.4,448 568,448 C571.2,448 574.1,446.1 575.3,443.2 C576.6,440.3 576,436.9 573.8,434.5 C573.5,434.2 551.4,410.3 538,380 Z',
  )

  icon.appendChild(path)
  button.appendChild(icon)
  renderTarget.appendChild(button)
}
