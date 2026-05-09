import React, { StrictMode,lazy,Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import Loading from './components/Loading.jsx'
import ErrorPage from './page/errorPage.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'


const Standard = lazy(() => import('./page/standard.jsx'));
const Age = lazy(() => import('./page/age.jsx'));
const Percentage = lazy(() => import('./page/percentage.jsx'));
const Length = lazy(() => import('./page/length.jsx'));
const Weight = lazy(() => import('./page/weight.jsx'));
const Time = lazy(() => import('./page/time.jsx'));
const Setting = lazy(() => import('./page/setting.jsx'));


const router = createBrowserRouter([

  {  path:"/", element: <Standard/>,  errorElement: <ErrorPage/> },   
  {  path:"age", element: <Age/> },  
  {  path:"percentage", element: <Percentage/> },  
  {  path:"length", element: <Length/> }, 
  {  path:"weight", element: <Weight/> }, 
  {  path:"time", element: <Time/> }, 
  {  path:"setting",  element: <Setting/> }, 
 
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider>
        <Suspense fallback={<Loading />}>
              <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
  </StrictMode>,
)
