// import React, { useState } from 'react';
// import { Tab, Tabs, Row, Col, Form, Button } from 'react-bootstrap';

// function DynamicTabs() {
//     const [tabs, setTabs] = useState([
//         { eventKey: "0", title: "Tab 1" },
//         { eventKey: "1", title: "Tab 2" },
//     ]);

//     const [tabFormData, setTabFormData] = useState([
//         [{ id: 0, Equipment: '', EquipmentType: '', Wattage: '', Qty: '' }],
//         [{ id: 0, Equipment: '', EquipmentType: '', Wattage: '', Qty: '' }],
//     ]);

//     const handleAddTab = () => {
//         const newKey = String(tabs.length);
//         const newTitle = `Tab ${tabs.length + 1}`;
//         setTabs([...tabs, { eventKey: newKey, title: newTitle }]);
//         setTabFormData([...tabFormData, [{ id: 0, Equipment: '', EquipmentType: '', Wattage: '', Qty: '' }]]);
//     };

//     const handleAddRow = (tabIndex) => {
//         const newId = tabFormData[tabIndex].length;
//         const newFormData = [...tabFormData];
//         newFormData[tabIndex] = [...newFormData[tabIndex], { id: newId, Equipment: '', EquipmentType: '', Wattage: '', Qty: '' }];
//         setTabFormData(newFormData);
//     };

//     const handleInputChange = (event, tabIndex, rowIndex, fieldName) => {
//         const { name, value } = event.target;
//         const newFormData = [...tabFormData];
//         newFormData[tabIndex][rowIndex][fieldName] = value;
//         setTabFormData(newFormData);
//     };

//     const handleTest = (event) => {
//         console.log(tabFormData)
//     }

//     return (
//         <>
//         <Tabs defaultActiveKey="0" id="dynamic-tabs">
//             {tabs.map((tab, tabIndex) => (
//                 <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
//                     {tabFormData[tabIndex].map((formData, rowIndex) => (
//                         <Row key={`${tabIndex}-${rowIndex}`}>
//                             <Col>
//                                 <Form.Group className="mb-4 d-flex align-items-end">
//                                     <Form.Control required as="select" type="select" name={`Equipment-${tabIndex}-${rowIndex}`} className='form-select' value={formData.Equipment} onChange={(e) => handleInputChange(e, tabIndex, rowIndex, 'Equipment')}>
//                                             <option value="Light">Light</option>
//                                             <option value="Fan">Fan</option>
//                                             <option value="Television">Television</option>
//                                             <option value="Setup Box">Setup Box</option>
//                                             <option value="Router">Router</option>
//                                             <option value="Computer">Computer</option>
//                                             <option value="Air Conditioner">Air Conditioner</option>
//                                             <option value="Refrigerator">Refrigerator</option>
//                                             <option value="Iron Box">Iron Box</option>
//                                             <option value="Kettle">Kettle</option>
//                                             <option value="Washing Machine">Washing Machine</option>
//                                             <option value="Projector">Projector</option>
//                                             <option value="Micro Owen">Micro Owen</option>
//                                             <option value="Water purifier">Water purifier</option>
//                                             <option value="Toaster">Toaster</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                                 {/* Other form groups */}
//                             </Col>
//                         </Row>
//                     ))}
//                     <Row>
//                         <Col className='text-center mt-3'>
//                             <Button className='add-details-btn' onClick={() => handleAddRow(tabIndex)}>
//                                 Add Details
//                             </Button>
//                         </Col>
//                     </Row>
//                 </Tab>
//             ))}
            
//         </Tabs>
//         <button onClick={handleAddTab}>Add Tab</button>

//         <button onClick={handleTest}>Test</button>
//         </>
//     );
// }

// export default DynamicTabs;


// 1. Analyzed UI design for better enhancement in Gsolve
// 2. Created Version tracking ux design

import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function App() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  return (
    <div className="App">
      
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
      </div>
    </div>
  )
}

export default App;


