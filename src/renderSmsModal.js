function formatNumber(smsNumber) {
  const numbers = smsNumber.replace(/\D/g, '')
  if (numbers.length !== 11) {
    console.warn('Skipping auto formatting of number for SMS modal')
    return smsNumber
  }

  return `${numbers.slice(1, 4)}-${numbers.slice(4, 7)}-${numbers.slice(7, 11)}`
}

export function showSmsModal() {
  const container = document.getElementById('QuiqContactUsSmsModal')
  container.dataset.visible = true
}

export function hideSmsModal() {
  const container = document.getElementById('QuiqContactUsSmsModal')
  container.dataset.visible = false
}

export default function renderSmsModal({smsNumber, fontFamily}) {
  var container = document.createElement('div')
  container.id = 'QuiqContactUsSmsModal'
  container.classList.add('QuiqContactUs-modalContainer')
  container.dataset.visible = false

  var modal = document.createElement('div')
  modal.classList.add('QuiqContactUs-modal')

  var closeButton = document.createElement('button')
  closeButton.classList.add('QuiqContactUs-modalClose')
  closeButton.innerText = '×'
  closeButton.onclick = hideSmsModal
  modal.appendChild(closeButton)

  var title = document.createElement('h1')
  title.classList.add('QuiqContactUs-modalTitle')
  title.style.fontFamily = fontFamily || 'Inter'
  title.innerText = 'Text Us'
  modal.appendChild(title)

  var body = document.createElement('div')
  body.style.fontFamily = fontFamily || 'Inter'
  body.classList.add('QuiqContactUs-modalBody')

  var prompt = document.createElement('p')
  prompt.classList.add('QuiqContactUs-modalPrompt')
  prompt.innerText = 'Please text us at'
  body.appendChild(prompt)

  var formattedNumber = document.createElement('p')
  formattedNumber.classList.add('QuiqContactUs-modalPrompt')
  formattedNumber.innerText = formatNumber(smsNumber)
  body.appendChild(formattedNumber)

  modal.appendChild(body)
  container.appendChild(modal)

  return container
}
