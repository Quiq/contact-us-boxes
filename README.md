# @quiq/contact-us-boxes

Easily add buttons to your website to allow your customers to contact you on their preferred platform

## Getting Started

This package can be installed using Quiq's CDN and configured with a script tag

```html
<script src="https://static.quiq-cdn.com/quiq-contact-us-boxes/index.js"></script>
<script defer>
  window.QuiqContactUs.configure({
    channels: {
      sms: {
        phoneNumber: '15558675309',
      },
      whatsApp: {
        phoneNumber: '15558675309',
      },
      webchat: {
        tenant: 'your-tenant',
        options: {pageConfigurationId: 'your-page-configuration-id'},
      },
      facebook: {
        id: 'your-facebook-page-id',
      },
      abc: {
        appleBusinessId: 'your-apple-business-id',
      },
    },
    order: ['sms', 'facebook', 'abc', 'webchat', 'whatsApp'],
  })

  window.QuiqContactUs.render()
</script>
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

`options` - Options that will be used to initialize Quiq webchat.

The recommended way to connect to your Quiq site is to add a `pageConfigurationId` that connects with Conversation Starter. However, you can still use legacy webchat by setting `contactPoint` instead.

- If you're using Conversation Starter, you can find documentation [here](https://developers.goquiq.com/docs/conversation-starter/#/reference/sdk/main)
- If you're still using legacy webchat, you can find documentation [here](https://developers.goquiq.com/docs/webchat/#/getting_started/configuration?id=setting-web-chat-options) instead.

`useMobileChat` - Whether the options will show up on mobile (default is `false`)

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

`fontFamily` - Set the text to use the same font family as the rest of your page instead of Inter

### `autoPop` (Optional)

Allows you to add a message to display next to the floating button at the bottom of the page after a specified delay

`message` - The message to display

`wait` - The time in ms to wait before showing the message

# Making changes

This package uses npm, so before doing anything you'll want to run `npm install`

## Building

Run `npm run build` to create a new bundle in the `dist/` directory.

If you run `npm run develop`, the build will be rerun whenever changes are detected in the source code.

There is also a `test.html` file in the root of the directory for manual testing. An easy way to use the test page is with the [http-server](https://www.npmjs.com/package/http-server) package from npm. You can install it globally with

```
npm install --global http-server
```

Once installed, you can start the server with

```
http-server -p 8081
```

Once the server is running, the test page can be viewed at http://localhost:8081/test.html. (You can change the port to whatever you'd like)

## Tests

You can run the tests with `npm test`.

If you want them to rerun each time you save a file, you can use `npm run jest`
