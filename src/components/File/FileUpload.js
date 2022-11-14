import React, { Fragment, useEffect, useState } from 'react';
import{useParams} from "react-router-dom";
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const FileUpload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
const params=useParams();



useEffect(()=>{
  console.log(props.data8);
})
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
 
  const Submitform=async(e)=>{
    
e.preventDefault();
props.onclikcformPass(filename);

    console.log(filename);
  }
  

  return(

    <>
       <form onSubmit={Submitform}>
        <input type='file' onChange={onChange} ></input>
        <input type="submit" value="Add"/>
       </form>
    
    </>
  );
};

export default FileUpload;
