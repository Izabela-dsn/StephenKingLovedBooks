// get inputs

const formNameBook = document.querySelector("#formName")
const inputNameBook = document.querySelector("#search")
const btnInputSearch = document.querySelector("#btnSearch")
const displayBookArea = document.querySelector(".books")
let dataBooks = null
let books = null

const getDataOfApi = async () => {
  if (!dataBooks) {
    try {
      const response = await axios.get(
        `https://stephen-king-api.onrender.com/api/books`
      )
      dataBooks = response.data.data
      return dataBooks
    } catch (error) {
      console.log("error: ", error)
    }
  }
  return dataBooks
}

btnInputSearch.addEventListener("click", async (e) => {
  e.preventDefault()
  let nameOfTheBookInput = inputNameBook.value.toLowerCase()
  try {
    let result = await getDataOfApi()
    books = findBook(nameOfTheBookInput, result)
    displayBookArea.innerHTML = ""
    renderSearch(books)
  } catch (error) {
    console.log("error: ", error)
  }
})

const findBook = (name, dataBook) => {
  const book = dataBook.filter((data) =>
    data.Title.toLowerCase().includes(name)
  )
  return book
}

const findBookCover = (param) => {
  console.log(param)
  //will return a img
}
const renderSearch = (books) => {
  //will get the name and img and will render on screen
  books.forEach((book) => {
    let img = findBookCover(book.ISBN)
    const card = `
      <div class="cardBook">
        <div class="headerCard">
          <img class="bookCover" src="./assets/image.svg" alt="" />
          <label for="selectCard">
            <img class="favoriteIcon" src="./assets/heart-outline.svg" alt="" />
            <input
              type="checkbox"
              name="card"
              id="selectCard"
              aria-label="favorite"
            />
          </label>
        </div>
        <div class="footerCard">
          <p class="nameOfTheBook">${book.Title}</p>
        </div>
      </div>
    `
    displayBookArea.innerHTML += card
  })
}

const saveFavoriteBook = () => {
  //save on local storage and handle the heart 'state'
}
