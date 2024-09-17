import React, { useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ContractTemplates from "./ContractTemplates";
import ProposalTemplates from "./ProposalTemplates";


function FormManagementDashboard() {
  useEffect(() => {
    document.title = 'Template Management';
  }, []);
    
  return (
    <>
      <div className="fmDashboard secPad ">
        <button className="btn-grn-bor-2 createTemplateBtn" >Create a New Templates</button>
        <div className="fmDashboardTabGrp bgWhite">
          <Tabs defaultActiveKey={1} id="fmDashboardTab" >
            <Tab eventKey={1} title="Proposal Templates">
              <ProposalTemplates />
            </Tab>
            <Tab eventKey={2} title="Contract Templates">
              <ContractTemplates />
            </Tab>
          </Tabs>        
        </div>   
        
      </div>      
    </>
  );
}

export default FormManagementDashboard;