import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoutes from './components/PrivateRoutes';
import ProfileInfo from './pages/ProfileInfo';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';

import UserDashboard from './pages/UserDashboard';
import UpdatePage from './pages/UpdatePage';



function App(){
    return (
<UserProvider>
        <BrowserRouter>
        <ToastContainer position = 'bottom-center' />
        <Routes >
        <Route path = '/Blog-App.github.io' element = { <Home/> } /> 
        <Route path = '/home' element = { <HomePage/> } /> 
        <Route path = '/categories/:categoryId' element = { <Categories/> } /> 


        {/* <Route path = '/'element = { < Home />}/> */}
         <Route path = '/login' element = { < Login /> } /> 
         <Route path = '/signup'  element = { < Signup /> }/>
          < Route path = '/about' element = { < About /> } />


          
           <Route path = '/postpage/:postId'  element = { < PostPage/> } />




            < Route path = '/services'  element = { < Services /> }/> 
            < Route path = '/user' element = { < PrivateRoutes /> } >
            
            <Route path = 'dashboard' element = { <UserDashboard/> } />
            <Route path = 'update-blog/:blogId' element = { <UpdatePage/> } />
            < Route path = 'profile-info' element = { < ProfileInfo /> }/> 
            </Route>

        </Routes>
         </BrowserRouter>
         </UserProvider>

    );
}

export default App;