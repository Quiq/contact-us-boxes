export default function renderContainer({renderTarget}) {
  const container = document.createElement('div')
  container.id = 'QuiqContactUsButtons'
  container.style.display = 'none'

  const shadow = document.createElement('div')
  shadow.classList.add('channelOptionShadow')
  container.appendChild(shadow)

  const buttons = document.createElement('div')
  buttons.id = 'QuiqContactUsButtonsList'
  buttons.setAttribute('aria-label', 'Contact Us Buttons')
  buttons.tabIndex = -1
  buttons.role = 'region'
  buttons.classList.add('channelButtons')
  container.appendChild(buttons)

  renderTarget.appendChild(container)
}
