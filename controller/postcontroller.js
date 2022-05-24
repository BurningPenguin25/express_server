const response = require('./../response')

exports.getposts = (req, res) =>{
const page = [{
    "first string": 'welcome to our website'
}
]
    response.status(200, page, res )
}