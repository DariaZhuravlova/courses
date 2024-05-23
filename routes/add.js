const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  })
})

router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body.title, req.body.price, req.body.img)
    await course.save()
    res.redirect('/courses')
  } catch (error) {
    console.error('Error saving the course:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
