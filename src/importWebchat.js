export default function importWebchat({tenant, options}) {
  return new Promise((resolve) => {
    const shouldLoadV2 = !!options.pageConfigurationId

    const script = document.createElement('script')
    script.setAttribute(
      'src',
      `https://${tenant}.quiq-api.com/app/${shouldLoadV2 ? 'chat-ui' : 'webchat'}/index.js`,
    )
    script.setAttribute('charset', 'UTF-8')
    script.onload = () => {
      resolve(Quiq(options))
    }
    document.body.appendChild(script)
  })
}
