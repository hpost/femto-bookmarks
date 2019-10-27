const rp = require('request-promise')

async function rebuildSite () {
  const request = {
    method: 'POST',
    uri: 'https://api.netlify.com/build_hooks/5db5e79df3c783b1fb6b364c',
    body: {},
    json: true
  }

  return rp(request)
    .then(res => {
      console.log('Successfully hit webhook', res)
    })
    .catch(err => {
      console.error('Error:', err)
    })
}

export default rebuildSite
