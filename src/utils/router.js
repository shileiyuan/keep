import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

export const formatRoutes = (routes, parent = '/') => {
  return routes.reduce(
    (router, route) => {
      if (route.component) {
        router.routes.push({
          path: route.path.startsWith('/') ? route.path : `${parent}/${route.path}`.replace(/\/+/, '/'),
          exact: route.exact,
          strict: route.strict,
          component: route.component
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

export const renderRoutes = routes => {
  const router = formatRoutes(routes)

  return (
    <Suspense fallback={null}>
      <Switch>
        {router.redirects.map((route, i) => <Redirect key={`redirect-${i}`} {...route} />)}
        {router.routes.map(({ path, component, ...route }, i) => <Route key={`routes-${i}`} path={path} component={component} {...route} />)}
      </Switch>
    </Suspense>
  )
}
