import 'regenerator-runtime/runtime'
import validateConfiguration from './validateConfiguration'
import render from './render'

var config = {}
var rendered = false

function updateConfig(oldConfig, newConfig) {
  let channels = Object.assign({}, oldConfig.channels, newConfig.channels)

  let styles
  if (oldConfig.styles || newConfig.styles) {
    styles = Object.assign({}, oldConfig.styles, newConfig.styles)
  }

  return Object.assign({}, oldConfig, newConfig, {channels, styles})
}

const QuiqContactUs = {
  configure: function (configuration) {
    validateConfiguration(configuration)
    config = configuration
  },
  reconfigure(newConfig) {
    this.configure(updateConfig(config, newConfig))
    if (rendered) {
      this.unrender()
      this.render()
    }
  },
  render() {
    rendered = true
    return render({config})
  },
  unrender() {
    document.querySelector('#QuiqContactUsButtons').remove()
    document.querySelector('#QuiqContactUsButton').remove()
    document.querySelector('.QuiqContactUs-modalContainer').remove()
  },
  close: function () {
    var container = document.querySelector('#QuiqContactUsButtons')
    container.style.display = 'none'
  },
}

window['QuiqContactUs'] = QuiqContactUs
export default QuiqContactUs
