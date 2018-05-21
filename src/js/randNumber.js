(() => {
  
  const inputMin = document.querySelector('.min')
  const inputMax = document.querySelector('.max')
  const genarateButton = document.querySelector('.generate-button')
  const result = document.querySelector('.result')

  genarateButton.addEventListener('click', () => {
    const value = generate(inputMin.value, inputMax.value)
    result.innerHTML = parseInt(value, 10)
  })

})();

const generate = (min, max) => {
  return Math.random() * (max - min) + min;
}