import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [phoneNumber , setPhoneNumber] = useState('');

  const [headerData , setHeaderData] = useState(null);

  const handleChange = (e) =>{
    // const value = e.target.value;
    // if (/^\d*$/.test(value)) {
    //   setPhoneNumber(value);
    // }
    setPhoneNumber(e.target.value);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
  
    if (phoneNumber.length <10) {
      alert('Please enter 10 digit phone number');
      setPhoneNumber('');
      return;
    }

    try{
      const response = await axios.post('https://chimpu.online/api/post.php',{phonenumber:phoneNumber});

      const headers = response.data;

      setHeaderData(headers);

    }
    catch (err){

      console.log('Error posting data',err)

    }

    finally{
      setPhoneNumber('');
    }

  }
  console.log(phoneNumber)

  return (
    <div className="App">

      <h1 className='heading'>Post Phone Number</h1>
      
      <form onSubmit={handleSubmit}>
        <input type='text' value={phoneNumber} onChange={handleChange} placeholder='Enter the phone number' className='input' pattern='\d*'/>
        <button type='submit' className='btn'>Submit</button>
      </form>

      {headerData && (
        <div>
          <h2>Response Headers :</h2>
          <p>{headerData.msg}</p>
          <p>{headerData.error}</p>
          <p>{headerData.error_code}</p>
        </div>
      )}
    </div>
  );
}

export default App;
