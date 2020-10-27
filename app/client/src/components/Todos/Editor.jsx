import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as slice from './todosSlice'

const Editor = ({
  item
}) => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const onSubmit = data => dispatch(slice.setCreate(data))
  
  return <>
    <form onSubmit={handleSubmit(onSubmit)}>

      <input name="title" defaultValue="enter the task..." ref={register} />

      
    </form>
  </>
}

Editor.defaultProps = {
  item: {}
}

Editor.propTypes = {
  item: PropTypes.object
}

export default Editor