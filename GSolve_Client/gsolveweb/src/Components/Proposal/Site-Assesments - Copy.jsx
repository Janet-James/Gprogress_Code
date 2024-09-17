import { useEffect, useState  } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import PhoneInput from 'react-phone-number-input';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TabContainer from 'react-bootstrap/TabContainer';
import TabPane from 'react-bootstrap/TabPane'
import Button from 'react-bootstrap/Button';
//import GenralInformation from './General-Information';



import PlusIcon from './../../dist/images/plus-icon-green.svg'
import CalendarIcon from './../../dist/images/calendar-icon.svg'
import BuildingIcon from './../../dist/images/site-assessment/building-icon.svg'
import GroundIcon from './../../dist/images/site-assessment/ground-icon.svg'
import CarportIcon from './../../dist/images/site-assessment/carport-icon.svg'
import ElectrictyIcon from './../../dist/images/site-assessment/electricity-icon.svg'
import BatteryIcon from './../../dist/images/site-assessment/battery-icon.svg'
import EnvironmentIcon from './../../dist/images/site-assessment/environment-icon.svg'
import WeatherIcon from './../../dist/images/site-assessment/weather-icon.svg'
import LogisticIcon from './../../dist/images/site-assessment/delivery-icon.svg'



function App() {
    const [validated, setValidated] = useState(false);
    const [data, setData] = useState([]);

    const [rows, setRows] = useState([
        { id: 1, Equipment: '', EquipmentType: '', Wattage: '', Qty: '' } // Initial row
    ]);

    const [tabsCol, settabsCol] = useState([
        { eventKey: "0", title: "Room 1" },
        // Initial tabs, you can add more if needed
    ]);


    const initialFormData = useState({
        DateOfSurvey: '',
        ContactNumber1: '',
        ContactNumber2: '',
        EarthingPitVisibility: '',
    });
    tabsCol.forEach((tab, tabIndex) =>{
        rows.forEach((row, rowIndex) => {
            initialFormData[`Equipment-${tabIndex}-${rowIndex}`] = '';
            initialFormData[`EquipmentType-${tabIndex}-${rowIndex}`] = '';
            initialFormData[`Wattage-${tabIndex}-${rowIndex}`] = '';
            initialFormData[`Qty-${tabIndex}-${rowIndex}`] = '';
        });
    })

    const [formData, setFormData] = useState(initialFormData);


    const handleAddRow = () => {
        const newId = rows.length + 1;
        setRows([...rows, { id: newId, Equipment: '', EquipmentType: '', Wattage: '', Qty: '' }]);
    };
    
    const handleAddTab = () => {
        const newKey = String(tabsCol.length);
        const newTitle = `Room ${tabsCol.length + 1}`;
        settabsCol([...tabsCol, { eventKey: newKey, title: newTitle }]);
    };
    

    // Event handler to update form data on input change
    const handleInputChange = (event, id) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        const updatedRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }   
            return row;
        });
        setRows(updatedRows);
        setFormData({
            ...formData, ...rows,
            [name]: value
        });
    };

    function handleInputChangePhone1(name, value) {
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleInputChangePhone2(name, value) {
        setFormData({
            ...formData,
            [name]: value
        });
    }

    // Event handler to handle form submission
    const handleSubmit = (event) => {
        
        //event.preventDefault();
        // Access form data here
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            
        }else {
            //alert();
            console.log(formData);
            event.preventDefault();
            event.stopPropagation();
        }
        
        setValidated(true);
    };

    const [clicked, setClicked] = useState(false);
    const handleSidebarActive = (e) => {
        setClicked(!clicked);
    }

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
          const response = await fetch('/building-json.json');
          const jsonData = await response.json();
          setData(jsonData); // Store fetched data in state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    
    
    return (
        <>
            <div className={`siteassesment-wrap ${clicked ? 'active' : ''}`}>
                
                {/* <Row>
                    <Col>
                        <div className='site-title'>
                            <h2>USAID / RTI International / 3456789</h2>
                        </div>
                        <div className='site-gallary'></div>
                    </Col>
                </Row> */}
                <Row className='mt-4 mx-0'>
                    <Col xs={1} className='left-side-bar'>
                        <ul>
                            <li className='active'>
                                <img src={BuildingIcon} alt=''/>
                                <span>Building <br/>& Roof</span>
                                <button onClick={handleSidebarActive} className='sidebar-arrow'></button>
                            </li>
                            <li>
                                <img src={GroundIcon} alt=''/>
                                <span>Ground</span>
                            </li>
                            <li>
                                <img src={CarportIcon} alt=''/>
                                <span>Carport</span>
                            </li>
                            <li>
                                <img src={ElectrictyIcon} alt=''/>
                                <span>Electricity Details</span>
                            </li>
                            <li>
                                <img src={BatteryIcon} alt=''/>
                                <span>Battery</span>
                            </li>
                            <li>
                                <img src={EnvironmentIcon} alt=''/>
                                <span>Environment</span>
                            </li>
                            <li>
                                <img src={WeatherIcon} alt=''/>
                                <span>Weather Reports</span>
                            </li>
                            <li>
                                <img src={LogisticIcon} alt=''/>
                                <span>logistics</span>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12}>
                        <div className="accordion-wrap">
                            <Row className='mb-3'>
                                <Col className='d-flex align-items-center'>
                                    <div className='site-title d-flex flex-column'>
                                        <h2>Southern Highlands Provincial Health Authority - <span>View Details</span></h2> 
                                        <span className='date-text'> <img src={CalendarIcon} alt='' />23-MAR-2024</span>
                                    </div>
                                    <Button className='ms-auto add-buidling'><span><img src={PlusIcon} alt='' /></span> Add New Building</Button>
                                </Col>
                            </Row>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Accordion defaultActiveKey="0" >
                                
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Building 1</Accordion.Header>
                                        <Accordion.Body>
                                            <>
                                                <GenralInformation 
                                                    formData={formData}
                                                    handleInputChangePhone1 ={handleInputChangePhone1}
                                                    handleInputChangePhone2 ={handleInputChangePhone2}
                                                    handleInputChange={handleInputChange}
                                                />
                                                
                                                {/* <Accordion defaultActiveKey="11" >
                                                    <Accordion.Item eventKey="11">
                                                        <Accordion.Header>1. General Information</Accordion.Header>
                                                        <Accordion.Body>
                                                            <GenralInformation 
                                                                formData={formData}
                                                                handleInputChangePhone1 ={handleInputChangePhone1}
                                                                handleInputChangePhone2 ={handleInputChangePhone2}
                                                                handleInputChange={handleInputChange}
                                                        />
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey="12">
                                                        <Accordion.Header>1. General Information</Accordion.Header>
                                                        <Accordion.Body>
                                                            <GenralInformation 
                                                                formData={formData}
                                                                handleInputChangePhone1 ={handleInputChangePhone1}
                                                                handleInputChangePhone2 ={handleInputChangePhone2}
                                                                handleInputChange={handleInputChange}
                                                        />
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion> */}
                                                   
                                            </>            
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>2. Building & Roof Type details</Accordion.Header>
                                        <Accordion.Body>
                                            <BuildingRoofDetails />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>3. Building Rooms </Accordion.Header>
                                        <Accordion.Body>
                                            <BuildingRooms 
                                                formData={formData}
                                                rows={rows}
                                                handleAddRow={handleAddRow}
                                                tabsCol={tabsCol}
                                                handleAddTab={handleAddTab}
                                                handleInputChange={handleInputChange}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>4. Other Details </Accordion.Header>
                                        <Accordion.Body>
                                            <OtherDetails 
                                                formData={formData}
                                                handleInputChange={handleInputChange}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                               
                                </Accordion>
                                <Row>
                                    <Col className='text-end'>
                                        <Button type="submit">Next</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>    
                    </Col>
                </Row>
            </div>
        </>
    )
}

