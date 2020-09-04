const {check} = require('express-validator')

const songValidators = [
    check('name').not().isEmpty(),
    check('name').isString(),
    check('genre').not().isEmpty(),
    check('genre').isString(),
    check('artist').not().isEmpty(),
    check('artist').isString(),
    check('path').not().isEmpty(),
    check('path').isString(),
    check('ranking').isInt({min: 0, max:5}),
    check('length').isInt()
]

module.exports = songValidators
