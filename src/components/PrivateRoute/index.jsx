import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

export default function PrivateRoute(props) {
  const isAuthed = useSelector(state => state.login.isAuthed)
  if (!isAuthed) return null
  return <Route {...props} />
}
