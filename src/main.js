import 'regenerator-runtime/runtime'
import validateConfiguration from './validateConfiguration'
import render from './render'
import deepmerge from 'deepmerge'

var config = {}
var rendered = false

const QuiqContactUs = {
  configure: function (configuration) {
    validateConfiguration(configuration)
    config = configuration
  },
  reconfigure(newConfig) {
    this.configure(deepmerge(config, newConfig))
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
    const container = document.querySelector('#QuiqContactUsButtons')
    const button = document.querySelector('#QuiqContactUsButton')
    const modal = document.querySelector('.QuiqContactUs-modalContainer')

    container.remove()
    button.remove()
    modal.remove()
  },
  close: function () {
    var container = document.querySelector('#QuiqContactUsButtons')
    container.style.display = 'none'
  },
}

window['QuiqContactUs'] = QuiqContactUs
export default QuiqContactUs
