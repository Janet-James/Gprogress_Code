import { useState  } from 'react';
//import React, { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import SiteAssesment from './Site-Assesments';
import CreateProposal from './CreateProposal';

import powerIcon from './../../dist/images/site-assessment/power-icon.svg'

function ControlledTabsExample() {
  const [key, setKey] = useState('home');

        function clickLeft() {
            setTimeout(function(){
                let container = document.querySelector('.nav-tabs');
                container.scrollTo({
                    left:container.scrollLeft - 150,
                    top: 0,
                    behavior: "smooth"
                });
            }, 50);
        }

        function clickRight() {
            setTimeout(function(){
                let container = document.querySelector('.nav-tabs');
                container.scrollTo({
                    left:container.scrollLeft + 150,
                    top: 0,
                    behavior: "smooth"
                });
                console.log(key);
            }, 50);
        }
    

  return (
    <>
        <Container className='proposal-wrap'>
            <Row className='position-relative'>
                <Col className='main-heading d-flex align-items-center'>
                    <h1>PROPOSAL Engineering</h1>
                    <div className='stage-level d-flex align-items-center'>
                        <span>1</span> 
                        <h5>Site Assessment</h5>
                        <i><img src={powerIcon} alt=''/></i>
                    </div>
                </Col>
            </Row>
            <div className='proposal-nav-bar'>
                <Row className='mx-0'>
                    <Col>
                        <button className='prev arrow-btn' onClick={() => clickLeft()}></button>
                        <Tabs
                        id="uncontrolled-tab-example"
                       
                        defaultActiveKey='siteassessment'
                        onSelect={(k) => setKey(k)}
                        className="mb-3 top-nav"
                        
                        >
                            <Tab eventKey="siteassessment" title="Site Assessment">
                                <SiteAssesment />
                            </Tab>
                            <Tab eventKey="delegation" title="Delegation" disabled>
                                Tab content for Profile
                            </Tab>
                            <Tab eventKey="analysis" title="Analysis" disabled>
                                Tab content for Contact
                            </Tab>
                            <Tab eventKey="preengineering" title="Pre-engineering" disabled>
                                Tab content for Contact
                            </Tab>
                            <Tab eventKey="createproposal" title="Create Proposal">
                                <CreateProposal />
                            </Tab>
                            <Tab eventKey="propsaldraft" title="Generate Proposal Draft" disabled>
                                Tab content for Contact
                            </Tab>
                            <Tab eventKey="proposalreview" title="Proposal Review" disabled>
                                Tab content for Contact
                            </Tab>
                            <Tab eventKey="approve" title="Approve" disabled>
                                Tab content for Contact
                            </Tab>
                            <Tab eventKey="authorise" title="Authorise" disabled>
                                Tab content for Contact
                            </Tab>
                            <Tab eventKey="releaseproposal" title="Release Proposal" disabled>
                                Tab content for Contact
                            </Tab>
                        </Tabs>
                        <button className='next arrow-btn' onClick={() => clickRight()}></button>
                    </Col>
                </Row>
            </div>
        </Container>
    </>
  );
}

export default ControlledTabsExample;