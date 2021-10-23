export const UserRole = {
  super_admin: 1,
  admin: 2,
  instructor: 3,
  learner: 4,
}

export const defaultLang = 'en'
export const defaultDirection = 'ltr'
export const languageOptions = [
  { id: 'ar', name: 'Arabic', direction: 'rtl' },
  { id: 'en', name: 'English', direction: 'ltr' },
  { id: 'hi', name: 'Hindi', direction: 'ltr' },
]

export const encryptionSalt = 'QcoF9wH50&2VR5HNWzePz&Dkc@K7D2'

export const api = {
  protocol: 'https',
  domain: 'evolve-blogs.herokuapp.com',
}

export const apiURL = `${api.protocol}://${api.domain}`

export const appRoot = '/'
export const isAuthGuardActive = true

export const userStorageKey = 'appUser'
