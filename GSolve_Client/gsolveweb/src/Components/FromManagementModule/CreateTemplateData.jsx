import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Row, Col, FloatingLabel, Form , Container, Modal  } from "react-bootstrap";
import Select from 'react-select';

import DocIcon from './../../dist/images/formManagementImg/doc.png';
import TeamIcon from './../../dist/images/formManagementImg/team-icon.png';
import TemplateIcon from './../../dist/images/icon/template.png';
import Bind from './../../dist/images/icon/bind.png';
import SolutionImg from './../../dist/images/icon/solution.png';
import SubSolution from './../../dist/images/icon/sub-solution.png';
import SelectImg from './../../dist/images/icon/select.png';
import Right from './../../dist/images/icon/right.png';


const tagPeopleOptions = [
  { value: 'Janet James', label: 'Janet James' },
  { value: 'Senthil', label: 'Senthil' },
  { value: 'Ben', label: 'Ben' },
  { value: 'Kevin', label: 'Kevin' },
];


function AddSubSolutionModal(props) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const handleAddSubSolutionSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError('Please enter a value');
      return;
    }
    try {
      await axios.post('http://192.168.2.73:8000/proposals/add_subsolutions/', {
        sub_solution_name: inputValue
      });
      setInputValue('');
      setError('');
      inputRef.current.focus(); // Focus back on input after submission
      // Additional success handling if needed
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >      
      <Modal.Body>
      <form onSubmit={handleAddSubSolutionSubmit}>
        <Row className="p-3">        
          <Col>          
            <Form.Group className=" floatInputDsn iconForm" controlId="floatingInput" >
              <img src={SubSolution} />
              <Form.Control type="text" placeholder="Add New Sub Solution" value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef} />
              {error && <p className="error-msg">{error}</p>}
              
            </Form.Group>
          </Col>
          <Col md="auto">
            <button type="submit" className="btn-green">Add</button>
          </Col>        
        </Row>
        </form>
      </Modal.Body>     
    </Modal>
  );
}


