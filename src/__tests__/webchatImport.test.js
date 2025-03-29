import render from '../render'
import 'regenerator-runtime/runtime'
import {getByText, fireEvent, waitFor} from '@testing-library/dom'
import {TestScheduler} from 'jest'

beforeEach(() => {
  window.Quiq = jest.fn()
  jest.spyOn(document.body, 'appendChild')
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

  await waitFor(() =>
    expect(document.body.appendChild).toHaveBeenCalledWith(
      expect.objectContaining({
        src: 'https://nate.quiq-api.com/app/webchat/index.js',
      }),
    ),
  )
})

test('chat 2.0 import', async () => {
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

  await waitFor(() =>
    expect(document.body.appendChild).toHaveBeenCalledWith(
      expect.objectContaining({
        src: 'https://nate.quiq-api.com/app/chat-ui/index.js',
      }),
    ),
  )
})
