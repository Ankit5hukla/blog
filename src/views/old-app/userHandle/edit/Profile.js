import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Form } from 'react-bootstrap'

const Profile = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  })

  const files = acceptedFiles.map(file => (
    <p key={file.path}>
      {file.path} - {file.size} bytes
    </p>
  ))

  return (
    <fieldset className={'border p-2'}>
      <legend className={'w-auto float-none mb-0 px-3'}>Profile</legend>
      <Form.Group className={'mb-3'}>
        <Form.Label>Header Image</Form.Label>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop header image here</p>
        </div>
      </Form.Group>
      {files}
      <Form.Group className={'mb-3'}>
        <Form.Label>Profile Photo</Form.Label>
        <div {...getRootProps({ className: 'dropzone avatar' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop avatar here</p>
        </div>
      </Form.Group>
    </fieldset>
  )
}

export default Profile
