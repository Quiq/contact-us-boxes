/**
 * Look through the configuration for problems and log them in the console
 */
export default function validateConfiguration(config) {
  // Make sure all the included channels are configured
  config.order.forEach((channel) => {
    if (!config.channels[channel]) {
      warnLoudly(`The ${channel} channel is specified, but not configured`)
    }
  })

  // Check for 'chat' instead of 'webchat'
  if (config.channels.chat) {
    warn('"chat" was included in channels configuration. Do you mean "webchat"?')
  }
  if (config.order.includes('chat')) {
    warn('"chat" was included in order configuration. Do you mean "webchat"?')
  }

  // Check for unknown channels
  const realOrCloseChannels = ['sms', 'facebook', 'webchat', 'abc', 'chat'] // Including 'chat' because we warn above
  config.order.forEach((channel) => {
    if (!realOrCloseChannels.includes(channel)) {
      warn(`${channel} is not a valid channel, but was specified in the order`)
    }
  })
  Object.keys(config.channels).forEach((channel) => {
    if (!realOrCloseChannels.includes(channel)) {
      warn(`${channel} is not a valid channel, but was specified in the configuration`)
    }
  })

  // Channel specific validation
  if (config.channels.sms && !config.channels.sms.phoneNumber) {
    warnLoudly('phoneNumber is required when using SMS')
  }

  if (config.channels.webchat && !config.channels.webchat.tenant) {
    warnLoudly('tenant is required when using webchat')
  }
  if (config.channels.webchat && !config.channels.webchat.options) {
    warn('No webchat options were specified')
  }
  if (
    config.channels.webchat?.options?.contactPoint &&
    config.channels.webchat?.options?.pageConfigurationId
  ) {
    throw new Error(
      "Both contactPoint and pageConfigurationId are set, but it's only valid to set one or the other. \nPlease set pageConfigurationId to use the current version of chat or contactPoint if you're using legacy webchat.",
    )
  }

  if (config.channels.facebook && !config.channels.facebook.id) {
    warnLoudly('id is required when using Facebook')
  }

  if (config.channels.abc && !config.channels.abc.appleBusinessId) {
    warnLoudly('appleBusinessId is required when using ABC')
  }

  // Auto Pop
  if (config.autoPop) {
    if (!config.autoPop.message) {
      warnLoudly('You need to specify a `message` to use autoPop')
    }
    if (!config.autoPop.wait) {
      warnLoudly('You need to specify a `wait` time to use autoPop')
    }
  }
}

function warn(...message) {
  console.warn('QuiqContactUs -', ...message)
}

function warnLoudly(...message) {
  console.error('QuiqContactUs -', ...message)
}
