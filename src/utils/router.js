import React, { Suspense } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { Menu } from 'antd'
import PrivateRoute from '@/components/PrivateRoute'
import PrivateMenuItem from '@/components/PrivateMenuItem'

export function formatRoutes(routes, parent = '/') {
  return routes.reduce(
    (router, route) => {
      if (route.component) {
        router.routes.push({
          path: route.path.startsWith('/') ? route.path : `${parent}/${route.path}`.replace(/\/+/, '/'),
          exact: route.exact,
          strict: route.strict,
          component: route.component,
          // 是否放在menu中
          menu: route.menu,
          needAuth: route.needAuth
        })
      } else if (route.redirect) {
        router.redirects.push({
          from: route.path,
          exact: true,
          to: route.redirect
        })
      }
      if (route.routes) {
        const { routes, redirects } = formatRoutes(route.routes, route.path)
        router.routes.push(...routes)
        router.redirects.push(...redirects)
      }
      return router
    },
    { redirects: [], routes: [] }
  )
}

export function renderRoutes(router) {
  return (
    <Suspense fallback={null}>
      <Switch>
        {router.redirects.map((route, i) => <Redirect key={`redirect-${i}`} {...route} />)}
        {router.routes.map(({ path, component, needAuth, ...route }, i) => {
          const Component = needAuth ? PrivateRoute : Route
          return <Component key={`routes-${i}`} path={path} component={component} {...route} />
        })}
      </Switch>
    </Suspense>
  )
}

export function renderMenus(router) {
  return router.routes
    .filter(({ menu = true }) => menu)
    .map(({ path, needAuth = false }) => {
      const match = path.match(/\/([^/]+)$/)
      const Component = needAuth ? PrivateMenuItem : Menu.Item
      return (
        <Component key={path}>
          <Link to={path}>{match ? match[1] : ''}</Link>
        </Component>
      )
    })
}
