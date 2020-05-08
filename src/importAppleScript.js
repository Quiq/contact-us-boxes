export default function importAppleScript() {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.setAttribute(
      'src',
      'https://static.cdn-apple.com/businesschat/start-chat-button/2/index.js',
    )
    script.onload = resolve
    document.body.appendChild(script)
  })
}
