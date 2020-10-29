import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import * as state from './state'
import { prop, propOr, head } from 'ramda'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'
import { selectUserId } from 'components/App/state'
import { selectList as selectGroups } from 'components/Groups/state'

import { Form, FormFooter, Label, Input } from 'components/Form'
import { Footer } from 'components/Layout'

const priorities = [1,2,3,4,5]

const Editor = () => {
  const { id } = useParams()
  
  const dispatch = useDispatch()
  
  const loading = useSelector(state.selectLoading) 
  const todo = useSelector(state.selectEntity, { id })
  const userId = useSelector(selectUserId)
  const groups = useSelector(selectGroups)

  const { register, handleSubmit,reset } = useForm()
  
  const onSubmit = data => dispatch(state.update({
    ...data,
    group: parseInt(prop('group', data)),
    user: parseInt(prop('user', data)),
  }))

  const handleCreate = () => {
    dispatch(state.create())
  }

  useEffect(() => {
    if (todo) {
      reset([
        {
          title: propOr('', 'title', todo),
          group: prop('group', todo),
          priority: 1
        }
      ])
    }
  }, [todo])

  const showEditor = !loading && todo

  return <>
    {
      loading && <div>Loading right now, thank you.</div>
    }
    {
      showEditor && <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2 style={{marginTop: 0}}>Edit Todo:</h2>
          <input name="id" type="hidden" value={prop('id', todo)} ref={register} />
          <input name="user" type="hidden" value={userId} ref={register} />
          <Label>
            <span>Title:</span>
            <Input
              name="title"
              placeholder="enter todo"
              ref={register}
              defaultValue={todo.title}
            />
          </Label>
          <Label>
            <span>Group:</span>
            <select name="group" ref={register} defaultValue={prop('group', todo)}>
              {
                groups.map(group => <option value={prop('id', group)}>{prop('name', group)}</option>)
              }
            </select>
          </Label>
          <Label>
            <span>Priority:</span>
            <select name="priority" ref={register}>
              {
                priorities.map(priority => <option value={priority}>{priority}</option>)
              }
            </select>
          </Label>
          
          <FormFooter>
            <input type="submit" value="Save" />
          </FormFooter>

        </Form>
        <Footer>
          <button
            onClick={handleCreate}>
            {`Create Todos`}
          </button>
        </Footer>
      </>
    }
  </>
}

export default Editor