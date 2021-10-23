import React from 'react'
import { Button } from 'src/components/Buttons'

const Legalities = () => {
  return (
    <fieldset className={'border p-2'}>
      <legend className={'w-auto float-none mb-0 px-3'}>Legalities</legend>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </fieldset>
  )
}

export default Legalities
