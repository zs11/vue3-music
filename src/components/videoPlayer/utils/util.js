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
      if (value !== undefined) {
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

export function hasClass(el, className) {
  if (!el) return false
  if (el.classList) {
    return Array.prototype.some.call(el.classList, item => item === className)
  } else if (el.className) {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  } else {
    return false
  }
}

export function addClass(el, className) {
  if (!el) return
  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } else if (!hasClass(el, className)) {
    el.className += ' ' + className
  }
}

export function removeClass(el, className) {
  if (!el) return
  if (el.classList) {
    className.split(/\s+/g).forEach(item => {
      el.classList.remove(item)
    })
  } else if (hasClass(el, className)) {
    className.split(/\s+/g).forEach(item => {
      let reg = new RegExp('(\\s|^)' + item + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    })
  }
}

export function toggleClass(el, className) {
  if (!el) return
  className.split(/\s+/g).forEach(item => {
    if (hasClass(el, item)) {
      removeClass(el, item)
    } else {
      addClass(el, item)
    }
  })
}