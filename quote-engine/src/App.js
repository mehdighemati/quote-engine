import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./App.css";



export default function App() {
  const { register, handleSubmit } = useForm();
  const [ quote, setQuote] = useState([]);


  const OnSubmit = data => {
    const formData = data

    data.pickupPostcode = data.pickupPostcode.replace(/ /g, '')
    data.deliveryPostcode = data.deliveryPostcode.replace(/ /g, '')

    data = JSON.stringify(data)
    
    const options = {
      method: 'post',
      url: 'http://localhost:8080/quote',
      data: data,
      headers:{'Content-Type': 'application/json; charset=utf-8'}
    };
    axios(options)
    .then((response) => {
      setQuote(Object.values(response.data));
    }, (error) => {
      console.log(error);
    })
    
    
  };

  


  const DisplayQuote = ({quote}) => {
    if (quote.length === 0) {
      console.log(quote)
      return (
        <p>:)</p>
      )
    }
    else {
      console.log(quote)
      return (
        <>
        <p>A delivery from {quote[0]} to {quote[1]} using a {quote[2]} will cost you £{quote[3]}. </p>
        </>
      )
    }
  }

  return (
    <>
    <h1>eBay Quote Engine</h1>
    <form onSubmit={handleSubmit(OnSubmit)}>
      <label> Pickup Postcode</label>
      <input name="pickupPostcode" ref={register} />
      <label> Delivery Postcode</label>
      <input name="deliveryPostcode" ref={register} />
      <label>Vehicle Selection</label>
      <select name="vehicleType" ref={register}>
        <option value="bicycle">Bicycle</option>
        <option value="motorbike">Motorbike</option>
        <option value="parcel_car">Parcel car</option>
        <option value="small_van">Small van</option>
        <option value="large_van">Large van</option>
      </select>
      <input type="submit" />
    </form>

    <DisplayQuote quote={quote} ></DisplayQuote>
    </>
  );
      
}





const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
