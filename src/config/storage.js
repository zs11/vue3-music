// localStorageObj
const localStorageObj = {
  set: (key, val, stringify) => {
    if (stringify) {
      val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
  },
  get: (key, parse) => {
    let val = localStorage.getItem(key)
    if (parse) {
      val = JSON.parse(val)
    }
    return val
  }
}

export {
  localStorageObj
}