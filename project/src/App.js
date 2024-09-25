// src/App.js
import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Admin from './adminpanel/Adminpanel';
import BookSugguest from './components/BookSuggustion';
import ContactUser from './adminpanel/Contact-user-detaile';
import BookSugguestData from './adminpanel/BookSugust';
import NewAdd from './components/NewAdd';
import Login from './user/Login';
import Sign from './user/Sign';
import Services1 from './components/Services1';
import UserData from './adminpanel/UserData';
import Addbook from './adminpanel/Addbook';
import UserInfo from './components/UserInfo';
import Showbook from './components/Showbook';
import AdminUpdate from './adminpanel/AdminUpdate'
import ContactUpdate from './adminpanel/ContactUpdate';
import UserUpdate from './adminpanel/UserUpdate';








const App = () => {

  const user = localStorage.getItem("token");

  // console.log(user)

 


  return (
    <>
 
 
    <Router>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}

        {user && <Route path="/" exact element={<Home />} />}

       
           <Route path="/login" exact element={  <Login/>}/>
        
       
        <Route  path="/signup" exact element={<Sign/>}/>

        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/Service' element={<Services1/>}></Route>
        <Route path='/BookSugguest' element={<BookSugguest/>}></Route>
        <Route path='/NewAdd' element={<NewAdd/>}></Route>
        <Route path='/User' element={<UserInfo/>}></Route>
        <Route path='/showbook' element={<Showbook/>}></Route>
       
          <Route path="/AdminPanel" element={<Admin />} > 
            <Route path="ContactUser" element={<ContactUser />} />
            <Route path='BookSugguestData' element={<BookSugguestData/>} />
            <Route path='UserData' element={<UserData/>}></Route>
            <Route path='Addbook' element={<Addbook/>}></Route>
            <Route path='updatebook/:id/edit' element={<AdminUpdate/>}></Route>
            <Route path= 'contactupdate/:id/edit' element={<ContactUpdate/>}></Route>
            <Route path='userupdate/:id/edit' element={<UserUpdate/>}></Route>
          </Route>
                
      </Routes>
   
   
    
    </Router>
    
     </>

  );
};

export default App;



