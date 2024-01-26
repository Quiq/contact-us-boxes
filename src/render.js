import renderContainer from './renderContainer'
import renderMainButton from './renderMainButton'
import importAppleScript from './importAppleScript'
import importWebchat from './importWebchat'
import renderSmsModal, {showSmsModal} from './renderSmsModal'
import renderFacebookMessengerIcon from './renderFacebookMessengerIcon'
import renderWhatsAppIcon from './renderWhatsAppIcon'
import isMobile from './isMobile'
import './styles.scss'

var chat
// TODO: Come up with a better solution for this
var config
var _timeout = undefined

export default async function render({config: configuration, renderTarget = document.body}) {
  config = configuration
  renderContainer({renderTarget})
  renderMainButton({
    toggle,
    color: config.styles?.buttonColor,
    renderTarget,
    // Hide the button at first if chat is loaded. Otherwise there can be a weird
    // delay after selecting webchat if it's still initializing
    startHidden: !!config.order.includes('webchat'),
  })
  // Load external scripts if we need them
  await (config.order.includes('abc') ? importAppleScript() : Promise.resolve())
  chat = await (config.order.includes('webchat')
    ? importWebchat(config.channels.webchat)
    : Promise.resolve())

  window.chat = chat
  if (chat) {
    // Hide chat first. Otherwise, it will think it's supposed to be open and try to
    // set up some things too early
    chat.hide()
    // When chat initializes, see if there's a conversation in progress already.
    // If there is, just render that instead of the boxes
    chat.on('statusChanged', async (event) => {
      document.querySelector('#QuiqContactUsButton').style.display = 'none'
      if (event.data.status === 'initialized') {
        const status = (await chat.defaultWebchat.getState()).conversationStatus
        if (status === 'webchatConversationStatusActive') {
          launchWebchat()
        } else {
          document.querySelector('#QuiqContactUsButton').style.display = 'block'
        }
      }
    })
  }

  var container = document.querySelector('#QuiqContactUsButtons .channelButtons')
  var totalChannels = (config.order || []).length

  ;(config.order || []).forEach(function (channel, i) {
    var button
    switch (channel) {
      case 'sms':
        if (config.channels.sms && config.channels.sms.phoneNumber) {
          button = _renderSms(totalChannels - i - 1, renderTarget)
        }
        break
      case 'webchat':
        if (config.channels.webchat.useMobileChat || !isMobile()) {
          button = _renderWebchat(totalChannels - i - 1)
        }
        break
      case 'facebook':
        if (config.channels.facebook && config.channels.facebook.id) {
          button = _renderFacebook(totalChannels - i - 1)
        }
        break
      case 'whatsApp':
        if (config.channels.whatsApp && config.channels.whatsApp.phoneNumber) {
          button = _renderWhatsApp(totalChannels - i - 1)
        }
        break
      case 'abc':
        if (
          config.channels.abc &&
          config.channels.abc.appleBusinessId &&
          window.appleBusinessChat.isSupported()
        ) {
          button = _renderAbc(totalChannels - i - 1)
        }
        break
    }

    if (button) {
      container.appendChild(button)
    }
  })

  if (config.order.includes('abc')) {
    window.appleBusinessChat.refresh()
  }

  return {chat: chat || null}
}

function _wrapInLinkTag(element, href) {
  var buttonLink = document.createElement('a')
  buttonLink.href = href
  buttonLink.target = '_blank'
  buttonLink.rel = 'noopener'
  buttonLink.appendChild(element)

  return buttonLink
}

function _renderAnimationContainer(i) {
  var container = document.createElement('div')
  container.classList.add('channelButtonIn')
  container.classList.add('channelButtonIn-' + i)
  return container
}

function _renderIconContainer(icon) {
  var container = document.createElement('div')
  container.classList.add('channelIcon')
  container.appendChild(icon)
  return container
}

function _renderText(text) {
  var container = document.createElement('div')
  container.classList.add('channelLabel')
  container.appendChild(document.createTextNode(text))
  return container
}

function _renderBasicButton(i, id, imgUrl, text) {
  var button = document.createElement('div')
  button.id = id
  button.classList.add('channelButton')
  if (config.styles?.fontFamily) {
    button.style.fontFamily = config.styles.fontFamily
  }

  var img = document.createElement('img')
  img.src = imgUrl

  var icon = _renderIconContainer(img)
  var text = _renderText(text)

  button.appendChild(icon)
  button.appendChild(text)

  var parent = _renderAnimationContainer(i)
  parent.appendChild(button)

  return parent
}

function _renderSms(i, modalRenderTarget) {
  var button = _renderBasicButton(
    i,
    'smsButton',
    'https://www.quiq-cdn.com/wp-content/uploads/2018/08/SMS_white_150px.png',
    'SMS/Text',
  )

  if (isMobile()) {
    // If we're on a phone, this should just be an sms link
    return _wrapInLinkTag(button, 'sms:+' + config.channels.sms.phoneNumber)
  } else {
    button.onclick = showSmsModal
    const modalContainer = renderSmsModal({
      smsNumber: config.channels.sms.phoneNumber,
      fontFamily: config.styles?.fontFamily,
    })
    modalRenderTarget.appendChild(modalContainer)
    return button
  }
}

