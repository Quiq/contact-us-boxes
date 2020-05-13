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

If you want to use a specific version rather than staying on the latest release, you can specify this in the `src` of the script tag.
```html
<script src="https://unpkg.com/@quiq/contact-us-boxes@1.2.3"></script>
```

## Actions

### `configure`
Configures the contact us boxes so that they point your customers to your contact center. (See [Configuration](#configuration))

### `render`
Causes the buttons to be added to the page

### `unrender`
Removes the buttons from the page

### `reconfigure`
Updates the configuration with the specified values. You don't need to specify the entire configuration here, only the values that are changing. If the buttons have rendered already, calling this will remove them and cause them to be rerendered with the new configuration.

This is useful if you want to set up this UI globally on your site, but want to use some different values on a specific page

## Configuration

### `channels`
To add a channel, you need to add configuration so that the boxes point to your business.

#### `sms`

`phoneNumber` - The 11 digit phone number for your SMS endpoint (i.e. 406-555-1234 would be written as `'14065551234'`)

Note: If you're on a mobile device, tapping on the box will redirect you to your phone's SMS app. If you're on desktop it will show a modal with your phone number on it

#### `webchat`

`tenant` - The name of your quiq tenant

`options` - Your [web chat options](https://developers.goquiq.com/docs/webchat/#/getting_started/configuration?id=setting-web-chat-options) (You can skip the rest of the webchat setup)

Note: This option will not show up on mobile

#### `facebook`

`id` - Your facebook page id

#### `abc`

`appleBusinessId` - The business ID you received when you registered your company with Apple for Business Chat

### `order`
The order you want your contact buttons to appear in (from top to bottom). If you don't include a channel in the order it won't show up, even if it's configured. This can be used to easily enable or disable platforms.

Note: This option will only show up if it's on a supported device

For example
```js
order: ['abc', 'sms', 'facebook', 'webchat']
```

### `styles` (Optional)
There are some minimal styling overrides you can add to help this UI fit with your branding

`buttonColor` - The color for the floating button to toggle the boxes. This can be any html color

`fontFamily` - Set the text to use the same font family as the rest of your page instead of Raleway

### `autoPop` (Optional)
Allows you to add a message to display next to the floating button at the bottom of the page after a specified delay

`message` - The message to display

`wait` - The time in ms to wait before showing the message
