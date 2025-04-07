import validateConfiguration from '../validateConfiguration'
test('Setting both contactPoint and pageConfigurationId throws error', () => {
  const configuration = {
    channels: {
      webchat: {
        tenant: 'nate',
        options: {contactPoint: 'default', pageConfigurationId: 'test-configuration'},
      },
    },
    order: ['webchat'],
  }
  expect(() => validateConfiguration(configuration)).toThrowError(
    "Both contactPoint and pageConfigurationId are set, but it's only valid to set one or the other. \nPlease set pageConfigurationId to use the current version of chat or contactPoint if you're using legacy webchat.",
  )
})
