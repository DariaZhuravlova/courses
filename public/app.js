document.querySelectorAll('.price').forEach(el => {
  el.textContent = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
  }).format(el.textContent)
})