function _renderWebchat(i) {
  var button = _renderBasicButton(
    i,
    'webchatButton',
    'https://www.quiq-cdn.com/wp-content/uploads/2018/08/webchat-white.png',
    'Web Chat',
  )

  button.onclick = launchWebchat
  return button
}

function _renderFacebook(i) {
  var button = document.createElement('div')
  button.id = 'facebookButton'
  button.classList.add('channelButton')
  if (config.styles?.fontFamily) {
    button.style.fontFamily = config.styles.fontFamily
  }

  var img = renderFacebookMessengerIcon()

  var spacer = document.createElement('div')
  spacer.style.width = '50px'
  spacer.style.textAlign = 'center'
  spacer.appendChild(img)
  var icon = _renderIconContainer(spacer)
  var text = _renderText('Facebook Messenger')

  button.appendChild(icon)
  button.appendChild(text)

  var buttonLink = _wrapInLinkTag(
    button,
    'https://www.messenger.com/t/' + config.channels.facebook.id,
  )

  var parent = _renderAnimationContainer(i)
  parent.appendChild(buttonLink)

  return parent
}

function _renderWhatsApp(i) {
  var button = document.createElement('div')
  button.id = 'whatsAppButton'
  button.classList.add('channelButton')
  if (config.styles?.fontFamily) {
    button.style.fontFamily = config.styles.fontFamily
  }

  var img = renderWhatsAppIcon()

  var spacer = document.createElement('div')
  spacer.style.width = '50px'
  spacer.style.textAlign = 'center'
  spacer.appendChild(img)
  var icon = _renderIconContainer(spacer)
  var text = _renderText('WhatsApp')

  button.appendChild(icon)
  button.appendChild(text)

  var buttonLink = _wrapInLinkTag(button, 'https://wa.me/' + config.channels.whatsApp.phoneNumber)

  var parent = _renderAnimationContainer(i)
  parent.appendChild(buttonLink)

  return parent
}

function _renderAbc(i) {
  var button = document.createElement('div')
  button.id = 'abcButton'
  button.classList.add('channelButton')
  if (config.styles?.fontFamily) {
    button.style.fontFamily = config.styles.fontFamily
  }

  var icon = document.createElement('div')
  icon.classList.add('apple-business-chat-message-container')
  icon.dataset.appleIconBackgroundColor = '#ffffff'
  icon.dataset.appleIconColor = '#6e7883'
  icon.dataset.appleBusinessId = config.channels.abc.appleBusinessId

  var spacer = document.createElement('div')
  spacer.style.width = '50px'
  spacer.style.textAlign = 'center'
  spacer.appendChild(icon)
  var icon = _renderIconContainer(spacer)
  var text = _renderText('Apple Business Chat')

  button.appendChild(icon)
  button.appendChild(text)

  var buttonLink = _wrapInLinkTag(
    button,
    'https://bcrw.apple.com/urn:biz:' + config.channels.abc.appleBusinessId,
  )

  var parent = _renderAnimationContainer(i)
  parent.appendChild(buttonLink)

  return parent
}

function launchWebchat() {
  document.querySelector('#QuiqContactUsButton').style.display = 'none'
  document.querySelector('#QuiqContactUsButtons').style.display = 'none'
  document.body.classList.add('quiq-enable-chat')
  chat.show()
}

function toggle() {
  var container = document.querySelector('#QuiqContactUsButtons')
  var chatButton = document.querySelector('#QuiqContactUsButton')
  var open = container.style.display !== 'none'

  if (_timeout) {
    clearTimeout(_timeout)
  }

  document.querySelectorAll('#QuiqContactUsButton .autoPopBubble').forEach(function (bubble) {
    bubble.classList.add('animateOut')

    setTimeout(function () {
      bubble.style.display = 'none'
    }, 500)
  })

  if (open) {
    container.classList.add('channelButtonsOut')

    setTimeout(function () {
      container.classList.remove('channelButtonsOut')
      container.style.display = 'none'
    }, 700)
  } else {
    container.style.display = 'block'
  }
}

const autoPop = function () {
  if (_timeout) {
    clearTimeout(_timeout)
  }

  _timeout = setTimeout(function () {
    var container = document.getElementById('QuiqContactUsButton')

    container.appendChild(_renderAutoPopMessage(config.autoPop.message))
  }, config.autoPop.wait)
}

function _renderAutoPopMessage(message) {
  var bubble = document.createElement('div')
  bubble.classList.add('autoPopBubble')
  bubble.appendChild(document.createTextNode(message))

  return bubble
}
