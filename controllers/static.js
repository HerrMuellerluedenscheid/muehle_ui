var express = require('express')
var router = express.Router()

// Read assets. Thats where app.js roams, serving java script controllers.
router.use(express.static(__dirname + '/../assets'))

router.get('/', function(req, res) {
	res.sendFile('/home/marius/src/mean_example/muehle_ui/layouts/app.html')
})

module.exports = router