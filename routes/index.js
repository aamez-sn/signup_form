const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

// /form => GET
router.get('/', (req, res, next) => {
    res.render('form', { pageTitle: 'Form', path: '/' });
});

// router.post('/signup', (req, res, next) => {
//     let formData = req.body;
//     res.render('signup', { data: formData, pageTitle: 'Signup', path: '/' });
// });

router.post('/signup', [
    check('fname', 'The firstname must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('lname', 'The lastname must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password', 'The password must have minimum 8 characters')
        .exists()
        .isLength({ min: 8 }),
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("form", {
            pageTitle: "Form",
            form: req.body,
            errors: errors.array(),
          });
          return;
    } else {
        let formData = req.body;
        res.render('signup', { data: formData, pageTitle: 'Signup', path: '/' });
    }
})

exports.routes = router;
