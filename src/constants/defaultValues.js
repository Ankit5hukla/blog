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

export const editorConfig = {
  branding: false,
  selector: 'textarea',
  resize: false,
  placeholder: 'Type here...',
  height: 250,
  menubar: false,
  statusbar: false,
  image_title: true,
  automatic_uploads: true,
  file_picker_types: 'image',
  paste_data_images: true,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help fullscreen',
    'code',
  ],
  fullscreen_native: true,
  toolbar:
    'undo redo | formatselect | ' +
    'bold italic underline backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | image fullscreen |' +
    'code | removeformat | help',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
}
