import isMobile from './isMobile'
import renderContainer from './renderContainer'
import renderMainButton from './renderMainButton'
import renderFacebookMessengerIcon from './renderFacebookMessengerIcon'
import importAppleScript from './importAppleScript'
import './styles.css'

var webchatLaunched = false

var config = {}

var launchWebchat = function () {
  webchatLaunched = true
  document.querySelector('#contactUsButton').style.display = 'none'
  document.querySelector('#contactChannelContainer').style.display = 'none'
}

var _appendModalStuff = function (element, modalName) {
  element.dataset.toggle = 'modal'
  element.dataset.target = '.' + modalName
}

var _wrapInLinkTag = function (element, href) {
  var buttonLink = document.createElement('a')
  buttonLink.href = href
  buttonLink.target = '_blank'
  buttonLink.rel = 'noopener'
  buttonLink.appendChild(element)

  return buttonLink
}

var _renderAnimationContainer = function (i) {
  var container = document.createElement('div')
  container.classList.add('channelButtonIn')
  container.classList.add('channelButtonIn-' + i)
  return container
}

var _renderIconContainer = function (icon) {
  var container = document.createElement('div')
  container.classList.add('channelIcon')
  container.appendChild(icon)
  return container
}

var _renderText = function (text) {
  var container = document.createElement('div')
  container.classList.add('channelLabel')
  container.appendChild(document.createTextNode(text))
  return container
}

var _renderBasicButton = function (i, id, imgUrl, text) {
  var button = document.createElement('div')
  button.id = id
  button.classList.add('channelButton')

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

var _renderSms = function (i) {
  var button = _renderBasicButton(
    i,
    'smsButton',
    'https://www.quiq-cdn.com/wp-content/uploads/2018/08/SMS_white_150px.png',
    'SMS/Text',
  )

  // Always using sms link until we can make our own modal stuff
  return _wrapInLinkTag(button, 'sms:+' + config.sms.phoneNumber)

  // if (isMobile()) {
  //   // If we're on a phone, this should just be an sms link
  //   return _wrapInLinkTag(button, "sms:+" + config.sms.phoneNumber);
  // } else {
  //   // Not in a phone, append WP stuff to show the modal for the phone number
  //   _appendModalStuff(button, "smsmodal");
  //   return button;
  // }
}

var _renderWebchat = function (i) {
  var button = _renderBasicButton(
    i,
    'webchatButton',
    'https://www.quiq-cdn.com/wp-content/uploads/2018/08/webchat-white.png',
    'Web Chat',
  )

  button.onclick = launchWebchat
  return button
}

var _renderFacebook = function (i) {
  var button = document.createElement('div')
  button.id = 'facebookButton'
  button.classList.add('channelButton')

  var img = renderFacebookMessengerIcon()

  var spacer = document.createElement('div')
  spacer.style.width = '50px'
  spacer.style.textAlign = 'center'
  spacer.appendChild(img)
  var icon = _renderIconContainer(spacer)
  var text = _renderText('Facebook Messenger')

  button.appendChild(icon)
  button.appendChild(text)

  var buttonLink = _wrapInLinkTag(button, 'https://www.messenger.com/t/' + config.facebook.id)

  var parent = _renderAnimationContainer(i)
  parent.appendChild(buttonLink)

  return parent
}

var _renderAbc = function (i) {
  var button = document.createElement('div')
  button.id = 'abcButton'
  button.classList.add('channelButton')

  var icon = document.createElement('div')
  icon.classList.add('apple-business-chat-message-container')
  icon.dataset.appleIconBackgroundColor = '#ffffff'
  icon.dataset.appleIconColor = '#6e7883'
  icon.dataset.appleBusinessId = config.abc.appleBusinessId

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
    'https://bcrw.apple.com/urn:biz:' + config.abc.appleBusinessId,
  )

  var parent = _renderAnimationContainer(i)
  parent.appendChild(buttonLink)

  return parent
}

var _renderAutoPopMessage = function (message) {
  var bubble = document.createElement('div')
  bubble.classList.add('autoPopBubble')
  bubble.appendChild(document.createTextNode(message))

  return bubble
}

var _timeout = undefined

const toggle = function () {
  var container = document.querySelector('#contactChannelContainer')
  var chatButton = document.querySelector('#contactUsButton')
  var open = container.style.display !== 'none'

  if (_timeout) {
    clearTimeout(_timeout)
  }

  document.querySelectorAll('#contactUsButton .autoPopBubble').forEach(function (bubble) {
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

const QuiqContactUs = {
  configure: function (configuration) {
    config = configuration
  },
  render: async function (channels) {
    renderContainer()
    renderMainButton({toggle})
    await importAppleScript()
    var container = document.querySelector('#contactChannelContainer .channelButtons')
    var totalChannels = (channels || []).length

    ;(channels || []).forEach(function (channel, i) {
      var button
      switch (channel) {
        case 'sms':
          if (config.sms && config.sms.phoneNumber) {
            button = _renderSms(totalChannels - i - 1)
          }
          break
        case 'webchat':
          if (!isMobile()) {
            button = _renderWebchat(totalChannels - i - 1)
          }
          break
        case 'facebook':
          if (config.facebook && config.facebook.id) {
            button = _renderFacebook(totalChannels - i - 1)
          }
          break
        case 'abc':
          if (config.abc && config.abc.appleBusinessId && window.appleBusinessChat.isSupported()) {
            button = _renderAbc(totalChannels - i - 1)
          }
          break
      }

      if (button) {
        container.appendChild(button)
      }
      window.appleBusinessChat.refresh()
    })
  },
  toggle,
  close: function () {
    var container = document.querySelector('#contactChannelContainer')
    container.style.display = 'none'
  },
  launchWebchat: launchWebchat,
  autoPop: function (message, timeout) {
    if (_timeout) {
      clearTimeout(_timeout)
    }

    _timeout = setTimeout(function () {
      var container = document.getElementById('contactUsButton')

      container.appendChild(_renderAutoPopMessage(message))
    }, timeout)
  },
}

window['QuiqContactUs'] = QuiqContactUs
export default QuiqContactUs
