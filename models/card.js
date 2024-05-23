class Card {
  static async add(course) {
    const card = await Card.fetch()
    const indx = card.findIndex(c => c.id === course.id)
    if (indx >= 0) {
      card[indx].count++
    } else {
      card.push({
        ...course,
        count: 1
      })
    }
    localStorage.setItem('card', JSON.stringify(card))
  }
  static async fetch() {
    return localStorage.getItem('card')
      ? JSON.parse(localStorage.getItem('card'))
      : []
  }
}

module.exports = Card