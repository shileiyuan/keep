import React, { useEffect, lazy } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import 'antd/dist/antd.less'
import '@/assets/styles/index.less'
import history from '@/libs/history'
import useSelector from '@/hooks/useShallowEqualSelector'
import store from '@/models'
import MainLayout from '@/components/MainLayout'
import Login from '@/pages/Login'

function Home() {
  const dispatch = useDispatch()

  const { userId } = useSelector('login', ['userId'])

  useEffect(() => {
    if (!userId) {
      dispatch.login.getUserInfo()
    }
  }, [dispatch.login, userId])

  const routes = [
    { path: '/', redirect: '/Graph' },
    { path: '/Demo', component: lazy(() => import('@/pages/Demo')) },
    { path: '/Graph', component: lazy(() => import('@/pages/Graph')) },
    { path: '/Tools', component: lazy(() => import('@/pages/Tools')) },
    { path: '/Tetris', component: lazy(() => import('@/pages/Tetris')) },
    { path: '/Gallery', component: lazy(() => import('@/pages/Gallery')), needAuth: true },
    { path: '*', component: lazy(() => import('@/pages/NotFound')), menu: false }
  ]
  return (
    <Router history={history}>
      <Switch>
        <Route path='/Login' component={Login} exact />
        <MainLayout routes={routes} />
      </Switch>
    </Router>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}
