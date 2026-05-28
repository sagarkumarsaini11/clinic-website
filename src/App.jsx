import React from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Facilities from './Components/Facilities/Facilities'
import Gallery from './Components/Gallery/Gallery'
import Appointment from './Components/Appointment/Appointment'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import BranchLogin from './Components/BranchLogin/BranchLogin'
import HomePage from './Components/HomePage/HomePage'

import AddPatientForm from './Components/AddPatientForm/AddPatientForm'
import PrescriptionForm from './Components/PrescriptionForm/PrescriptionForm'




function Website() {
  return (
   
    <div>
      <Navbar />
      <Hero/>
      <Appointment/>
      <Facilities/>
      <Gallery/>
      
      <About/>
      <Contact/>
      <Footer/>
      
     
    </div>
   )    
};

function App () {
  return(
  
   <Routes>
             {/* main website */}
             <Route path="/" element={<Website/>}/>

              {/* Login */}
              <Route path="/login" element={<BranchLogin/>}/>

               {/*Homepage After login*/}
               <Route path="/homepage" element={<HomePage/>}/>

               {/*prescription form*/}
               <Route path="/prescription" element={<PrescriptionForm/>}/>

                 {/*prescription form*/}
               <Route path="/addpatient" element={<AddPatientForm/>}/>
   </Routes>
  
  )
}
    
 


export default App
