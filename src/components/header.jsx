import './header.css'
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { PiCalculatorThin } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { TbPercentage } from "react-icons/tb";
import { FaPerson } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { TfiRuler } from "react-icons/tfi";
import { IoMdTime } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";


 const Header = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    };

    const sidebarRef = useRef(null);
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsSidebarVisible(false);
        }
      };

        document.addEventListener('mousedown', handleClickOutside);

  
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []); 
    
    

    return(
        <div className="header-container" ref={sidebarRef} >

            <span className='menu' onClick={toggleSidebar}>
            <IoMenu  />            
            </span>      

            {/* dim overlay */}
            <div
              className={`sidebar-overlay ${isSidebarVisible ? "visible" : ""}`}
              onClick={toggleSidebar}
            />      


            <div className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>

            <ul>
                <li className='close-sidebar' onClick={toggleSidebar} > <IoCloseOutline className='close-icon' />  </li>
                <li style={{fontWeight:"600"}}>  Calculator </li>
                <Link to="/" onClick={toggleSidebar}><li> <PiCalculatorThin className='icons' /> Standard calc </li></Link>
               
                <Link to="/percentage" onClick={toggleSidebar}>    <li> <TbPercentage     className='icons' /> Percentage Calc </li> </Link> 
                <Link to="/age" onClick={toggleSidebar}><li> <FaPerson   className='icons' />  Age Calc </li> </Link> 
                  <li style={{fontWeight:"600"}}>  Converter </li>
                                    
                  <Link to="/length" onClick={toggleSidebar}><li> <TfiRuler  className='icons' /> Length </li></Link> 
                  <Link to="/weight" onClick={toggleSidebar}><li> <GiWeightLiftingUp  className='icons' /> Weight and Mass </li> </Link> 
                  <Link to="/time"  onClick={toggleSidebar}><li> <IoMdTime  className='icons' /> Times </li>  </Link>                    
                                        
            </ul>

            <ul  className='settings'>
                <Link to="/setting" onClick={toggleSidebar}  >         <li> <CiSettings  className='icons' /> Settings </li>   </Link> 
            </ul> 

            </div>  
                 

        </div>
    )
}; export default Header