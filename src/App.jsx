import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy, useContext } from 'react';
import CartContext from './components/cart-context';
import Home from './components/Home';

const Store = lazy(() => import("./components/Store"));
const RootLayout = lazy(() => import('./components/Root'));
const About = lazy(() => import('./components/About'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const AuthPage = lazy(() => import('./components/AuthPage'));

function App() {
  const ctx = useContext(CartContext);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        }>
          <RootLayout />
        </Suspense>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/store', element: ctx.isLoggedIn ? <Store /> : <AuthPage /> },
        { path: '/store/:productId', element: ctx.isLoggedIn ? <ProductDetails /> : <AuthPage /> },
        { path: '/about', element: <About /> },
        { path: '/contactus', element: <ContactUs /> },
        { path: '/auth', element: <AuthPage /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;
