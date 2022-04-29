import React from "react";
import { useState, useEffect } from 'react'
import Tab from './Tab'
import Table from './Table'
import Chart from './Chart'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    const covidVn = async () => {
      const response = await fetch('https://api.apify.com/v2/key-value-stores/EaCBL1JNntjR3EakU/records/LATEST?disableRedirect=true')
      const data = await response.json()
      setData(data)
    }
    covidVn()
  }, [])

  return (
    <div className="text-center main">
      <header className="header d-flex justify-content-center align-items-center p-2">
        <img 
        className='img-fluid' 
        style={{width:'40px', height: '40px', marginRight: '5px'}}
        src={`${process.env.PUBLIC_URL}/covidshield.png`} alt='covid-19'>
        </img>
        <h1 className="fw-bold text-white m-0">COVID-19</h1>
      </header>
      <Tab
      data={data} />
      <Chart 
      
      data={data} />
      <Table 
      
      data={data} />
    </div>
  );
}

export default App;
