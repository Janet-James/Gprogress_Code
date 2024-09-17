import React from "react";
import { Router, Routes, Route, Outlet, Link, useNavigate, useLoaderData, useNavigation } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


import Header from './Components/Header/Header';
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Proposal from './Components/Proposal/Proposal'
import FormManagementDashboard from './Components/FromManagementModule/FormManagementDashboard';
import CreateTemplateData from './Components/FromManagementModule/CreateTemplateData';
import CreateTemplateDataPreview from './Components/FromManagementModule/CreateTemplateDataPreview';
import ReferenceItem from './Components/Proposal/ReferenceItem';
import CreateProposalData from './Components/Proposal/CreateProposal';
import ControlledTabsExample from './Components/Proposal/Proposal';
import ProposalData from './Components/Proposal/ProposalData';

//Test Page
import TestPage from './Components/Proposal/TestTab'

import 'bootstrap/dist/css/bootstrap.min.css';
import './dist/css/Style.css'
import './App.css';
import './dist/css/Common.css';


function PageNotFound() {
  return (
    <>
      <div className="page-not-found">
        <h1>404 Error - Page Not Found</h1>
      </div>
    </>
  )
}

function App() {
  const isLoggedInUser = localStorage.getItem('isLoggedIn');
  console.log(isLoggedInUser);

  return (
    <div className="App">
      {isLoggedInUser && (
        <Header />
      )}
        
        {isLoggedInUser ?  (
          <div className="main-container">
            <Routes>
            
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/" element={<Navigate to='/dashboard' replace={true} />} />
              <Route exact path="/login" element={<Navigate to='/dashboard' replace={true} />} />
              <Route exact path="*" element={<PageNotFound />} />
              <Route path="/proposal-engineering" element={<Proposal />} />
              <Route path='/FormManagementDashboard' element={<FormManagementDashboard />}></Route>
              <Route path='/CreateTemplateData' element={<CreateTemplateData />}></Route>
              <Route path='/CreateTemplateDataPreview' element={<CreateTemplateDataPreview />}></Route>
              <Route path="/reference-item" element={<ReferenceItem />} />
              <Route path='/create-proposal-data' element={<CreateProposalData />}></Route>
              <Route path='/proposal-data' element={<ProposalData />}></Route>
			        <Route path='/controlled-tabs-example' element={<ControlledTabsExample />}></Route>
              <Route path="/test-page" element={<TestPage />} />
            
            </Routes>
          </div>
        ): (
          <Routes>
            
              <Route exact path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to='/login' replace={true} />} />
            
          </Routes>
        )}
        
      
    </div>
  );
}

export default App;
