export default function renderFacebookMessengerIcon() {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  icon.setAttribute('width', '45')
  icon.setAttribute('height', '45')
  icon.setAttribute('viewBox', '0 0 1000 1000')
  icon.setAttribute('enable-background', 'new 0 0 1000 1000')
  icon.setAttribute('xml:space', 'preserve')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('fill', '#ffffff')
  path.setAttribute(
    'd',
    'M499.5,103.503c-217.049,0-393.002,164.533-393.002,367.496 c0,115.46,56.945,218.482,146.002,285.854V897.5l134.118-74.394c35.754,10.009,73.646,15.389,112.882,15.389 c217.049,0,393.002-164.534,393.002-367.497S716.549,103.503,499.5,103.503z M540.891,596.308L439.247,490.714L243.5,598.967 l214.609-227.741L559.754,476.82L755.5,368.567L540.891,596.308z',
  )
  icon.appendChild(path)

  return icon
}
