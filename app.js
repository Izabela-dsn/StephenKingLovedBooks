// get inputs

const formNameBook = document.querySelector("#formName")
const inputNameBook = document.querySelector("#search")

formNameBook.addEventListener("submit", async (e) => {
  e.preventDefault()
  const nameOfTheBook = inputNameBook.value.toLowerCase()
  try {
    let result = await getNameOfTheBook(nameOfTheBook)
  } catch (error) {
    console.log("error: ", error)
  }
})

const getNameOfTheBook = async (name) => {
  try {
    const response = await axios.get(
      `https://stephen-king-api.onrender.com/api/books`
    )
    const dataBooks = response.data.data
    const resultSearch = findBook(name, dataBooks)
    return resultSearch
  } catch (error) {
    console.log("error: ", error)
  }
}

const findBook = (name, dataBook) => {
  const book = dataBook.filter((data) =>
    data.Title.toLowerCase().includes(name)
  )
  return book
}

const findBookCover = async (param) => {
  //will return a img
}
const renderSearch = (img, name) => {
  //will get the name and img and will render on screen
  const card = `
  <div class="cardBook">
  <div class="headerCard">
  <img class="bookCover" src="./assets/image.svg" alt="" />
  <label for="selectCard">
  <img
  class="favoriteIcon"
  src="./assets/heart-outline.svg"
  alt=""
  />
            <input
            type="checkbox"
            name="card"
            id="selectCard"
            aria-label="favorite"
            />
            </label>
            </div>
            <div class="footerCard">
            <p class="nameOfTheBook">IT, The Thing</p>
            </div>
            `
}

const saveFavoriteBook = () => {
  //save on local storage and handle the heart 'state'
}
