import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

import DataTable from 'react-data-table-component';


function App() {

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const datas = [
    {
    id: 1,
    referenceItem: 'Beetlejuice',
    referenceItemCoce: '1988',
    referenceCategoryCode:'12345'
  },
  {
    id: 2,
    referenceItem: 'Ghostbusters',
    referenceItemCoce: '1984',
    referenceCategoryCode:'12346'
  },
  {
    id: 3,
    referenceItem: 'Customvalues',
    referenceItemCoce: '1884',
    referenceCategoryCode:'12347'
  },
]


  const [searchQuery, setSearchQuery] = useState('');
  //const [filteredData, setFilteredData] = useState(data);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => { 
//     setTimeout(function(){
//       setData(datas);
//     }, 500);
//   setTimeout(function(){
//     console.log(data);
//   }, 600);
// }, []);

  useEffect(() => {
    // alert();
    const fetchData = async () => {
      try {
        const response = fetch("http://192.168.2.182:8000/reference_category/");
        alert();
        if (!response.ok) {
          throw new Error('Network response was not ok');
          
        }
        const json = await response.json();
         setTimeout(function(){
           setData(json);
         }, 500);
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
  // Filter data based on search query
  const filteredData = datas.filter(item =>
    // item.referenceItem.toLowerCase().includes(searchQuery.toLowerCase()) || 
    // item.referenceItemCoce.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // item.referenceCategoryCode.toLowerCase().includes(searchQuery.toLowerCase())

    item.referenceItem.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.referenceItemCoce.toLowerCase().includes(searchQuery.toLowerCase())
    //item.referenceCategoryCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const columns = [
  //   {
  //     name: ' Reference Item',
  //     selector: row => row.referenceItem,
  //     sortable: true,
  //   },
  //   {
  //     name: 'Reference Item Code',
  //     selector: row => row.referenceItemCoce,
  //     sortable: true,
  //   },
  //   {
  //     name: 'Reference Category Code',
  //     selector: row => row.referenceCategoryCode,
  //     sortable: true,
  //   },
  // ];

  const columns = [
    {
      name: ' Reference Item',
      selector: row => row.referenceItem,
      sortable: true,
    },
    {
      name: 'Reference Item Code',
      selector: row => row.referenceItemCoce,
      sortable: true,
    },
    // {
    //   name: 'Reference Category Code',
    //   selector: row => row.referenceCategoryCode,
    //   sortable: true,
    // },
  ];
  
  
  

  return (
    <div className='reference-item'>
      <Container className='mb-4'>
        <Row>
            <Form className="bgWhite" onSubmit={handleSubmit}>
                <h3 className="mb-4">Reference Item</h3>
                <Row>
                  <Col md={4}>
                  <FloatingLabel controlId="floatingSelect" name label="Choose a reference catagory" className="mb-4 floatSelectDsn select-label">
                    <Form.Select aria-label="Floating label select example" 
                      value={formData.name}
                      onChange={handleChange}
                    >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </Form.Select>
                  </FloatingLabel>
                  </Col>
                  <Col md={4}>
                  <FloatingLabel controlId="floatingInput" label="Reference Item" className="mb-4 floatInputDsn">
                          <Form.Control type="text" placeholder="" 
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                  </Col>
                  <Col md={4}>
                  <FloatingLabel controlId="floatingInput" label="Reference Item Code" className="mb-4 floatInputDsn">
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                  </Col>		
                </Row>
                <Row  className="justify-content-md-end">			
                  <Col md="auto">
                  <button type="submit"  className="btn-green">Insert</button>
                  </Col>
                  <Col md="auto">
                  <button type="button" className="btn-green-2" disabled>Clear</button>
                  </Col>
                </Row>
              </Form>
          </Row>
      </Container>

      <Container>
          
          <Row className='align-items-center'>
            <Col xs={3}>
                <h2>Reference item details</h2>
              </Col>
            <Col xs={3} className='ms-auto mb-4'>
              <Form>
                <Form.Control 
                    type="search" 
                    placeholder="Search" 
                    required  
                    name='search'
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                </Form>
            </Col>
          </Row>
          <Row>
              <DataTable 
                columns={columns}
                data={filteredData}
                pagination 
              />
          </Row>
      </Container>
    </div>
  )
}

export default App;