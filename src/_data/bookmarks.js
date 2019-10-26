const faunadb = require('faunadb')
const q = faunadb.query

const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

function getBookmarks () {
  return adminClient.query(q.Paginate(
    q.Match(
      q.Ref('indexes/all_links')
    )
  ))
    .then(response => {
      const getAllLinksDataQuery = response.data.map(ref => {
        return q.Get(ref)
      })

      return adminClient.query(getAllLinksDataQuery)
        .then(ret => { return ret })
        .catch(error => { return error })
    })
}

function mapBookmarks (data) {
  return data.map(bookmark => {
    return {
      time: new Date(bookmark.ts / 1000),
      ...bookmark.data
    }
  })
}

module.exports = async function () {
  const data = mapBookmarks(await getBookmarks())

  return data.reverse()
}
