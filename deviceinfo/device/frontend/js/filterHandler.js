function filterHandler() {

        const filters = document.querySelectorAll(".filter")
        const tableRows = document.querySelectorAll(".data-row")

        tableRows.forEach(row => {

             counter = 0
             filters.forEach(itemFilter => {
                    let inputValue = itemFilter.value
                    let a = '.column-' + itemFilter.id
                    let element = row.querySelector(a)
                    if (element.innerHTML.indexOf(inputValue) > -1) {
                        counter++
                    }
              })
              if (counter !== filters.length) {
                    row.style.display="none"
              } else {
                    row.style.display=""
              }
        })
}