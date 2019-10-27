const rp = require('request-promise')
const cheerio = require('cheerio')

const faunadb = require('faunadb')
const q = faunadb.query
const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

async function getDetails (url) {
  return rp(url).then(html => {
    const $ = cheerio.load(html)
    const pageTitle = $('head > title').text()
    const description = $('meta[name="description"]').attr('content')

    return {
      pageTitle,
      description
    }
  })
}

async function saveBookmark (details) {
  return adminClient.query(q.Create(q.Collection('links'), { data: details }))
    .then(response => {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    })
    .catch(error => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}

export { getDetails, saveBookmark }
