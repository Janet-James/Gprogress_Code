import React, {useEffect } from "react";
import { Row, Col, FloatingLabel, Form , Container } from "react-bootstrap";

import TeamIcon from './../../dist/images/formManagementImg/team-icon.png';
import DocIcon from './../../dist/images/formManagementImg/doc.png';
import Arrow from './../../dist/images/arrow.png';

import GoogleDocsViewer from 'react-google-docs-viewer';

function CreateProposalDataPreview() {
  
  const documentURL = 'https://docs.google.com/document/d/1XNMowlujpebD-gV9zIqz9MoKxa6Dkoz3PRNmki_5mRU/view?rm=minimal';


  
  return (
    <>
      <Container className="createProposalDsn secPad">
        <div className="inner-container bgWhite">
          <Row>
            <Col md={2}>
              <h3 className="mb-4"><img src={Arrow}  width="17"/></h3>
              <div className="formDataDetails">
                <p className="dataLabel">Template Name*</p>
                <p className="dataDetail">Solar Panel</p>
              </div>
              <div className="formDataDetails">
                <p className="dataLabel">Bird to Modules*</p>
                <p className="dataDetail">Proposal</p>
              </div>
              <div className="formDataDetails">
                <p className="dataLabel">Solution*</p>
                <p className="dataDetail">Health Care </p>
              </div>
            </Col>
            <Col md={10}>
              <h3 className="mb-4">Preview Documents</h3>
              <div className="previewDocDsn">
                  <div className="content">
                    <iframe
                      src="https://docs.google.com/document/d/1XNMowlujpebD-gV9zIqz9MoKxa6Dkoz3PRNmki_5mRU/edit?rm=minimal"
                      width="100%"
                      height="700px"
                      id="myIframe"
                      mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    >
                      This is an embedded
                      <a target="_blank" href="http://office.com">
                        Microsoft Office
                      </a>{" "}
                      document, powered by{" "}
                      <a target="_blank" href="http://office.com/webapps">
                        Office Online
                      </a>

                    </iframe>
                    <div className="
                    "></div>
                      
                  </div>
              </div> 
              <Row>
                  <Col>
                      <button className="btn-grn-bor-2 mb-3" ><img src={TeamIcon} className="me-2" />Tag People</button>
                  </Col>
                  <Col md="auto">
                      <button className="btn-green-2 mb-3" >Edit</button>
                  </Col>
                  <Col md="auto">
                      <button className="btn-green mb-3" >Save</button>
                  </Col>

              </Row>

            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default CreateProposalDataPreview;
