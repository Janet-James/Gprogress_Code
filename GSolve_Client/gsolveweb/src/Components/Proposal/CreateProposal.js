import React from "react";
import { useState } from 'react';
import { Row, Col, FloatingLabel, Form , Container, Button , Modal   } from "react-bootstrap";
import Select from 'react-select';

import Arrow from './../../dist/images/arrow.png';
import DocIcon from './../../dist/images/formManagementImg/doc.png';
import proposalIcon from './../../dist/images/icon/proposal.png';
import Right from './../../dist/images/icon/right.png';
import Proposal2 from './../../dist/images/icon/proposal2.png';
import Client from './../../dist/images/icon/client.png';
import TemplateIcon from './../../dist/images/icon/template.png';
import Collaborators from './../../dist/images/icon/collaborators.png';
import ExternalCollaborators from './../../dist/images/icon/external-collaborators.png';
import plusIcon from './../../dist/images/icon/plus.png';
import ownerIcon from './../../dist/images/icon/owner.png';
import reviewerIcon from './../../dist/images/icon/reviewer.png';
import approverIcon from './../../dist/images/icon/approver.png';
import userIcon from './../../dist/images/icon/user.png';
import emailIcon from './../../dist/images/icon/email.png';

const collaboratorOptions = [
  { value: 'Janet James', label: 'Janet James' },
  { value: 'Senthil', label: 'Senthil' },
  { value: 'Ben', label: 'Ben' },
  { value: 'Kevin', label: 'Kevin' },
];


const externalCollaboratorOptions = [
  { value: 'Janet James', label: 'Janet James' },
  { value: 'Senthil', label: 'Senthil' },
  { value: 'Ben', label: 'Ben' },
  { value: 'Kevin', label: 'Kevin' },
];

const tagPeople2Options = [
  { value: 'Ben', label: 'Ben' },
  { value: 'Janet James', label: 'Janet James' },
  { value: 'Senthil', label: 'Senthil' },  
  { value: 'Kevin', label: 'Kevin' },
];


function AddExternalCollaboratorModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >      
      <Modal.Body>
        <Row className="p-3">
          <Col>
            <Form.Group className=" floatInputDsn iconForm" controlId="floatingInput" >
              <img src={userIcon} />
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className=" floatInputDsn iconForm" controlId="floatingInput" >
              <img src={userIcon} />
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
          </Col>
          <Col  md="5">
            <Form.Group className=" floatInputDsn iconForm" controlId="floatingInput" >
              <img src={emailIcon} />
              <Form.Control type="text" placeholder="Email ID" />
            </Form.Group>
          </Col>
          <Col md="auto">
            <button type="submit" class="btn-green">Add</button>
          </Col>
        </Row>
      </Modal.Body>     
    </Modal>
  );
}


function CreateProposalData() {   

  const [selectedCollaboratorOptions, setCollaboratorOptions] = useState([]);

  const handleCollaboratorSelectChange = (selectedCollaboratorOptions) => {
    setCollaboratorOptions(selectedCollaboratorOptions);
  };

  const [selectedExternalOptions, setExternalOptions] = useState([]);

  const handleExternalSelectChange = (selectedExternalOptions) => {
    setExternalOptions(selectedExternalOptions);
  };


  const [selectedTagPeople2Options, setTagPeople2Options] = useState([]);
  const handleTagPeople2Change = (selectedTagPeople2Options) => {
    setTagPeople2Options(selectedTagPeople2Options);
  };


  const [addExternalCollaboratorModalShow, setAddExternalCollaboratorModalShow] = React.useState(false);
  

  return (
    <>
      <Container className="createProposalDsn secPad">
      <h2 className="mb-4 text-uppercase">Create PROPOSAL </h2>
        <div className=" bgWhite">
      <Form>
        <Row>
        
          <Col md={5}>
          <h3 className="mb-5"> Proposal Management <img src={Right} alt="Arrow" width="17"/> <span className="cl-green">Create a New Proposal</span></h3>


            <Form.Group className="mb-5 floatInputDsn iconForm" controlId="floatingInput" >
              <img src={Proposal2} />
              <Form.Control type="text" placeholder="Proposal Name*"/>
            </Form.Group>

            <Form.Group className="mb-5 iconForm" controlId="" >
              <img src={Client} />
              <Form.Select aria-label="Client" >
              <option>Client*</option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>                
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-5 iconForm" controlId="" >
              <img src={TemplateIcon} />
              <Form.Select aria-label="Choose Template" >
              <option>Choose Template*</option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>                
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-5 iconForm multiSelect" controlId="" >
            <img src={Collaborators} />
              <Select isMulti options={collaboratorOptions} value={selectedCollaboratorOptions} onChange={handleCollaboratorSelectChange} placeholder="Collaborators*" />
            </Form.Group>

            <Form.Group className="mb-5 iconForm multiSelect" controlId="" >
            <img src={ExternalCollaborators} />
              <Select isMulti options={externalCollaboratorOptions} value={selectedExternalOptions} onChange={handleExternalSelectChange} placeholder="External Collaborators*" />
              <img src={plusIcon} className="plusIconDsn" onClick={() => setAddExternalCollaboratorModalShow(true)} />
            </Form.Group>

             

             <Form.Group className="mb-5 iconForm" controlId="" >
              <img src={ownerIcon} />
              <Form.Select aria-label="Owner" >
              <option>Owner*</option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>                
              </Form.Select>
            </Form.Group>

             <Form.Group className="mb-5 iconForm" controlId="" >
              <img src={reviewerIcon} />
              <Form.Select aria-label="Reviewer" >
              <option>Reviewer*</option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>                
              </Form.Select>
            </Form.Group>   

            <Form.Group className="mb-5 iconForm" controlId="" >
              <img src={approverIcon} />
              <Form.Select aria-label="Approver" >
              <option>Approver*</option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>                
              </Form.Select>
            </Form.Group>        

           

            <AddExternalCollaboratorModal
              show={addExternalCollaboratorModalShow}
              onHide={() => setAddExternalCollaboratorModalShow(false)}
            />

            
          </Col>
          <Col md={7}>
            <h3 className="mb-4">Proposal Preview</h3>
            <div className="previewDocDsn">
                <div className="content">
                    <img src={DocIcon} />
                    <p>Not Yet Uploaded</p>
                </div>
            </div> 
            <Row>
                <Col>
                    {/* <button className="btn-grn-bor-2 mb-3" disabled><img src={proposalIcon} className="me-2" /> Proposal Engineering</button> */}
                    <Form.Group className="mb-5 iconForm multiSelect tagDsn" controlId="" >
                      <img src={proposalIcon} />
                        <Select isMulti options={tagPeople2Options} value={selectedTagPeople2Options} onChange={handleTagPeople2Change} placeholder="Proposal Engineering*" />
                    </Form.Group>
                </Col>
                <Col md="auto">
                    <button className="btn-green mb-3">Save</button>
                </Col>

            </Row>

          </Col>
          
        </Row>
        </Form>
        </div>
      </Container>
    </>
  );
}

export default CreateProposalData;
