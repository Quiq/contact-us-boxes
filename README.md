# @quiq/contact-us-boxes [![Build Status](https://travis-ci.org/Quiq/contact-us-boxes.svg?branch=master)](https://travis-ci.org/Quiq/contact-us-boxes)

Easily add buttons to your website to allow your customers to contact you on their preferred platform

Try it out at [quiq.com](https://quiq.com/)

## Getting Started

This package can be installed using UNPKG and configured with a script tag
```html
<script src="https://unpkg.com/@quiq/contact-us-boxes"></script>
<script defer>
  window.QuiqContactUs.configure({
    channels: {
      sms: {
        phoneNumber: '15558675309',
      },
      webchat: {
        tenant: 'your-tenant',
        options: {contactPoint: 'your-contact-point-id'},
      },
      facebook: {
        id: 'your-facebook-page-id',
      },
      abc: {
        appleBusinessId: 'your-apple-business-id',
      },
    },
    order: ['sms', 'facebook', 'abc', 'webchat'],
  })

  window.QuiqContactUs.render()
</script>
```

## Configuration

### `channels`
To add a channel, you need to add configuration so that the boxes point to your business.

#### `sms`

`phoneNumber` - The 11 digit phone number for your SMS endpoint (i.e. 406-555-1234 would be written as `'14065551234'`)

#### `webchat`

`tenant` - The name of your quiq tenant

`options` - Your [web chat options](https://developers.goquiq.com/docs/webchat/#/getting_started/configuration?id=setting-web-chat-options) (You can skip the rest of the webchat setup)

#### `facebook`

`id` - Your facebook page id

#### `abc`

`appleBusinessId` - The business ID you received when you registered your company with Apple for Business Chat

### `order`
The order you want your contact buttons to appear in (from top to bottom). If you don't include a channel in the order it won't show up, even if it's configured. This can be used to easily enable or disable platforms.

For example
```js
order: ['abc', 'sms', 'facebook', 'webchat']
```
