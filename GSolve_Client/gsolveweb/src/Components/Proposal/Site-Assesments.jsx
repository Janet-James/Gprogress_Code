import React, { useEffect, useState  } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
//import GenralInformation from './General-Information';
import Table from 'react-bootstrap/Table';



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
import BuildPlaceholderImage from "./../../dist/images/site-assessment/building-image-placeholder.png"



function App() {
    const [validated, setValidated] = useState(false);
    //const [data, setData] = useState([]);

    // const [rows, setRows] = useState([
    //     { id: 1, Equipment: '', EquipmentType: '', Wattage: '', Qty: '' } // Initial row
    // ]);

    // const [tabsCol, settabsCol] = useState([
    //     { eventKey: "0", title: "Room 1" },
    //     // Initial tabs, you can add more if needed
    // ]);


    // const initialFormData = useState({
    //     DateOfSurvey: '',
    //     ContactNumber1: '',
    //     ContactNumber2: '',
    //     EarthingPitVisibility: '',
    // });
    // tabsCol.forEach((tab, tabIndex) =>{
    //     rows.forEach((row, rowIndex) => {
    //         initialFormData[`Equipment-${tabIndex}-${rowIndex}`] = '';
    //         initialFormData[`EquipmentType-${tabIndex}-${rowIndex}`] = '';
    //         initialFormData[`Wattage-${tabIndex}-${rowIndex}`] = '';
    //         initialFormData[`Qty-${tabIndex}-${rowIndex}`] = '';
    //     });
    // })

    const [formData, setFormData] = useState({});


    const [buildingData, setBuildingData] = useState([]);


    // const handleAddRow = () => {
    //     const newId = rows.length + 1;
    //     setRows([...rows, { id: newId, Equipment: '', EquipmentType: '', Wattage: '', Qty: '' }]);
    // };
    
    // const handleAddTab = () => {
    //     const newKey = String(tabsCol.length);
    //     const newTitle = `Room ${tabsCol.length + 1}`;
    //     settabsCol([...tabsCol, { eventKey: newKey, title: newTitle }]);
    // };
    

    // Event handler to update form data on input change
    // const handleFormChange = (index, updatedValues) => {
    //     const updatedBuildingData = [...buildingData];
    //     updatedBuildingData[index] = updatedValues;
    //     setBuildingData(updatedBuildingData);
    // };

    // function handleInputChangePhone1(name, value) {
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // }

    // function handleInputChangePhone2(name, value) {
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // }

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
            console.log(buildingData);
            event.preventDefault();
            event.stopPropagation();
        }
        
        setValidated(true);
    };

    const [clicked, setClicked] = useState(false);
    const [imageView, setimageView] = useState(false);
    const handleSidebarActive = (e) => {
        setClicked(!clicked);
    }

    const handleBuildingImages = (e) => {
        setimageView(!imageView);
    }

    

    useEffect(() => {
        // Simulating fetching data from a local JSON file
        const fetchData = async () => {
          try {
            const response = await fetch('/building-json.json'); // Assuming your JSON file is named data.json
            const jsonData = await response.json();
            setBuildingData(jsonData.building_details); // Extracting building details and storing in state
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Fetch data when the component mounts
    }, []);

    const handleDataFromChild = (index, updatedData) => {
        // Update parent component state with data received from child
        //console.log('Data received from child:', data);

            const updatedBuildingData = [...buildingData];

            updatedBuildingData[index] = { ...updatedBuildingData[index], ...updatedData };

            setBuildingData(updatedBuildingData);

            // setFormData(data);

            // console.log('Updated Data: '+ formData)
    };

    const handleDataFromRoom = (index, updatedData) => {
        const updatedBuildingData = [...buildingData];

        updatedBuildingData[index] = { ...updatedBuildingData[index], ...updatedData };

        setBuildingData(updatedBuildingData);

        console.log('Updated Data: '+ buildingData)
    }

   

    
    
    
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
                                <Accordion defaultActiveKey="building-1" >
                                    {buildingData.map((building, index) => (
                                        <Accordion.Item eventKey={`building-${index + 1}`} key={index}>
                                            <Accordion.Header>Building {index + 1}</Accordion.Header>
                                            <Accordion.Body>   
                                                <BuildingInformation 
                                                    building={building}
                                                    index={index}
                                                    key={index} 
                                                    //handleInputChange={handleInputChange}
                                                    handleBuildingImages={handleBuildingImages}
                                                    prefetchedBuildingName={building[`building_${index + 1}`].building_function_name}
                                                    prefetchedBuildingLocation={building[`building_${index + 1}`].building_location}
                                                    prefetchedBuildingType={building[`building_${index + 1}`].building_type}
                                                    prefetchedBuildingTier={building[`building_${index + 1}`].building_tier}
                                                    prefetchedAppearance={building[`building_${index + 1}`].appearance}
                                                    prefetchedExistingIssues={building[`building_${index + 1}`].pre_existing_issue}
                                                    imageView={imageView}
                                                    onDataReceived={handleDataFromChild }
                                                    //onChange={(handleDataFromChild) => handleFormChange(index, handleDataFromChild)}
                                                />
                                                <Row>
                                                    <Accordion defaultActiveKey="room-1">
                                                        {building.room_details.map((room, roomIndex) => (
                                                            <Accordion.Item eventKey={`room-${roomIndex + 1}`}>
                                                                <Accordion.Header>Room {roomIndex + 1}</Accordion.Header>
                                                                <Accordion.Body key={roomIndex}>
                                                                    <RoomInformation 
                                                                        room={room}
                                                                        roomIndex={roomIndex}
                                                                        prefetchRoomName={room[`room_${roomIndex + 1}`].room_functional_name}
                                                                        prefetchRoomType={room[`room_${roomIndex + 1}`].room_type}
                                                                        prefetchNewEquipment={room[`room_${roomIndex + 1}`].add_new_equipment}
                                                                        onRoomDataReceived={handleDataFromRoom}
                                                                    />
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        ))}
                                                    </Accordion> 
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
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

function BuildingInformation({ 
    building, 
    index, 
    handleBuildingImages, 
    imageView, 
    onDataReceived,
    prefetchedBuildingName, 
    prefetchedBuildingLocation,
    prefetchedBuildingType,
    prefetchedBuildingTier,
    prefetchedAppearance,
    prefetchedExistingIssues,
}) {
    const [values, setValues] = useState({
        buildingName: prefetchedBuildingName,
        buildingLocation: prefetchedBuildingLocation,
        buildingType: prefetchedBuildingType,
        buildingTier: prefetchedBuildingTier,
        appearance: prefetchedAppearance,
        preExistingIssue: prefetchedExistingIssues,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
          ...prevValues,
          [name]: value
        }));        
    };

    useEffect(() => {
        onDataReceived(index, values)
    }, [values]);

    const [tabClicked, SetTabClicked] = useState('main-tab-0');
    const [imageClicked, SetImageClicked] = useState('sub-tab-0');
    const [roomClicked, SetRoomClicked] = useState();
    const [roomSubClicked, SetRoomSubClicked] = useState();

    const [activeIndex, setActiveIndex] = useState('main-tab-0');

    const handleItemClick = (category) => {
        console.log('Clicked on:', category);
        SetTabClicked(category);
        SetImageClicked('sub-tab-0');

        console.log('Clicked index:', category); // Check if click event is detected
        setActiveIndex(category); // Set the active index on item click
        console.log('Active index:', activeIndex); // Check if active index is updated
        SetRoomSubClicked('sub-tab-room-0');
    };

    const handleImageClick = (category) => {
        console.log('Clicked on:', category);
        SetImageClicked(category);
    };
    const handleRoomClick = (category) => {
        console.log('Clicked on:', category);
        SetRoomClicked(category);
        SetRoomClicked('room-select-0')
    };
    const handleRoomImageClick = (category) => {
        console.log('Clicked on:', category);
        SetRoomSubClicked(category);
    };
    

    return (
        <>  
            <Row className='animate-width'>
                <Col xs={`${imageView ? '8' : '12'}`}>
                    <Row>
                        <Form.Group className="mb-3 col-md-4" >
                            <FloatingLabel
                                controlId="buildingName"
                                label="Building Functional Name*"
                                className=""
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder=""  
                                    value={values.buildingName} 
                                    name="buildingName"
                                    onChange={handleInputChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-4" >
                            <FloatingLabel
                                controlId="buildingLocation"
                                label="Building Location*"
                                className=""
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder=""  
                                    value={values.buildingLocation}
                                    name="buildingLocation"
                                    onChange={handleInputChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-4" >
                            <FloatingLabel
                                controlId=""
                                label="Building Type"
                                className=""
                            >
                                <Form.Control 
                                    as="select" 
                                    type="select" 
                                    controlId="buildingType" 
                                    name="buildingType" 
                                    className='col-12 form-select px-0'
                                    value={values.buildingType}
                                    onChange={handleInputChange}
                                >
                                    <option value="">---Building Type---</option>
                                    <option value="concrete">Concrete</option>
                                    <option value="steel"> Steel</option>
                                    <option value="wood"> Wood</option>
                                </Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-4" >
                            <FloatingLabel
                                controlId=""
                                label="Building Tier"
                                className=""
                            >
                                <Form.Control 
                                    as="select" 
                                    type="select" 
                                    controlId="buildingTier" 
                                    name="buildingTier" 
                                    className='col-12 form-select px-0'
                                    value={values.buildingTier}
                                    onChange={handleInputChange}
                                >
                                    <option value="">---Building Tier---</option>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                </Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-8" >
                            <FloatingLabel
                                controlId=""
                                label="Appearance"
                                className=""
                            >
                                <Form.Control 
                                    as="select" 
                                    type="select" 
                                    controlId="appearance" 
                                    name="appearance" 
                                    className='col-12 form-select px-0'
                                    value={values.appearance}
                                    onChange={handleInputChange}
                                >
                                    <option value="">---Appearance---</option>
                                    <option value="good">Good</option>
                                    <option value="bad">Bad</option>
                                    <option value="fair">Fair</option>
                                </Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-4" >
                            <FloatingLabel
                                controlId="preExistingIssue"
                                label="Pre-Existing issue"
                                className=""
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder=""  
                                    value={values.preExistingIssue}
                                    name="preExistingIssue"
                                    onChange={handleInputChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-8" >
                            <FloatingLabel
                                controlId="notes"
                                label="Notes"
                                className=""
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder=""  
                                    name="notes"
                                    value={values.notes}
                                    onChange={handleInputChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>                    
                </Col>
                <Col xs={`${imageView ? '4' : '0'}`}>
                        <div className='building-images'>
                        <span className='hide-building-image' onClick={handleBuildingImages}></span>
                            <div className='top-tab'>
                                <ul>
                                    <li className={activeIndex === 'main-tab-0' ? 'active' : 'inactive'} onClick={() => handleItemClick('main-tab-0')}>Building {index + 1}</li>
                                    <li className={activeIndex === 'main-tab-1' ? 'active' : 'inactive'} onClick={() => handleItemClick('main-tab-1')}>
                                        <Form.Control 
                                            as="select" 
                                            type="select" 
                                            controlId="room_images" 
                                            name="room_images" 
                                            className='form-select px-0'
                                            onClick={(e) => handleRoomClick(e.target.value)}
                                        >
                                            <option value="room-select-0">Room 1</option>
                                            <option value="room-select-1">Room 2</option>
                                        </Form.Control>
                                    </li>
                                    <li className={activeIndex === 'main-tab-2' ? 'active' : 'inactive'} onClick={(e) => handleItemClick('main-tab-2')}>Roof</li>
                                </ul>
                            </div>
                            {Object.keys(building.building_and_roof_images).map((category, categoryIndex) => (
                                <div key={categoryIndex} className='building-tab-content'  
                                    data-val={'main-tab-'+categoryIndex} 
                                    style={{ display: tabClicked === `main-tab-${categoryIndex}` ? 'block' : 'none' }}
                                >
                                    {category}
                                    {category === "room" ? (
                                        building.building_and_roof_images[category].map((roomImages, roomIndex) => (
                                            <>
                                                <div className='content-inner-tab'>
                                                    <ul>
                                                        <li onClick={() => handleRoomImageClick('sub-tab-room-0')}>Images </li>
                                                        <li onClick={() => handleRoomImageClick('sub-tab-room-1')}>Videos </li>
                                                        <li onClick={() => handleRoomImageClick('sub-tab-room-2')}>Drawings</li>
                                                        <li onClick={() => handleRoomImageClick('sub-tab-room-3')}>Marked & Raw Images</li>
                                                    </ul>
                                                </div>
                                                <div key={roomIndex} className='tab-content-item' >
                                                    {Object.keys(roomImages).map((roomKey, roomKeyIndex) => (
                                                        <div key={roomKeyIndex} className='content-inner-tab' 
                                                            data-val={'room-select-'+roomKeyIndex} 
                                                            style={{ display: roomClicked === `room-select-${roomKeyIndex}` ? 'block' : 'none' }}
                                                        >
                                                            {roomKey}
                                                            <ul>
                                                                {Object.keys(roomImages[roomKey]).map((subCategory, subCategoryIndex) => (
                                                                    <>
                                                                    <li key={subCategoryIndex}
                                                                        data-val={'sub-tab-room-'+subCategoryIndex} 
                                                                        style={{ display: roomSubClicked === `sub-tab-room-${subCategoryIndex}` ? 'block' : 'none' }}
                                                                    >
                                                                        
                                                                        {Object.entries(roomImages[roomKey][subCategory]).map(([key, value]) => (
                                                                            <div key={key}>
                                                                                {Object.entries(value).map(([subItem, subItemValue]) => (
                                                                                    <img key={subItem} src={subItemValue} />
                                                                                ))}
                                                                            </div>
                                                                        ))}
                                                                    </li>
                                                                    </>
                                                                ))}
                                                            </ul>
                                                            <Form.Group controlId="EquipmentImage" className="mb-3 upload-wrap text-right">
                                                                <Form.Control type="file" onChange={handleInputChange}/>
                                                                <Form.Label>Upload</Form.Label>
                                                            </Form.Group>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Form.Group controlId="EquipmentImage" className="mb-3 upload-wrap text-right">
                                                    <Form.Control type="file" onChange={handleInputChange}/>
                                                    <Form.Label>Upload</Form.Label>
                                                </Form.Group>
                                            </>
                                        ))
                                    ) : (
                                        <div className='tab-content-item'>
                                            <div className='content-inner-tab'>
                                                <ul>
                                                    <li onClick={() => handleImageClick('sub-tab-0')}>Images </li>
                                                    <li onClick={() => handleImageClick('sub-tab-1')}>Videos </li>
                                                    <li onClick={() => handleImageClick('sub-tab-2')}>Drawings</li>
                                                    <li onClick={() => handleImageClick('sub-tab-3')}>Marked & Raw Images</li>
                                                </ul>
                                            </div>
                                            <div className='inner-item-wrap' >
                                                {Object.keys(building.building_and_roof_images[category]).map((subCategory, subCategoryIndex) => (
                                                    <>                                                        
                                                        <div key={subCategoryIndex} className='inner-content-item' 
                                                            data-val={'sub-tab-'+subCategoryIndex} 
                                                            style={{ display: imageClicked === `sub-tab-${subCategoryIndex}` ? 'block' : 'none' }}
                                                        >
                                                            <ul>
                                                                {Object.keys(building.building_and_roof_images[category][subCategory]).map((item, itemIndex) => (
                                                                    <li key={itemIndex}>
                                                                        {subCategory}
                                                                        {Object.keys(building.building_and_roof_images[category][subCategory][item]).map((subItem, subItemIndex) => (
                                                                            <img key={subItemIndex} src={building.building_and_roof_images[category][subCategory][item][subItem]} />
                                                                        ))}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <Form.Group controlId="EquipmentImage" className="mb-3 upload-wrap text-right">
                                                                <Form.Control type="file" onChange={handleInputChange}/>
                                                                <Form.Label>Upload</Form.Label>
                                                            </Form.Group>
                                                        </div>
                                                    </>
                                                ))}
                                            </div>
                                            
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    
                </Col>
                {imageView ? 
                    <></>
                :   <div className='building-images-arrow'>
                        <button onClick={handleBuildingImages}>
                            <img src={BuildPlaceholderImage} alt='' />
                        </button>
                        <span>Images</span>
                    </div>
                }
            </Row>
            
        </>
    )
}

function RoomInformation({
    room, 
    roomIndex,
    onRoomDataReceived,
    prefetchRoomName,
    prefetchRoomType,
    prefetchNewEquipment
}) {

    const [values, setValues] = useState({
        roomName: prefetchRoomName,
        roomType:prefetchRoomType,
        newEquipment: prefetchNewEquipment
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
          ...prevValues,
          [name]: value
        }));        
    };

    useEffect(() => {
        onRoomDataReceived(roomIndex, values)
        console.log(values);
    }, [values]);

    if (!Array.isArray(room)) {
        // If roomDetails is not an array, convert it to an array
        room = Object.values(room);
    }

    const [selectedEquipment, setSelectedEquipment] = useState(false);

    const handleEquipmentInputChange = (event) => {
        
        setSelectedEquipment(true);
        console.log(selectedEquipment +"-----"+ event.target.value)
    }

   

    return (
        <>
            <Row>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId="roomName"
                        label="Room Functional Name*"
                        className=""
                    >
                        <Form.Control 
                            type="text" 
                            placeholder=""  
                            value={values.roomName} 
                            name="roomName"
                            onChange={handleInputChange}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" >
                    <FloatingLabel
                        controlId=""
                        label="Room Type"
                        className=""
                    >
                        <Form.Control 
                            as="select" 
                            type="select" 
                            controlId="roomType" 
                            name="roomType" 
                            className='col-12 form-select px-0'
                            value={values.roomType}
                            onChange={handleInputChange}
                        >
                            <option>Choose room type</option>
                            <option value="bedroom">Bed Room</option>
                            <option value="storage_room">Storage Room</option>
                            <option value="electricityroom">Electricity Room</option>
                        </Form.Control>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" >
                    <FloatingLabel
                        controlId="newEquipment"
                        label="Add New Equipment"
                        className=""
                    >
                        <Form.Control 
                            type="text" 
                            placeholder=""  
                            value={values.newEquipment} 
                            name="newEquipment"
                            onChange={handleInputChange}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 col-md-12 equipment-table">
                <div>
                    {room.map((roomsTag, index) => {
                        const roomKey = Object.keys(roomsTag)[3];
                        const roomData = roomsTag[roomKey];

                        
                        return (
                            <div key={index}>
                                <Table width="100%">
                                    <thead>
                                        <tr>
                                            <th>Equipment Name</th>
                                            <th>Equipment Type</th>
                                            <th>Wattage</th>
                                            <th>Quantity</th>
                                            <th>Operating Hours</th>
                                            <th>Wattage Summary</th>
                                            <th>Equipment Image </th>
                                            <th>Equipment Name Plate </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomData.map((equipments, equipmentsIndex) => (
                                            <tr key={equipmentsIndex}>
                                                <td>
                                                
                                                <Form.Control 
                                                    as="select" 
                                                    type="select" 
                                                    controlId="equipmentName" 
                                                    name="roomType" 
                                                    className='col-12 form-select px-0'
                                                    value={ selectedEquipment ? selectedEquipment : equipments.equipment_name}
                                                    onChange={handleEquipmentInputChange}
                                                >
                                                    
                                                    <option value="tv">Tv</option>
                                                    <option value="monitor">Monitor</option>
                                                    <option value="ac">AC</option>
                                                </Form.Control>
                                                
                                                    
                                                </td>
                                                <td>{equipments.equipment_type}</td>
                                                <td>{equipments.wattage}</td>
                                                <td>{equipments.quantity}</td>
                                                <td>{equipments.operating_hours}</td>
                                                <td>{equipments.wattage_summary}</td>
                                                <td>
                                                    <Form.Group controlId="EquipmentImage" className="upload-wrap text-center">
                                                        <Form.Control type="file" onChange={handleInputChange}/>
                                                        <Form.Label>Upload</Form.Label>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group controlId="EquipmentNamePlate" className="upload-wrap text-center">
                                                        <Form.Control type="file" onChange={handleInputChange}/>
                                                        <Form.Label>Upload</Form.Label>
                                                    </Form.Group>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        );
                    })}
                </div>
                </Form.Group>
            </Row>
        </>
    )
}

export default App;