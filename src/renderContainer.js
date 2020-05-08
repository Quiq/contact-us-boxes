export default function renderContainer() {
  const container = document.createElement('div')
  // TODO: Make this more unique and customizable
  container.id = 'contactChannelContainer'
  container.style.display = 'none'

  const shadow = document.createElement('div')
  shadow.classList.add('channelOptionShadow')
  container.appendChild(shadow)

  const buttons = document.createElement('div')
  buttons.classList.add('channelButtons')
  container.appendChild(buttons)

  document.body.appendChild(container)
}
