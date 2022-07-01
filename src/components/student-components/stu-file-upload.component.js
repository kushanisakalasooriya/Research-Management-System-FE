import React, { useState, useRef, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col } from 'react-bootstrap';

const StuFileUpload = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [data, setData] = useState({
    // groupname: '',
    submissionTypes: [],
  });
  const [submissionName, SetsubmissionName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/admin/submissionType/')
      .then(response => {
        if (response.data.length > 0) {
          setData({
            submissionTypes: response.data.map(submission => submission.submissionName)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  // console.log('types', data.submissionTypes);


  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const subName = submissionName;
      const groupname = sessionStorage.getItem("group");
      const sub = subName.submissionName;
      // if (groupname.trim() !== '' && submissionName.trim() !== '') {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('groupname', groupname);
        formData.append('submissionName', sub);

        setErrorMsg('');
        await axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student-submission/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        props.history.push('/student-home');
      } else {
        setErrorMsg('Please select a file to add.');
      }
      // } else {
      //   setErrorMsg('Please enter all the field values.');
      // }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  // const onChangeSubmissionName = (e) => {
  //    SetsubmissionName({
  //     submissionName: e.target.value
  //   })

  //   console.log('1', submissionName);
  //   console.log('2', e.target.value);
  // }

  const onChangeSubmissionName = async (e) => {
    SetsubmissionName({
      submissionName: e.target.value
    })
    await axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/admin/submissionType/getSubmissionId/' + e.target.value)
      .then(response => {
        if (response.data.length > 0) {
          // this.setState({
          //   description: response.data[0].description,
          //   deadline:response.data[0].deadline.substring(0,10)
          // })
          setDeadline(response.data[0].deadline.substring(0, 10));
          setDescription(response.data[0].description);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const onChangeDeadline = (date) => {
    setDeadline(date);
  }

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  return (
    <React.Fragment>
      <hr />
      <h3>System Admin - Document / Presentation Template Upload Portal</h3>
      <hr />
      <br />
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="groupname">
              <Form.Label> Group name </Form.Label>
              <Form.Control
                type="text"
                name="groupname"
                required
                readOnly
                value={sessionStorage.getItem("group") || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Group controlId="Submission Type">
              <Form.Label> Submission Type</Form.Label>
              <Form.Select aria-label='Default select example'
                required
                className="form-control"
                value={submissionName}
                onChange={onChangeSubmissionName}
              // onChange={(e) => setState({submissionName: e.target.value})}
              >
                {
                  data.submissionTypes.map(function (submission) {
                    return <option
                      key={submission}
                      value={submission}>{submission}
                    </option>;
                  })
                }

              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="decsription">
              <Form.Label> Description </Form.Label>
              <Form.Control
                type="text"
                name="description"
                required
                readOnly
                value={description}
                onChange={onChangeDescription}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="deadline">
              <Form.Label> Deadline </Form.Label>
              <Form.Control
                type="text"
                name="deadline"
                required
                readOnly
                value={deadline}
                onChange={onChangeDeadline}
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div style={{ backgroundColor: "skyBlue", width: '40%' }}{...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} style={{ height: "100px", backgroundColor: "skyBlue" }} />
                <p>Drag and drop a file OR<button style={{ color: "red", border: "none", backgroundColor: 'transparent' }}>click here</button>to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" style={{ width: "200px", height: "200px;" }} src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <br />
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
        <br />
        {/* <Button  style={{marginBottom:"20px", float:'right', width:'25%', color:'black'}} type="submit" className='btn btn-outline-dark'>
          Submit
        </Button> */}
        <button style={{ marginBottom: "20px", float: 'right', width: '25%', color: 'black' }} type="submit" className='btn btn-outline-dark'>
          SUBMIT
        </button>
      </Form>
    </React.Fragment>
  );
};

export default StuFileUpload;
