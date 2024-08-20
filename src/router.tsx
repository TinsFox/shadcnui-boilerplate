import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { BaseLayout } from '@/components/base-layout'

import AuthenticationPage from './pages/authentication/page'
import CardsPage from './pages/cards/page'
import DashboardPage from './pages/dashboard/page'

export const routes = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        Component: () => <Navigate to="/authentication" />
      },

      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'cards',
        element: <CardsPage></CardsPage>
      }
    ]
  },
  {
    path: 'authentication',
    element: <AuthenticationPage />
  },
  {
    path: '/404',
    lazy: () => import('./pages/404')
  },
  {
    path: '*',
    lazy: () => import('./pages/404')
  }
] satisfies [RouteObject, ...RouteObject[]]

export const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true
  }
})
