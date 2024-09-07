import React from "react";
import { Link} from 'react-router-dom';


const Home1 = () => {

    return(
        <>

<div className="main container">
        <div className="main1 ">
            <h1 className="main-text"> For Exclusive Range Of books At Our Library</h1>
            <button className="main-btn"> <Link to="/Newadd" className="link">Enquire Now</Link></button>
            <button className="main-btn ms-3" >   <Link to="/BookSugguest" className="link">Book Sugguest</Link>
            </button>
          
          
            <div className="main-head mb-5">
                <p>where every page is a Adventure. start your reading journey today </p>
            </div>
        </div>
       </div>
      
        </>
    )
}

export default Home1;