# femto-bookmarks
Bookmarks using 11ty, Netlify, and FaunaDB

## Bookmarklet

Bookmark this in your browser in order to add the current URL to the database and trigger a build.

```
javascript:(function()%7Bwindow.location.href%20%3D%20%60https%3A%2F%2Fbookmarks.femto.cc%2F.netlify%2Ffunctions%2Fbookmarks%3FapiKey%3D<API_KEY>%26url%3D%24%7BencodeURIComponent(window.location.href)%7D%60%7D)()
```