function CreateProposalData() {

 
  
  const [proposalTemplateName, setProposalTemplateName] = useState('');
  const [referItem, setReferItem] = useState([]);
  const [bindToModulesValue, setBindToModulesValue] = useState('');
  const [solution, setSolution] = useState([]);
  const [solutionValue, setSolutionValue] = useState([]);
  const [subSolution, setSubSolution] = useState([]);
  const [subSolutionValue, setSubSolutionValue] = useState([]);


  const [uploadDocument, setUploadDocument] = useState([]);
  const [fileNames, setFileNames] = useState([]);



  const [selectedTagPeopleOptions, setTagPeopleOptions] = useState([]);
  const handleTagPeopleChange = (selectedTagPeopleOptions) => {
    setTagPeopleOptions(selectedTagPeopleOptions);
  };



  const [addSubSolutionModalShow, setAddSubSolutionModalShow] = React.useState(false);


  

  useEffect(() => {
    axios.get('http://192.168.2.73:8000/proposals/reference_item/')
      .then(response => {
        setReferItem(response.data);
        // console.log('refer item'+response.data )
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://192.168.2.73:8000/proposals/get_solutions/')
      .then(response => {
        setSolution(response.data);
        console.log('Solution'+response.data )
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://192.168.2.73:8000/proposals/get_sub_solutions/')
      .then(response => {
        setSubSolution(response.data);
        console.log('Solution'+response.data )
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts')
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data: ', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(process.env.REACT_APP_API + '/template_mode/')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network Error');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       const modes = data.map(item => ({ id: item.id, template_mode: item.template_mode }));
  //       setTemplateModes(modes);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }, []);  

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/solar_solutions_list/')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network Error');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       const solar_solutions = data.map(item => ({ id: item.id, solar_solutions: item.solar_solutions }));
  //       setSolarSolutions(solar_solutions);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/link_google_docs_list/')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network Error');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       const names = data.map(item => item['File Name']);
  //       setFileNames(names);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }, []);

  const handleProposalTemplateNameChange = (event) => {
    setProposalTemplateName(event.target.value);
  };

  const handleBindToModulesChange = (event) => {
    setBindToModulesValue(event.target.value);
    console.log(bindToModulesValue)
  };

  const handleSolutionChange = (event) => {
    setSolutionValue(event.target.value);
    console.log(solutionValue)
  };

  const handleUploadDocumentChange = (event) => {
    setUploadDocument(event.target.value);
  };  

  const handleSubSolutionChange = (event) => {
    setSubSolutionValue(event.target.value);
    console.log(subSolutionValue)
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      proposalTemplateName,
      referItem,
      solution,
      uploadDocument
    };
    fetch('http://127.0.0.1:8000/create_new_template/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network Error');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };  

  return (
    <Container className="createProposalDsn secPad"> 
      <h2 className="mb-4 text-uppercase">Create Template </h2>
      <form onSubmit={handleSubmit} className="bgWhite">
        <Row>
          <Col xs={5}>
            <h3 className="mb-5 pb-3"> Template Management <img src={Right} alt="Arrow" width="17"/> <span className="cl-green">Create a New Template</span></h3>
            
            <Form.Group className="mb-5 floatInputDsn iconForm" controlId="floatingInput" >
              <img src={TemplateIcon} />
              <Form.Control type="text" placeholder="Template *" onChange={handleProposalTemplateNameChange} value={proposalTemplateName} />
            </Form.Group>

            <Form.Group className="mb-5  iconForm" controlId="floatingSelectBindToModules" >
              <img src={Bind} />
              <Form.Select aria-label="referItem" 
               onChange={handleBindToModulesChange} 
               //value={bindToModules}
               >
              <option disabled selected>Bind to Modules*</option>
              {/* {templateModes.map((mode, index) => (
                <option key={index} value={mode.id}>{mode.template_mode}</option>
              ))} */}
  
              {referItem.subsystems_data && referItem.subsystems_data.map((item) => (
                      <option  key={item.id} value={item.id}  >
                        {item.segment_type}
                      </option>
              ))}
              </Form.Select>
            </Form.Group>


            

            <Form.Group className="mb-5  iconForm" controlId="floatingSelectSolution" >
              <img src={SolutionImg} />
              <Form.Select aria-label="Solution" 
              onChange={handleSolutionChange} 
              >
              <option disabled selected>Solution*</option>
                {/* {solarSolutions.map((solarSolution, index) => (
                  <option key={index} value={solarSolution.id}>{solarSolution.solar_solutions}</option>
                ))} */}
                {solution.solution_list && solution.solution_list.map((item) => (
                      <option  key={item.id} value={item.id}  >
                        {item.solution_name}
                      </option>
              ))}
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-5 iconForm" controlId="" >
              <img src={SubSolution} />
              <Form.Select aria-label="Sub Solution"  onChange={handleSubSolutionChange}  >
              <option disabled selected>Sub Solution*</option>
              {subSolution.sub_solution_list &&subSolution.sub_solution_list.map((item) => (
                      <option  key={item.id} value={item.id}  >
                        {item.sub_solution_name}
                      </option>
              ))}
                
                
              </Form.Select>
              <p className="cl-green mt-1"  onClick={() => setAddSubSolutionModalShow(true)}><big>+</big> <small>Add Sub Solution</small></p>
              <AddSubSolutionModal show={addSubSolutionModalShow} onHide={() => setAddSubSolutionModalShow(false)} />
            </Form.Group>
            
            <Form.Group className="mb-5 iconForm" controlId="floatingSelectUploadDocument" >
              <img src={SelectImg} />
              <Form.Select aria-label="Upload Document"  onChange={handleUploadDocumentChange} >
              <option selected disabled>Select Google Template*</option>
                {/* {fileNames.map((fileName, index) => (
                  <option key={index} value={fileName}>{fileName}</option>
                ))}                 */}
                {referItem.sub_solution_type && referItem.sub_solution_type.map((item) => (
                      <option  key={item.id} value={item.id}  >
                        {item.sub_category}
                      </option>
              ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={7}>
            <h3 className="mb-4">Template Preview</h3>
            <div className="previewDocDsn">
              <div className="content">
                <img src={DocIcon} alt="Document Preview" />
                <p>Not Yet Uploaded</p>
              </div>
            </div>
            <Row>
              <Col>

                {/* <button type="button" className="btn-grn-bor-2 mb-3" ><img src={TeamIcon} alt="Team Icon" className="me-2" />Tag People</button> */}
                <Form.Group className="mb-5 iconForm multiSelect tagDsn" controlId="" >
                <img src={TeamIcon} />
                  <Select isMulti options={tagPeopleOptions} value={selectedTagPeopleOptions} onChange={handleTagPeopleChange} placeholder="Tag People*" />
                </Form.Group>
              </Col>
              <Col md="auto">
                <button type="submit" className="btn-green">Save</button>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>


    </Container>
  );
}

export default CreateProposalData;
