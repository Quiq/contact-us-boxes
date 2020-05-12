import 'regenerator-runtime/runtime'
import validateConfiguration from './validateConfiguration'
import render from './render'

var config = {}

const QuiqContactUs = {
  configure: function (configuration) {
    validateConfiguration(configuration)
    config = configuration
  },
  render() {
    render({config})
  },
  close: function () {
    var container = document.querySelector('#QuiqContactUsButtons')
    container.style.display = 'none'
  },
}

window['QuiqContactUs'] = QuiqContactUs
export default QuiqContactUs
