const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const courses = await Course.getAll()
    res.render('courses', {
      title: 'Курси',
      isCourses: true,
      courses
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/:id/edit', async (req, res) => {
 if (!req.query.allow) {
   return res.redirect('/')
 }
 const course = await Course.getById(req.params.id)
  res.render('course-edit', {
    title: `Редагувати курс ${course.title}`,
    course
  })
})

router.post('/edit', async (req, res) => {
  await Course.update(req.body)
  res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
   const course = await Course.getById(req.params.id)
   res.render('course', {
     layout: 'empty',
     title: `Курс ${course.title}`,
     course
   })
})

module.exports = router
