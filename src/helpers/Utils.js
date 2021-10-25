import { AES, enc } from 'crypto-js'
import { apiURL, encryptionSalt } from 'src/constants/defaultValues'

export const isBrowser = typeof window !== 'undefined'

export const ucFirst = input => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export const stripHtml = html => {
  let tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

export const getExcerpt = (str, max = 145, suffix = '…') => {
  str = stripHtml(str)
  return str.length < max
    ? str
    : `${str.substr(
        0,
        str.substr(0, max - suffix.length).lastIndexOf(' ')
      )}${suffix}`
}

export const encrypt = (message, salt = encryptionSalt) => {
  return AES.encrypt(JSON.stringify(message), salt).toString()
}

export const decrypt = (encrypted, salt = encryptionSalt) => {
  return JSON.parse(AES.decrypt(encrypted, salt).toString(enc.Utf8))
}

export const formatDate = (date, patternStr) => {
  const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    dayOfWeekNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    twoDigitPad = num => {
      return num < 10 ? '0' + num : num
    },
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    miliseconds = date.getMilliseconds(),
    h = hour % 12,
    hh = twoDigitPad(h),
    HH = twoDigitPad(hour),
    mm = twoDigitPad(minute),
    ss = twoDigitPad(second),
    aa = hour < 12 ? 'AM' : 'PM',
    EEEE = dayOfWeekNames[date.getDay()],
    EEE = EEEE.substr(0, 3),
    dd = twoDigitPad(day),
    M = month + 1,
    MM = twoDigitPad(M),
    MMMM = monthNames[month],
    MMM = MMMM.substr(0, 3),
    yyyy = year + '',
    yy = yyyy.substr(2, 2)

  if (!patternStr) {
    patternStr = 'M/d/yyyy'
  }
  // checks to see if month name will be used
  patternStr = patternStr
    .replace('hh', hh)
    .replace('h', h)
    .replace('HH', HH)
    .replace('H', hour)
    .replace('mm', mm)
    .replace('m', minute)
    .replace('ss', ss)
    .replace('s', second)
    .replace('S', miliseconds)
    .replace('dd', dd)
    .replace('d', day)
    .replace('EEEE', EEEE)
    .replace('EEE', EEE)
    .replace('yyyy', yyyy)
    .replace('yy', yy)
    .replace('aa', aa)
  if (patternStr.indexOf('MMM') > -1) {
    patternStr = patternStr.replace('MMMM', MMMM).replace('MMM', MMM)
  } else {
    patternStr = patternStr.replace('MM', MM).replace('M', M)
  }
  return patternStr
}

export const generatePassword = (
  length = 10,
  alphabets = 'abcdefghijklmnopqrstuvwxyz',
  numbers = '0123456789',
  specials = '@$!%*?&'
) => {
  const charset = [alphabets, alphabets.toUpperCase(), numbers, specials].join(
    ''
  )
  let retVal = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  )
    ? retVal
    : generatePassword(length)
}

export const getPostImageURL = postId => {
  return `${apiURL}/post/image/${postId}`
}
