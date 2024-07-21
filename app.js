// get inputs

const formNameBook = document.querySelector("#formName")
const inputNameBook = document.querySelector("#search")
const btnInputSearch = document.querySelector("#btnSearch")
const displayBookArea = document.querySelector(".books")
const loading = document.querySelector(".loading-screen")

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

const getBookCover = async (param) => {
  try {
    const response = await axios.get(
      `https://bookcover.longitood.com/bookcover/${param}`
    )
    return response.data
  } catch (error) {
    console.error("Sorry", error)
  }
}

btnInputSearch.addEventListener("click", async (e) => {
  e.preventDefault()
  let nameOfTheBookInput = inputNameBook.value.toLowerCase()

  try {
    loading.style.display = "flex"
    let result = await getDataOfApi()
    books = findBook(nameOfTheBookInput, result)

    let bookCover = await findBookCover(books)
    console.log("bc", bookCover)

    loading.style.display = "none"
    displayBookArea.innerHTML = ""
    renderSearch(books, bookCover)
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

const findBookCover = async (books) => {
  const bookCovers = []

  for (const book of books) {
    try {
      const cover = await getBookCover(book.ISBN)
      bookCovers.push(cover.url)
    } catch (error) {
      console.error("error:", error)
    }
  }
  console.log(bookCovers)
  return bookCovers
}

const renderSearch = (books, bookCover) => {
  //will get the name and img and will render on screen
  if (bookCover && books) {
    books.forEach((book, index) => {
      const card = `
      <div class="cardBook">
        <div class="headerCard">
          <img class="bookCover" src="${bookCover[index].replace(
            /"/g,
            ""
          )}" alt=${book.Title} />
          <label for="selectCard${index}">
            <img class="favoriteIcon" id="favoriteIcon${index}" src="./assets/heart-outline.svg" alt="" />
            <input
              type="checkbox"
              name="card"
              id="selectCard${index}"
              aria-label="favorite"
              class="inputFavoriteIcon"
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

    books.forEach((book, index) => {
      const favoriteInput = document.getElementById(`selectCard${index}`)
      const favoriteIcon = document.getElementById(`favoriteIcon${index}`)

      if (favoriteInput && favoriteIcon) {
        favoriteInput.addEventListener("change", () => {
          if (favoriteInput.checked) {
            favoriteIcon.src = "./assets/heart-full.svg"
          } else {
            favoriteIcon.src = "./assets/heart-outline.svg"
          }
        })
      }
    })
  } else {
    const load = `
      <div>
        <span>
          Loading...
        </span>
      </div>
    `
    displayBookArea.innerHTML = load
  }
}

const saveFavoriteBook = () => {
  //save on local storage and handle the heart 'state'
}
