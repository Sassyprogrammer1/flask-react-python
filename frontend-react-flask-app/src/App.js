import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import './App.css';

//var apiPathOne = 'https://resume-extractor.dev.proedge.pwc.com/process_text'
var apiPathOne = 'http://localhost:5000/process_text'
var apiPathTwo = 'http://localhost:5000/process_resume'

const useStyles = makeStyles((theme) => ({
  div: {
    margin: '50px 0px 0px 350px',
  },
  textareaAutosize: {
    width: '538px'
  },
  materialTable: {
    width: '800px',
  },
}));

/**
  * @description this function returns the main app component
  */
function App() {

  const classes = useStyles();
  const [responseText, setResponseText] = useState(false);
  const [payload, setPayload] = useState(false);
  const [key, setKeys] = useState(false);
  const [value, setValue] = useState(false);
  const [valueAt, setValueAt] = useState(false);
  const [emsi, setEmsi] = useState('');
  const [attention, setAttention] = useState('');
  const [ngram, setNgram] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  /**
   * @params { None }
   * @returns { object } data
   * @description posts the text and resume file to the backend
   */
  const parseResume = async () => {
    var requestbody = responseText;
    if (typeof responseText.length === 'undefined' && isFilePicked === false) {
      console.log("please enter text");
      return "please enter text";
    }
    else {
      const files = new FormData();
      files.append('resume', selectedFile);
      let body = {
        "parsed_resume": { resume_summary: JSON.stringify(requestbody) }
      };
      let apiPath = isFilePicked ? apiPathTwo : apiPathOne;
      body = isFilePicked ? files : body;
      console.log('Parsing RselectedFileesume....');
      var data = await axios.post(`${apiPath}`, body)
        .then(response => {
          if (response !== null) {
            console.log('Api responded successfully!');
            console.log(
              { "Response": { attention: response.data.analysis_emsi_vs_attention, ngram: response.data.analysis_emsi_vs_ngram, skills_per_attention_extactor: response.data.skills_per_attention_extactor, skills_per_emsi_extactor: response.data.skills_per_emsi_extactor, skills_per_ngram_extactor: response.data.skills_per_ngram_extactor } }
            );
            console.log('statusText', response.statusText);
            let attention = JSON.parse(response.data.analysis_emsi_vs_attention)
            let ngram = JSON.parse(response.data.analysis_emsi_vs_ngram)
            let skillsPerAttentionExtactor = JSON.parse(response.data.skills_per_attention_extactor);
            let skillsPerEmsiExtactor = JSON.parse(response.data.skills_per_emsi_extactor);
            let skillsPerNgramExtactor = JSON.parse(response.data.skills_per_ngram_extactor);
            setEmsi(skillsPerEmsiExtactor);
            setAttention(skillsPerAttentionExtactor);
            setNgram(skillsPerNgramExtactor);
            setPayload(attention);
            setKeys(Object.keys(attention));
            setValue(Object.values(attention));
            setValueAt(Object.values(ngram));
            console.log(payload);
            console.log(selectedFile);
            console.log('emsi',Array.from(emsi).sort());
          }
        });
      return data;
    }
  }

  /**
   * @params { Number } num
   * @returns { Number } 
   * @description returns rounded number to two decimal places
   */
  const round = (num) => {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  };

  /**
   * @params { Object } event 
   * @description this function sets the state for the textfield
   */
  const handleChange = (event) => {
    var inputText = event.target.value;
    setResponseText(inputText);
  };

  /**
   * @params { Object } event 
   * @description this function sets the state for the fileupload 
   */
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'id',
      width: 150
    },
    {
      field: 'ngram',
      headerName: 'ngram',
      width: 150,
    },
    {
      field: 'attention',
      headerName: 'attention',
      width: 150,
    }
  ];

  const rows = [
    { id: (key ? `${key[4]}` : ''), ngram: (valueAt ? `${100 * round(valueAt[4]) + '%'}` : ''), attention: (value ? `${100 * round(value[4]) + '%'}` : '') },
    { id: (key ? `${key[5]}` : ''), ngram: (valueAt ? `${100 * round(valueAt[5]) + '%'}` : ''), attention: (value ? `${100 * round(value[5]) + '%'}` : '') },
    { id: (key ? `${key[7]}` : ''), ngram: (valueAt ? `${100 * round(valueAt[7]) + '%'}` : ''), attention: (value ? `${100 * round(value[7]) + '%'}` : '') },
    { id: (key ? `${key[8]}` : ''), ngram: (valueAt ? `${100 * round(valueAt[8]) + '%'}` : ''), attention: (value ? `${100 * round(value[8]) + '%'}` : '') },
    { id: (key ? `${key[0]}` : ''), ngram: (valueAt ? `${round(valueAt[0])}` : ''), attention: (value ? `${round(value[0])}` : '') },
    { id: (key ? `${key[2]}` : ''), ngram: (valueAt ? `${round(valueAt[2])}` : ''), attention: (value ? `${round(value[2])}` : '') },
    { id: (key ? `${key[3]}` : ''), ngram: (valueAt ? `${round(valueAt[3])}` : ''), attention: (value ? `${round(value[3])}` : '') },
    { id: (key ? `${key[1]}` : ''), ngram: (valueAt ? `${round(valueAt[0])}` : ''), attention: (value ? `${round(value[1])}` : '') },
    { id: (key ? `${key[6]}` : ''), ngram: (valueAt ? `${100 * round(valueAt[6]) + '%'}` : ''), attention: (value ? `${100 * round(value[6]) + '%'}` : '') },
  ];

  /**
   * @description this function return the submit button if text is rendered or file is chosen.
   */
  const SubmitButton = () => {
    return (
      <Button
        style={{
          marginTop: '10px',
        }}
        variant='contained'
        onClick={parseResume}
      >
        Submit
      </Button>
    )
  }

  /**
   * @description this function returns no textare if file is chosen  
   */
  const TextAreaVar = () => {
    return (
      <div></div>
    )
  }

  /**
   * @description this function returns no table if text or file are not submitted.
   */
  const ShowGrid = () => {
    return (
      <div></div>
    )
  }

  return (
    <div className={classes.div}>
      <div className={classes.divThree}>
        <div>
          {isFilePicked ? <TextAreaVar></TextAreaVar> : (
            <div>
              <FormLabel component="legend" style={{ marginTop: '10px', color: 'black', paddingBottom: '5px' }}>
                Enter text!
              </FormLabel>
              <TextareaAutosize
                className={classes.textareaAutosize}
                minRows={5}
                aria-label="empty textarea"
                placeholder="Empty"
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <input type="file" name="file" style={{ marginTop: '15px' }} onChange={changeHandler} />
        <div>
          {responseText || isFilePicked ? <SubmitButton /> : null}
        </div>
      </div>
      <div className={classes.divTwo}>
        <div>
          <FormLabel component="legend" style={{ marginTop: '20px', color: 'black', paddingBottom: '5px' }}>
            skills_per_emsi_extactor
          </FormLabel>
        </div>
        <div>
          <TextareaAutosize
            className={classes.textareaAutosize}
            minRows={3}
            aria-label="empty textarea"
            placeholder="None"
            value={`${Array.from(emsi).sort()}`}
          />
        </div>
        <div>
          <FormLabel component="legend" style={{ marginTop: '10px', color: 'black', paddingBottom: '5px' }}>
            skills_per_attention_extactor
          </FormLabel>
        </div>
        <div>
          <TextareaAutosize
            className={classes.textareaAutosize}
            minRows={3}
            aria-label="empty textarea"
            placeholder="None"
            value={`${Array.from(attention).sort()}`}
          />
        </div>
        <div>
          <FormLabel component="legend" style={{ marginTop: '10px', color: 'black', paddingBottom: '5px' }}>
            skills_per_ngram_extactor
          </FormLabel>
        </div>
        <div>
          <TextareaAutosize
            className={classes.textareaAutosize}
            minRows={3}
            aria-label="empty textarea"
            placeholder="None"
            value={`${Array.from(ngram).sort()}`}
          />
        </div>
      </div>
      {key ? (<div style={{ position: 'relative', height: 400, marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={9}
          disableSelectionOnClick
          style={{
            height: '580px',
            marginTop: '10px',
            width: '51%',
            position: 'absolute',
          }}
        />
      </div>) : <ShowGrid></ShowGrid>}
    </div>
  );
}

export default App;
