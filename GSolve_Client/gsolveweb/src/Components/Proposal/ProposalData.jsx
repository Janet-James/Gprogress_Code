import React from "react";
import { Container, Row, Col, Form}from "react-bootstrap";
import GridViewIcon from './../../dist/images/icon/grid_view.png';
import ListViewIcon from './../../dist/images/icon/list_alt.png';
import KanbanViewIcon from './../../dist/images/icon/view_kanban.png';


function ProposalData () {
    return(
        <>
        <Container className=" secPad"> 
      
      <Row>
          <Col >
          <h2 className="mb-4 text-uppercase">Proposals in Pipeline </h2>
              </Col>
              <Col md="auto">
              <Form className="">
                <Form.Control 
                    type="search" 
                    placeholder="Search" 
                    required  
                    name='search' className=""
                  />
                </Form>
              </Col>
              </Row>
      
        <Row>
          <Col className="boxShadow my-4 p-4 proposalDataGrpDsn">
            <Row>
          <Col >
            <div className="viewDsn">
              <p>View by :</p>
              <ul >
                <li><img src={GridViewIcon} /></li>
                <li><img src={ListViewIcon} /></li>
                <li><img src={KanbanViewIcon} /></li>
              </ul>
            </div>
        
              </Col>
              <Col  md="auto">
              <button type="submit" class="btn-grn-bor-2">Create a New Proposal</button>
              </Col>
              <Col  md="auto">
              {/* <button type="submit" class="btn-grn-bor-2">Create a New Proposal</button> */}1223
              </Col>
              </Row>

              </Col>
              </Row>
              </Container>
        </>
    )
}

export default ProposalData;