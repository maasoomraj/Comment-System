const router = require('express').Router()
const { viewComments, addComment, searchComment } = require('../Controllers/Comment')

router.get('/view-comments', viewComments)
router.post('/add-comment', addComment)
router.post('/search-comment', searchComment)

module.exports = router