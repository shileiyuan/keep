import React, { useEffect } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import 'antd/dist/antd.less'
import '@/assets/styles/index.less'
import history from '@/libs/history'
import store from '@/models'
import MainLayout from '@/components/MainLayout'
import Demo from '@/pages/Demo'
import Login from '@/pages/Login'
import Gallery from '@/pages/Gallery'

if (process.env.NODE_ENV === 'mock') {
  // require('@/mocks')
}

export default function App() {
  return (
    // <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
    // </React.StrictMode>
  )
}

function Routes() {
  const dispatch = useDispatch()

  const isAuthed = useSelector(state => state.login.isAuthed)
  const userId = useSelector(state => state.login.userId)

  useEffect(() => {
    if (!userId) {
      dispatch.login.getUserInfo()
    }
  }, [dispatch.login, userId])
  return (
    <Router history={history}>
      <Switch>
        <Route path='/Login' render={() => isAuthed ? <Redirect to='/Home' /> : <Login />} />
        <Route path='/Home' render={props => isAuthed ? <Home {...props} /> : <Redirect to='/Login' />} />
        <Route render={props => isAuthed ? <Home {...props} /> : <Redirect to='/Login' />} />
      </Switch>
    </Router>
  )
}

function Home() {
  return (
    <MainLayout>
      <Route path='/Demo' component={Demo} />
      <Route path='/Gallery' component={Gallery} />
      <Redirect path='/Home' to='/Demo' />
    </MainLayout>
  )
}
