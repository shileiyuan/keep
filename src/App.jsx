import React, { useEffect, lazy } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import R from 'ramda'
import 'antd/dist/antd.less'
import '@/assets/styles/index.less'
import history from '@/libs/history'
import { renderRoutes } from '@/utils/router'
import useShallowEqualSelector from '@/hooks/useShallowEqualSelector'
import store from '@/models'
import MainLayout from '@/components/MainLayout'
import Login from '@/pages/Login'

function Home() {
  const routes = [
    { path: '/', redirect: '/Demo' },
    { path: '/Demo', component: lazy(() => import('@/pages/Demo')) },
    { path: '/Tools', component: lazy(() => import('@/pages/Tools')) },
    { path: '/Tetris', component: lazy(() => import('@/pages/Tetris')) },
    { path: '/Gallery', component: lazy(() => import('@/pages/Gallery')) },
    { path: '*', component: lazy(() => import('@/pages/NotFound')) }
  ]
  const menus = R.pipe(R.slice(0, -1), R.pluck('path'))(routes)

  return (
    <MainLayout menus={menus}>
      {renderRoutes(routes)}
    </MainLayout>
  )
}

function Routes() {
  const dispatch = useDispatch()

  const { userId, isAuthed } = useShallowEqualSelector('login', ['userId', 'isAuthed'])

  useEffect(() => {
    if (!userId) {
      dispatch.login.getUserInfo()
    }
  }, [dispatch.login, userId])
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' render={props => isAuthed ? <Home {...props} /> : <Login />} />
      </Switch>
    </Router>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
