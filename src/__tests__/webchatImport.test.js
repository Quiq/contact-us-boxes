import render from '../render'
import 'regenerator-runtime/runtime'
import {getByText, fireEvent, waitFor} from '@testing-library/dom'
import {TestScheduler} from 'jest'

test('legacy webchat import', async () => {
  window.Quiq = jest.fn()
  jest.spyOn(document.body, 'appendChild')

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
