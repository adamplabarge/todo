import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils'
import * as state from './state'
import { useCookies } from 'react-cookie'
import { prop } from 'ramda'
import styled from '@emotion/styled'

import SketchPicker from 'react-color'
import { Label, Input } from 'components/Form'

const Editor = ({
  id
}) => {
  const dispatch = useDispatch()
  
  const [color, setColor] = useState('#fff')
  const [cookies, setCookies] = useCookies(['user'])

  const loading = useSelector(state.selectLoading) 
  const userId = id || prop('id', cookies)
  const user = useSelector(state.selectUser, { userId })
  const handleCreateUser = () => {
    dispatch(state.create())
  }

  const handleColorPicker = ({ hex }) => setColor(hex) 

  const { register, handleSubmit } = useForm()
  const onSubmit = data => dispatch(state.setCreate({
    ...data,
    icon: color
  }))


  const showInitialCreateBtn = !id && !prop('name', cookies) && !user

  return <>
    {
      loading && <div>Loading right now, thank you.</div>
    }
    {
      showInitialCreateBtn && <button onClick={handleCreateUser}>Create Initial User</button> 
    }
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="id" type="hidden" value={prop('id', user)} ref={register} />
      <Label>
        <span>Name:</span>
        <Input name="name" placeholder="enter user name" ref={register} />
      </Label>
      
      <Label>
        <span>Icon color:</span>
        <ColorBox color={color} />
        <SketchPicker
          color={color}
          onChange={handleColorPicker} />
      </Label>

      <input type="submit" value="Save" />

    </form>
  </>
}

Editor.defaultProps = {
  id: null
}

Editor.propTypes = {
  item: PropTypes.object
}

export default Editor

const ColorBox = styled.div(props => `
  height: 2em;
  width: 2em;
  background-color: ${props.color};
`)