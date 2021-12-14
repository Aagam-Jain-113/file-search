import React from 'react';
import './App.css';
import Highlighter from "react-highlight-words";

function App() {

  const [file, setFile] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [count, setCount] = React.useState(0);

  const handleFileChange = (e) => {
    const filename = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(filename);
    reader.onload = (e) => {
      setFile(e.target.result);
    }
    reader.onerror = (err) => {
      console.log(err);
    }
  }

  const highlight = React.useRef(null);
  React.useEffect(() => {
    if (searchTerm !== '') {
      setCount(document.getElementsByClassName('response').length);
    } else {
      setCount(0);
    }
  }, [searchTerm])


  return (
    <div className="App">
      <h1>File search</h1>
      <input type="file" className='file_choose' onChange={(e) => handleFileChange(e)} />
      {file &&
        <>
          <input type="text" className='search' autoFocus onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search' />
          <div className='box'>
            <Highlighter
              highlightClassName="response"
              useRef={highlight}
              searchWords={[searchTerm]}
              autoEscape={true}
              textToHighlight={file}
            />
          </div>
          <p className='occurences'>Number of occurences of {searchTerm} : {count}</p>
        </>
      }
    </div>
  );
}

export default App;
