import render from '../render'
import 'regenerator-runtime/runtime'
import {getByText, fireEvent, waitFor} from '@testing-library/dom'
import {TestScheduler} from 'jest'

beforeEach(() => {
  window.Quiq = jest.fn()
  jest.spyOn(document.body, 'appendChild')
})

afterEach(() => {
  // delete window.Quiq
  jest.restoreAllMocks()
  document.body.innerHTML = ''
})

test('legacy webchat import', async () => {
  const testConfig = {
    channels: {
      webchat: {
        tenant: 'nate',
        options: {contactPoint: 'default'},
      },
    },
    order: ['webchat'],
  }
  render({config: testConfig})

  await waitFor(() => {
    expect(document.body.appendChild).toHaveBeenCalledWith(
      expect.objectContaining({
        src: 'https://nate.quiq-api.com/app/webchat/index.js',
      }),
    )
    fireEvent.load(document.querySelector('script'))
    expect(window.Quiq).toHaveBeenCalledWith(testConfig.channels.webchat.options)
  })
})

test('chat 2.0 import', async () => {
  window.Quiq = jest.fn()
  jest.spyOn(document.body, 'appendChild')

  const testConfig = {
    channels: {
      webchat: {
        tenant: 'nate',
        options: {pageConfigurationId: 'default'},
      },
    },
    order: ['webchat'],
  }
  render({config: testConfig})

  await waitFor(() => {
    expect(document.body.appendChild).toHaveBeenCalledWith(
      expect.objectContaining({
        src: 'https://nate.quiq-api.com/app/chat-ui/index.js',
      }),
    )
    fireEvent.load(document.querySelector('script'))
    expect(window.Quiq).toHaveBeenCalledWith(testConfig.channels.webchat.options)
  })
})
