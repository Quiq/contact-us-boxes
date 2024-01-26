export default function importWebchat({tenant, options}) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.setAttribute('src', `https://${tenant}.quiq-api.com/app/chat-ui/index.js`)
    script.setAttribute('charset', 'UTF-8')
    script.onload = () => {
      resolve(Quiq(options))
    }
    document.body.appendChild(script)
  })
}