function GenralInformation({ formData, handleInputChange, handleInputChangePhone1, handleInputChangePhone2 }) {

    return (
        <>
            <Row>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        //controlId="DateOfSurvey"
                        label="Date of Survey*"
                        className=""
                    >
                        <Form.Control 
                            type="date" 
                            placeholder="" 
                            required  
                            name='DateOfSurvey'
                            value={formData.DateOfSurvey}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">Please Enter Date of Survey</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId="Client"
                        label="Client*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" required name="Client"/>
                        <Form.Control.Feedback type="invalid">Please enter Client Name</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3 " >
                    <FloatingLabel
                        controlId="Client"
                        label=""
                        className=""
                    >
                    <Form.Control required as="select" type="select" controlId="TypeofSolutionInterested" name="TypeofSolutionInterested" className='col-12 form-select px-0'>
                        <option value="">Types of solutions interested*</option>
                        <option value="Powering Healthcare">Powering Healthcare</option>
                        <option value="Powering Home">Powering Home</option>
                        <option value="Powering Education">Powering Education</option>
                        <option value="Powering Corporate - Rural">Powering Corporate - Rural</option>
                        <option value="Powering Corporate - Urban">Powering Corporate - Urban</option>
                        <option value="Powering Hospitality">Powering Hospitality</option>
                        <option value="Powering Telecom">Powering Telecom</option>
                        <option value="Powering Agriculture">Powering Agriculture</option>
                        <option value="Powering Community">Powering Community</option>
                        <option value="Solar PV ON - Grid">Solar PV ON - Grid</option>
                        <option value="Solar PV OFF - Grid">Solar PV OFF - Grid</option>
                        <option value="Solar PV Hybrid">Solar PV Hybrid</option>
                        <option value="Solar PV Water Pump">Solar PV Water Pump</option>
                        <option value="Solar PV Air Conditioner">Solar PV Air Conditioner</option>
                        <option value="Solar PV Refrigerator">Solar PV Refrigerator</option>
                        <option value="Solar Street Light">Solar Street Light</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId="ContactPersion1"
                        label="Contact Person*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="ContactPersion1" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId="Mail1"
                        label="Mail ID*"
                        className=""
                    >
                        <Form.Control type="email" placeholder="" name="Mail1"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <PhoneInput
                    required
                    placeholder="Contact Number"
                    controlId="ContactNumber1"
                    name="ContactNumber1"
                    value={formData.ContactNumber1}
                    onChange={(value) => handleInputChangePhone1('ContactNumber1', value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId="ContactPersion2"
                        label="Secondary Contact Person*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="ContactPersion2"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId="Mail2"
                        name="Mail2"
                        label="Mail ID*"
                        className=""
                    >
                        <Form.Control type="email" placeholder="" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <PhoneInput
                    name="ContactNumber2"
                    controlId="ContactNumber2"
                    placeholder="Contact Number"
                    value={formData.ContactNumber2}
                    onChange={(value) => handleInputChangePhone2('ContactNumber2', value)}
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId="Siteaddress"
                        label="Site Address*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="Siteaddress"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId="LatLang"
                        label="Latitude & Longitude*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="LatLang"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="Country"
                        label="Select Country*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="Country"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 mt-3 col-md-12" >
                    <Form.Label htmlFor="ClientText">What are client's motivations for wanting solar</Form.Label>
                    <Form.Control name="ClientMotivation" controlId="ClientMotivation" as="textarea" rows={3} />
                </Form.Group>
            </Row>
            
        </>
    )
}

function BuildingRoofDetails() {
    return (
        <>
            <Row>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="TypeofSolarPV" name="TypeofSolarPV" className='form-select'>
                        <option>Type of solar PV installation*</option>
                        <option value="1">Tilted/slanted roof - Metal Roof</option>
                        <option value="2">Tilted/slanted roof - Tile Roof</option>
                        <option value="3">Tilted/slanted roof - Asbestos Roof</option>
                        <option value="4">Car Port/ Parking structure</option>
                        <option value="5">Flat roof </option>
                        <option value="5">Ground-mount</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="BuildingStory" name="BuildingStory" className='form-select' disabled>
                        <option>Building Storey*</option>
                        <option value="1">Single Storey</option>
                        <option value="2">Double Storey</option>
                        <option value="3">Triple Storey</option>
                        <option value="4">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="TypeofSiteSoil" name="TypeofSiteSoil" className='form-select' disabled>
                        <option>Type of site/soil*</option>
                        <option value="1">Landfill</option>
                        <option value="2">Agricultural land</option>
                        <option value="3">Sandy</option>
                        <option value="4">Marsh</option>
                        <option value="5">Cement </option>
                        <option value="5">Clay/loam</option>
                        <option value="5">Rocky/boulders</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="RoofCondition" name="RoofCondition" className='form-select'>
                        <option>Roof condition*</option>
                        <option value="1">Excellent</option>
                        <option value="2">Fair</option>
                        <option value="3">Replace 3-5 years </option>
                        <option value="4">Replace immediately</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="RafterSize" name="RafterSize" className='form-select'>
                        <option>Rafter Size*</option>
                        <option value="1">2” x 4”</option>
                        <option value="2">2” x 6”</option>
                        <option value="3">2” x 8”</option>
                        <option value="4">2” x 10” </option>
                        <option value="5">Other </option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="RafterSpacing" name="RafterSpacing" className='form-select'>
                        <option>Rafter Spacing*</option>
                        <option value="1">12”</option>
                        <option value="2">16”</option>
                        <option value="3">18”</option>
                        <option value="4">20”</option>
                        <option value="5">24”</option>  
                        <option value="5">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="PurlinSize" name="PurlinSize" className='form-select'>
                        <option>Purlin Size*</option>
                        <option value="1">2” x 4”</option>
                        <option value="2">2” x 6”</option>
                        <option value="3">2” x 8”</option>
                        <option value="4">2” x 10” </option>
                        <option value="5">Other </option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="PurlinSpacing" name="PurlinSpacing" className='form-select'>
                        <option>Purling Spacing*</option>
                        <option value="1">12”</option>
                        <option value="2">16”</option>
                        <option value="3">18” </option>
                        <option value="4">20”</option>
                        <option value="5">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="LevelGradedSurface" name="LevelGradedSurface" className='form-select'>
                        <option>Level, graded surface? *</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="WaterNearSurface" name="WaterNearSurface" className='form-select'>
                        <option>Water near surface? *</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                        <option value="3">Unknown</option>  
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="CorrosiveEnvironment" name="CorrosiveEnvironment" className='form-select'>
                        <option>Corrosive Environment? *</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                        <option value="3">Unknown</option> 
                    </Form.Control>
                </Form.Group>
            </Row>
            
        </>
    )
}

function BuildingRooms({ formData, handleInputChange, rows, handleAddRow, handleAddTab, tabsCol}) {
    return (
        <>
            <Row>
                <Col className='room-tabs'>
                    <Tabs
                    defaultActiveKey="0"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    >
                        {tabsCol.map((tabr, tabIndex) => (
                           
                                <Tab key={`tab-${tabIndex}`} eventKey={tabr.eventKey} title={tabr.title}>
                                    {rows.map((row, rowIndex) => (
                                        <>
                                            <Row key={`tab-${tabIndex}-row-${rowIndex}`}>
                                                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                                                <Form.Control 
                                                    required 
                                                    as="select" 
                                                    type="select" 
                                                    controlId={`Equipment-${tabIndex}-${rowIndex}`} 
                                                    name={`Equipment-${tabIndex}-${rowIndex}`} 
                                                    className='form-select' 
                                                    value={formData[`Equipment-${tabIndex}-${rowIndex}`]} 
                                                    onChange={handleInputChange}
                                                >
                                                        <option>Equipment*</option>
                                                        <option value="Light">Light</option>
                                                        <option value="Fan">Fan</option>
                                                        <option value="Television">Television</option>
                                                        <option value="Setup Box">Setup Box</option>
                                                        <option value="Router">Router</option>
                                                        <option value="Computer">Computer</option>
                                                        <option value="Air Conditioner">Air Conditioner</option>
                                                        <option value="Refrigerator">Refrigerator</option>
                                                        <option value="Iron Box">Iron Box</option>
                                                        <option value="Kettle">Kettle</option>
                                                        <option value="Washing Machine">Washing Machine</option>
                                                        <option value="Projector">Projector</option>
                                                        <option value="Micro Owen">Micro Owen</option>
                                                        <option value="Water purifier">Water purifier</option>
                                                        <option value="Toaster">Toaster</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                                                    <Form.Control 
                                                        required 
                                                        as="select" 
                                                        type="select" 
                                                        controlId={`EquipmentType-${tabIndex}-${rowIndex}`} 
                                                        name={`EquipmentType-${tabIndex}-${rowIndex}`} 
                                                        className='form-select' 
                                                        value={formData[`EquipmentType-${tabIndex}-${rowIndex}`]} 
                                                        onChange={handleInputChange}
                                                    >
                                                        <option>Type*</option>
                                                        {formData[`Equipment-${tabIndex}-${rowIndex}`] === "Light" && (
                                                            <>
                                                                <option value="1">Fluorescent</option>
                                                                <option value="LED">LED</option>
                                                            </>
                                                        )}
                                                        {formData[`Equipment-${tabIndex}-${rowIndex}`] === "Fan" && (
                                                            <>
                                                                <option value="2">Ceiling mount</option>
                                                                <option value="3">Wall mount</option>
                                                                <option value="4">Standing</option>
                                                            </>
                                                        )}
                                                        {formData[`Equipment-${tabIndex}-${rowIndex}`] === "Television" && (
                                                            <>
                                                                <option value="2">LED</option>
                                                                <option value="3">LCD</option>
                                                            </>
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                                                    <Form.Control 
                                                        required 
                                                        as="select" 
                                                        type="select" 
                                                        controlId={`Wattage-${tabIndex}-${rowIndex}`} 
                                                        name={`Wattage-${tabIndex}-${rowIndex}`} 
                                                        className='form-select' 
                                                        value={formData[`Wattage-${tabIndex}-${rowIndex}`]} 
                                                        onChange={handleInputChange}
                                                    >
                                                        <option>Wattage*</option>
                                                        <option value="1">Tilted/slanted roof - Metal Roof</option>
                                                        <option value="2">Tilted/slanted roof - Tile Roof</option>
                                                        <option value="3">Tilted/slanted roof - Asbestos Roof</option>
                                                        <option value="4">Car Port/ Parking structure</option>
                                                        <option value="5">Flat roof </option>
                                                        <option value="5">Ground-mount</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group className="mb-4 col-md-3" >
                                                    <FloatingLabel
                                                        controlId={`Qty${row.id}`}
                                                        label="Qty*"
                                                        className=""
                                                    >
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="" 
                                                        name={`Qty-${tabIndex}-${rowIndex}`} 
                                                        controlId={`Qty-${tabIndex}-${rowIndex}`} 
                                                        value={formData[`Qty-${tabIndex}-${rowIndex}`]} 
                                                        onChange={handleInputChange}
                                                    />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Row>
                                        </>
                                    ))}
                                    <Row>
                                        <Col className='text-center mt-3'>
                                            <Button className='add-details-btn' onClick={handleAddRow}>
                                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.5414 7.29232H6.79135V12.0423H5.20801V7.29232H0.458008V5.70899H5.20801V0.958984H6.79135V5.70899H11.5414V7.29232Z" fill="#23B14D"/>
                                            </svg>
                                                Add Details</Button>
                                        </Col>
                                    </Row>
                                </Tab>
                           
                        ))}                          
                    </Tabs>
                    <Button className='add-room-btn' onClick={handleAddTab}>Create a New Room</Button>
                </Col>
            </Row>
            <Row>
                <Col className='room-content row mx-0'>
                    
                </Col>
            </Row>
            
        </>
    )
}

function OtherDetails({ formData, handleInputChange }) {
    return (
        <>
            
            <Row>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="InverterMountingType" name="InverterMountingType" className='form-select'>
                        <option>Inverter Mounting Type*</option>
                        <option value="1">Wall Mount</option>
                        <option value="2">Ground Mount</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-6 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="BatteryBank" name="BatteryBank" className='form-select'>
                        <option>Ventilated Room / Space availability for Battery Bank*</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="DCCableRun" name="DCCableRun" className='form-select'>
                        <option>DC Cable Run*</option>
                        <option value="1">Internal</option>
                        <option value="2">External</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="ACCableRun" name="ACCableRun" className='form-select'>
                        <option>AC Cable Run*</option>
                        <option value="1">Internal</option>
                        <option value="2">External</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="CombinerBox"
                        label="Length of wire-run to Combiner Box*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="CombinerBox"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="BuildingCADDrawings" name="BuildingCADDrawings" className='form-select'>
                        <option>Building CAD Drawings Available*</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="BuildingElectricalDrawings" name="BuildingElectricalDrawings" className='form-select'>
                        <option>Building Electrical Drawings Available*</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Col xs={12}>
                        <h4 className='form-inner-heading mt-3'>Equipment and Wiring Details</h4>
                    </Col>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="ElectricityProvider"
                        label="Electricity provider*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="ElectricityProvider"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="ConnectionNo"
                        label="Connection no*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="ConnectionNo"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="PrevMonthBillCopy"
                        label=" (Previous Month Bills copy )"
                        className=""
                    >
                        <Form.Control type="file" placeholder="" name="PrevMonthBillCopy"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="Amps" name="Amps" className='form-select'>
                        <option>Amps*</option>
                        <option value="1">100A</option>
                        <option value="2">200A</option>
                        <option value="3">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="Voltage" name="Voltage" className='form-select'>
                        <option>Voltage*</option>
                        <option value="1">240V</option>
                        <option value="2">400V</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="Amps2" name="Amps2" className='form-select'>
                        <option>Amps*</option>
                        <option value="1">Single</option>
                        <option value="2">Three</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="CableRouting" name="CableRouting" className='form-select'>
                        <option>Cable Routing*</option>
                        <option value="1">Underground</option>
                        <option value="2">Overhead</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="RoofElecRoomCable"
                        label=" Roof to Electrical Room Cable Length*  (m)"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="RoofElecRoomCable"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-12 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="AvailableBreakerSpace" name="AvailableBreakerSpace" className='form-select'>
                        <option>Available breaker space (for net-metering /Hybrid system)*</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                        
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-12 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="SeparateElectricalRoomAvailable" name="SeparateElectricalRoomAvailable" className='form-select'>
                        <option>Separate Electrical Room Available*</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                        
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 mt-3 col-md-12" >
                    <Form.Label htmlFor="ClientText"> Details of Separate Electrical Room Available</Form.Label>
                    <Form.Control name="DetailsOfSERA" controlId="DetailsOfSERA" as="textarea" rows={3} />
                </Form.Group>
                <Form.Group>
                    <Col xs={12}>
                        <h4 className='form-inner-heading mt-4 mb-3'>Backup Generator Details </h4>
                    </Col>
                </Form.Group>
                <Form.Group className="mb-4 col-md-12 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="Available" name="Available" className='form-select'>
                        <option>Available*</option>
                        <option value="1">Available</option>
                        <option value="2">Unavailable</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="Make"
                        name="Make"
                        label="Make*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="CapacityKVA"
                        label="Capacity in KVA*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="CapacityKVA"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="ElectricalPhase" name="ElectricalPhase" className='form-select'>
                        <option>Electrical Phase*</option>
                        <option value="1">Single</option>
                        <option value="2">Three</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3 d-flex align-items-end" >
                    <Form.Control required as="select" type="select" controlId="AutoStart" name="AutoStart" className='form-select'>
                        <option>Auto start option available*</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                        <option value="3">Tilted/slanted roof - Asbestos Roof</option>
                        <option value="4">Car Port/ Parking structure</option>
                        <option value="5">Flat roof </option>
                        <option value="5">Ground-mount</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="DailyOperationHours"
                        label="Daily Operation Hours*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="DailyOperationHours"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 col-md-3" >
                    <FloatingLabel
                        controlId="SwitchRating"
                        label="Change over Switch Rating*"
                        className=""
                    >
                        <Form.Control type="text" placeholder="" name="SwitchRating"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Col xs={12}>
                        <h4 className='form-inner-heading mt-4 mb-3'>Miscellaneous Details</h4>
                    </Col>
                </Form.Group>
                <Form.Group className="mb-2 col-md-12 d-flex align-items-end flex-column" >
                    <Form.Group className="mb-3 mt-3 col-md-12" >
                        <Form.Control required as="select" type="select" controlId="EarthingPitVisibility" name="EarthingPitVisibility" className='form-select' value={formData.EarthingPitVisibility} onChange={handleInputChange}>
                            <option>Earthing Pit Visibility*</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </Form.Control>
                    </Form.Group>
                    {formData.EarthingPitVisibility === "1" && (
                        <Form.Group className="mb-4 mt-3 col-md-12 " >
                            <Form.Label htmlFor="ClientText"> Details of Earthing Pit Visibility</Form.Label>
                            <Form.Control name="DetailsEarthingPitVisibility" controlId="DetailsEarthingPitVisibility" as="textarea" rows={3} />
                        </Form.Group>
                    )}
                </Form.Group>
                
                <Form.Group className="mb-2 col-md-12 d-flex align-items-end flex-column" >
                    <Form.Group className="mb-3 mt-3 col-md-12" >
                        <Form.Control required as="select" type="select" controlId="EasyAccessRoof" name="EasyAccessRoof" className='form-select' value={formData.EasyAccessRoof} onChange={handleInputChange}>
                            <option>Easy Access to Roof*</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                        </Form.Control>
                    </Form.Group>
                    {formData.EasyAccessRoof === "1" && (
                        <Form.Group className="mb-4 mt-3 col-md-12 " >
                            <Form.Label htmlFor="ClientText"> Details of Earthing Pit Visibility</Form.Label>
                            <Form.Control name="DetailsEasyAccessRoof" controlId="DetailsEasyAccessRoof" as="textarea" rows={3} />
                        </Form.Group>
                    )}
                </Form.Group>
                <Form.Group className="mb-2 col-md-12 d-flex align-items-end flex-column" >
                    <Form.Group className="mb-3 mt-3 col-md-12" >
                        <Form.Control required as="select" type="select" controlId="ScaffoldingDuring" name="ScaffoldingDuring" className='form-select' value={formData.ScaffoldingDuring} onChange={handleInputChange}>
                            <option>Need of Scaffolding during installation*</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                        </Form.Control>
                    </Form.Group>
                    {formData.ScaffoldingDuring === "1" && (
                        <Form.Group className="mb-4 mt-3 col-md-12 " >
                            <Form.Label htmlFor="ClientText"> Details of Earthing Pit Visibility</Form.Label>
                            <Form.Control name="DetailsScaffoldingDuring" controlId="DetailsScaffoldingDuring" as="textarea" rows={3} />
                        </Form.Group>
                    )}
                </Form.Group>
                <Form.Group className="mb-2 col-md-12 d-flex align-items-end flex-column" >
                    <Form.Group className="mb-3 mt-3 col-md-12" >
                        <Form.Control required as="select" type="select" controlId="WeldingFacility" name="WeldingFacility" className='form-select' value={formData.WeldingFacility} onChange={handleInputChange}>
                            <option>Availability of Welding Facility in Site*</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                        </Form.Control>
                    </Form.Group>
                    {formData.WeldingFacility === "1" && (
                        <Form.Group className="mb-4 mt-3 col-md-12 " >
                            <Form.Label htmlFor="ClientText"> Details of Earthing Pit Visibility</Form.Label>
                            <Form.Control name="DetailsWeldingFacilityf" controlId="DetailsWeldingFacility" as="textarea" rows={3} />
                        </Form.Group>
                    )}
                </Form.Group>
                <Form.Group className="mb-2 col-md-12 d-flex align-items-end flex-column" >
                    <Form.Group className="mb-3 mt-3 col-md-12" >
                        <Form.Control required as="select" type="select" controlId="CraneService" name="CraneService" className='form-select' value={formData.CraneService} onChange={handleInputChange}>
                            <option>Availability of Crane service*</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                        </Form.Control>
                    </Form.Group>
                    {formData.CraneService === "1" && (
                        <Form.Group className="mb-4 mt-3 col-md-12 " >
                            <Form.Label htmlFor="ClientText"> Details of Earthing Pit Visibility</Form.Label>
                            <Form.Control name="DetailsCraneService" controlId="DetailsCraneService" as="textarea" rows={3} />
                        </Form.Group>
                    )}
                </Form.Group>
                <Form.Group className="mb-2 col-md-12 d-flex align-items-end flex-column" >
                    <Form.Group className="mb-3 mt-3 col-md-12" >
                        <Form.Control required as="select" type="select" controlId="LadderFacility" name="LadderFacility" className='form-select' value={formData.LadderFacility} onChange={handleInputChange}>
                            <option>Availability of Ladder Facility*</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                        </Form.Control>
                    </Form.Group>
                    {formData.LadderFacility === "1" && (
                        <Form.Group className="mb-4 mt-3 col-md-12 " >
                            <Form.Label htmlFor="ClientText"> Details of Earthing Pit Visibility</Form.Label>
                            <Form.Control name="DetailsLadderFacility" controlId="DetailsLadderFacility" as="textarea" rows={3} />
                        </Form.Group>
                    )}
                </Form.Group>
                <Form.Group className="mb-2 col-md-12 d-flex align-items-end flex-column    " >
                    <Form.Group className="mb-3 mt-3 col-md-12" >
                        <Form.Control required as="select" type="select" controlId="BuildingElectrician" name="BuildingElectrician" className='form-select' value={formData.BuildingElectrician} onChange={handleInputChange}>
                            <option>Availability of Building Electrician*</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                        </Form.Control>
                    </Form.Group>
                    {formData.BuildingElectrician === "1" && (
                        <Form.Group className="mb-4 mt-3 col-md-12 " >
                            <Form.Label htmlFor="ClientText"> Details of Earthing Pit Visibility</Form.Label>
                            <Form.Control name="DetailsBuildingElectrician" controlId="DetailsBuildingElectrician" as="textarea" rows={3} />
                        </Form.Group>
                    )}
                </Form.Group>
            </Row>
            
        </>
    )
}



export default App;