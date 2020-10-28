import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import * as state from './state'
import { prop, propOr } from 'ramda'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { setUserId } from 'components/App/state'

import SketchPicker from 'react-color'
import { Form, FormFooter, Label, Input } from 'components/Form'

const Editor = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const loading = useSelector(state.selectLoading) 
  const user = useSelector(state.selectEntity, { id })

  const [color, setColor] = useState(propOr('#fff', 'icon', user))
  const handleColorPicker = ({ hex }) => setColor(hex) 
  const [_, setCookie] = useCookies(['user'])
  const { register, handleSubmit, reset } = useForm()
  
  const onSubmit = data => dispatch(state.update({
    ...data,
    icon: color
  }))

  const handleSetAsDefault = () => {
    dispatch(setUserId({ id }))
    setCookie('user', id, { path: '/' })
  }

  useEffect(() => setColor(propOr(color, 'icon', user)), [user])

  useEffect(() => {
    if (user) {
      reset([
        {
          name: propOr('', 'name', user),
        }
      ])
    }
  }, [user])

  const showEditor = !loading && user

  return <>
    {
      loading && <div>Loading right now, thank you.</div>
    }
    {
      showEditor && <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input name="id" type="hidden" value={prop('id', user)} ref={register} />
          <Label>
            <span>Name:</span>
            <Input
              name="name"
              placeholder="enter user name"
              ref={register}
              defaultValue={user.name}
            />
          </Label>
          
          <Label>
            <span>Icon color:</span>
            <ColorBox color={color} />
            <SketchPicker
              color={color}
              onChange={handleColorPicker} />
          </Label>

          <FormFooter>
            <input type="submit" value="Save" />
            <br />
            <button onClick={handleSetAsDefault}>Set as default user</button>
          </FormFooter>

        </Form>

        
      </>
    }
  </>
}

export default Editor

const ColorBox = styled.div(props => `
  height: 2em;
  width: 2em;
  background-color: ${props.color};
`)