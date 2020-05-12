import render from '../render'
import 'regenerator-runtime/runtime'
jest.mock('../importAppleScript')
jest.mock('../importWebchat')
import importAppleScript from '../importAppleScript'
import importWebchat from '../importWebchat'
import {getByText, fireEvent} from '@testing-library/dom'
import {TestScheduler} from 'jest'

beforeEach(() => {
  importAppleScript.mockReturnValue(Promise.resolve())
  importWebchat.mockReturnValue(Promise.resolve())
  window.appleBusinessChat = {
    isSupported: () => true,
    refresh: () => {},
  }
})

afterEach(() => {
  // Remove everything when we're done
  document.getElementById('QuiqContactUsButtons').remove()
  document.getElementById('QuiqContactUsButton').remove()
  document.querySelector('.QuiqContactUs-modalContainer').remove()
})

const testConfig = {
  channels: {
    sms: {
      phoneNumber: '14065551234',
    },
    webchat: {
      tenant: 'nate',
      options: {contactPoint: 'default'},
    },
    facebook: {
      id: 'test-facebook-id',
    },
    abc: {
      appleBusinessId: 'your-apple-business-id',
    },
  },
  order: ['sms', 'facebook', 'abc', 'webchat'],
}

async function renderButtons(config) {
  render({config})
  // Wait for the external scripts to "load"
  await importAppleScript.mock.results[0].value
  await importWebchat.mock.results[0].value
}

test('rendering buttons', async () => {
  await renderButtons({...testConfig})

  expect(document.body).toMatchSnapshot()

  // Open the flyout
  document.querySelector('#QuiqContactUsButton').click()

  expect(getByText(document.body, 'SMS/Text')).not.toBe(null)
  expect(getByText(document.body, 'Facebook Messenger')).not.toBe(null)
  expect(getByText(document.body, 'Apple Business Chat')).not.toBe(null)
  expect(getByText(document.body, 'Web Chat')).not.toBe(null)

  expect(document.body).toMatchSnapshot()
})

test('showing SMS modal', async () => {
  await renderButtons({...testConfig})

  document.querySelector('#QuiqContactUsButton').click()
  fireEvent.click(getByText(document.body, 'SMS/Text'))

  const modalContainer = document.querySelector('.QuiqContactUs-modalContainer')
  expect(modalContainer.dataset.visible).toBe('true')
  expect(modalContainer).toMatchSnapshot()
})

test('custom button color', async () => {
  const config = {
    ...testConfig,
    order: ['sms'],
    styles: {
      buttonColor: 'orange',
    },
  }

  await renderButtons(config)

  expect(document.body).toMatchSnapshot()

  expect(document.getElementById('QuiqContactUsButton').style.backgroundColor).toBe('orange')
})
