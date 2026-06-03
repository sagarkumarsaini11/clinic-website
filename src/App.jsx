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
import Recharge from './Components/Recharge/Recharge'
import OpenPatientList from './Components/OpenPatientList/OpenPatientList'
import Sidebar from './Components/Sidebar/Sidebar'
import PatientAttendance from './Components/PatientAttendance/PatientAttendance'
import ServiceCategory from './Components/ServiceCategory/ServiceCategory'
import ServicesSubCategory from './Components/ServicesSubCategory/ServicesSubCategory'
import Services from './Components/Services/Services'
import Admin from './Components/Admin/Admin'
import AddClinic from './Components/AddClinic/AddClinic'
import PreviouslyAddedClinics from './Components/PreviouslyAddedClinics/PreviouslyAddedClinics'



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

                     {/*Recharge form*/}
               <Route path="/recharge" element={<Recharge/>}/>

                       {/*Open Patientn File */}
               <Route path="/openpatientlist" element={<OpenPatientList/>}/>

                           {/* Patientn Attendance*/}
               <Route path="/attendance" element={<PatientAttendance/>}/>

                              {/* Services Category*/}
               <Route path="/category" element={<ServiceCategory/>}/>

                              {/* Services Sub-Category*/}
               <Route path="/sub-category" element={<ServicesSubCategory/>}/>

               
                              {/* Services*/}
               <Route path="/services" element={<Services/>}/>

               
                               {/* Admin panel*/}
               <Route path="/adminpanel" element={<Admin/>}/>

                                    {/* Admin Add-Clinic*/}
               <Route path="/add-clinic" element={<AddClinic/>}/>

                       {/*Previously Add-Clinic*/}
               <Route path="/previously-added-clinics" element={<PreviouslyAddedClinics/>}/>
   </Routes>
  
  )
}
    
 


export default App
