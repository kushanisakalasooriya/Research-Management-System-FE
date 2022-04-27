import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import EditAdminFile from './admin-doc-edit.component';
import { Link } from 'react-router-dom';


const FilesList = (props) => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/admin/getAllFiles`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/admin/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  const deleteFile = async (id) => {
    try{
    axios.delete(`${API_URL}/file-delete/${id}`)
    .then(response => { console.log(response.data)});
    window.location.reload(true);
  }catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while deleting file. Try again later');
      }
    }
  };


  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table" id="admin-files-table">
        <thead>
        {filesList.length>0?(
          <tr>
            <th style={{width:"300px"}}>Title</th>
            <th style={{width:"300px"}}>Description</th>
            <th style={{width:"300px"}}>Download File</th>
            <th style={{width:"300px"}}>Delete File</th>
            <th style={{width:"300px"}}>Update File</th>
          </tr>
        ):(<tr></tr>)}
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                  <td>
                  <a style={{color:"red"}}
                      href="#/"
                      onClick={() =>
                        deleteFile(_id)
                      }
                    >
                      Delete
                    </a>
                  </td>
                  <td>
                  <a style={{color:"red"}}
                      href="#/"
                    >
                      <Link to={"/admin-file-edit/"+_id} component={EditAdminFile}>Update</Link>
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
            
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;
