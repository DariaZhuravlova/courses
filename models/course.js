const { v4: uuidv4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')

class Course {
  constructor(title, price, img) {
    this.title = title
    this.price = price
    this.img = img
    this.id = uuidv4()
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    }
  }

  static async update(course) {
    const courses = await Course.getAll()
    const idx = courses.findIndex(c => c.id === course.id)
    courses[idx] = course
    await fs.writeFile(
      path.join(__dirname, '..', 'data', 'courses.json'),
      JSON.stringify(courses)
    )
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJSON())
    await fs.writeFile(
      path.join(__dirname, '..', 'data', 'courses.json'),
      JSON.stringify(courses)
    )
  }

  static async getAll() {
    try {
      const content = await fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8')
      return JSON.parse(content)
    } catch (err) {
      if (err.code === 'ENOENT') {
        return []
      } else {
        throw err
      }
    }
  }

  static async getById(id) {
    const courses = await Course.getAll()
    return courses.find(c => c.id === id)
  }
}

module.exports = Course
