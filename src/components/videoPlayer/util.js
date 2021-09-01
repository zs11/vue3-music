export function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

export function deepCopy(target, source) {
  if (getType(target) === 'Object' && getType(source) === 'Object') {
    Object.keys(source).forEach(key => {
      if (getType(source[key]) === 'Object') {
        if (!target[key]) {
          target[key] = source[key]
        } else {
          deepCopy(target[key], source[key])
        }
      } else if (getType(source[key]) === 'Array') {
        target[key] = getType(target[key]) === 'Array' ? target[key].concat(source[key]) : source[key]
      } else {
        target[key] = source[key]
      }
    })
    return target
  }
}

export function getDom(el = document, sel) {
  return el.querySelector(sel)
}

export function createDom(el = 'div', tpl = '', attrs = {}, cname = '') {
  let dom = document.createElement(el)
  dom.className = cname
  dom.innerHTML = tpl
  Object.keys(attrs).forEach(item => {
    const key = item
    const value = attrs[item]
    if (el === 'video' || el === 'audio') {
      if (value) {
        dom.setAttribute(key, value)
      }
    } else {
      dom.setAttribute(key, value)
    }
  })
  return dom
}

export function copyAttr(source, keys) {
  let obj = {}
  keys.forEach(key => {
    obj[key] = source[key]
  })
  return obj
}