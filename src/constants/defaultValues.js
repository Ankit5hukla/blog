export const encryptionSalt = 'QcoF9wH50&2VR5HNWzePz&Dkc@K7D2'

export const api = {
  protocol: 'https',
  domain: 'evolve-blogs.herokuapp.com',
}

export const apiURL = `${api.protocol}://${api.domain}`

export const appRoot = '/'

export const userStorageKey = 'appUser'

export const editorConfig = {
  branding: false,
  selector: 'textarea',
  resize: false,
  placeholder: 'Type here...',
  min_height: 250,
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
    'autoresize',
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
