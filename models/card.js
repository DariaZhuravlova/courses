const path = require('path')
const fs = require('fs')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'card.json'
)

class Card {
  static async add(course) {
    const card = await Card.fetch()

    const idx = card.courses.findIndex(c => c.id === course.id)
    const candidate = card.courses[idx]

    if (candidate) {
      // курс уже есть
      candidate.count++
      card.courses[idx] = candidate
    } else {
      // нужно добавить курс
      course.count = 1
      card.courses.push(course)
    }

    card.price += parseFloat(course.price)

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  } 

  static async remove(id) {
    const card = await Card.fetch()

    const idx = card.courses.findIndex(c => c.id === id)
    const course = card.courses[idx]

    if (!course) {
      throw new Error('Course with the provided ID not found in the card')
    }

    if (course.count === 1) {
      // удалить
      card.courses = card.courses.filter(c => c.id !== id)
    } else {
      // уменьшить количество
      card.courses[idx].count--
    }

    // Уменьшаем цену на стоимость одного экземпляра курса, а не всей позиции
    card.price -= parseFloat(course.price)

    if (card.price < 0) {
      card.price = 0  // чтобы избежать отрицательной цены
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) {
          reject(err)
        } else {
          resolve(card)
        }
      })
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) {
          if (err.code === 'ENOENT') {
            resolve({ courses: [], price: 0 }) // если файл не найден, возвращаем пустую корзину
          } else {
            reject(err)
          }
        } else {
          resolve(JSON.parse(content))
        }
      })
    })
  }
}

module.exports = Card

