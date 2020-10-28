import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import * as state from './state'
import { prop, propOr } from 'ramda'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'
import { selectUserId } from 'components/App/state'

import { Label, Input } from 'components/Form'

const Editor = () => {
  const { id } = useParams()
  
  const dispatch = useDispatch()
  
  const loading = useSelector(state.selectLoading) 
  const group = useSelector(state.selectEntity, { id })
  const userId = useSelector(selectUserId)

  const { register, handleSubmit, reset } = useForm()
  
  const onSubmit = data => dispatch(state.update({
    ...data,
  }))

  useEffect(() => {
    if (group) {
      reset([
        {
          name: propOr('', 'name', group)
        }
      ])
    }
  }, [group])

  const showEditor = !loading && group

  return <>
    {
      loading && <div>Loading right now, thank you.</div>
    }
    {
      showEditor && <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="id" type="hidden" value={prop('id', group)} ref={register} />
          <input name="user" type="hidden" value={userId} ref={register} />
          <Label>
            <span>Name:</span>
            <Input
              name="name"
              placeholder="enter group name"
              ref={register}
              defaultValue={group.name}
              value={group.name}
            />
          </Label>

          <input type="submit" value="Save" />

        </form>
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