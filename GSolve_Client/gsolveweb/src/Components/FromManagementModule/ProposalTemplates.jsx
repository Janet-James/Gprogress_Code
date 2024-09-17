import React from "react";
import {Row , Col} from "react-bootstrap";
import {ProposalData} from "../../StoredData/ProposalData"

function ProposalTemplates() {    
  return (
    <>
    
    <Row>
    {ProposalData.map((data, index) => (        
        <Col md={3} key={index}>
            <div className="proposalGrp">
                <img src={data.proposalImage} className="w-100"  />
                <div className="proposalDetails" >
                    <h3>{data.templateName}</h3>
                    <p className="date">{data.date}</p>
                    <Row>
                        <Col sm={6} >
                            <div className="users mb-2">                                
                                {data.users.map((user, userIndex) => (
                                    <div key={userIndex}>
                                        <img src={user} />
                                    </div>
                                ))}                  
                            </div>                            
                        </Col>
                        <Col sm={3} xs={6}>
                            <button className="btn-grn-bor-2">Delete</button>
                        </Col>
                        <Col sm={3} xs={6}>
                            <button className="btn-green">Edit</button>
                        </Col>
                    </Row>
                </div>
            </div>         
        </Col>  
    ))}
      
     </Row>
    </>
  );
}

export default ProposalTemplates;