import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import data from './data/data.json'

ReactDOM.render(
  <BrowserRouter><App data={data}/></BrowserRouter>,
  document.getElementById('root')
)
