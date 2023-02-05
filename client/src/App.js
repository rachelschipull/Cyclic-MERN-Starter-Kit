import React, { useEffect, useState } from 'react'
import FeatureOne from './features/FeatureOne';
import FeatureTwo from './features/FeatureTwo';
import NavBar from './features/NavBar';
import { Routes, Route } from 'react-router-dom';
import Layout from './features/Layout';
import APIService from './services/apiService';
import MainPage from 'features/MainPage';


const App = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [formStringField, setFormStringField] = useState("");
  const [formNumberField, setFormNumberField] = useState(0);
  const [formDateField, setFormDateField] = useState();

  // Fetch events from server
  const fetchData = async () => {
    // Database data from server
    console.log("FETCHING...");
    const response = await APIService.getAllExamples();
    setData(response.data);
    console.log("FETCHED:", response.data);
  }
  
  // Fetch the data on page load, don't set loading to false until data's fetched.
  useEffect(() => {
    setLoading(true);
    fetchData()
    .then(setLoading(false)).catch(setLoading(false));
  }, [])

  useEffect(() => {
    if (formStringField) {
      console.log(formStringField, "///", formNumberField, "///", formDateField);
    }
  }, [formStringField, formNumberField, formDateField])

  /* Handle Data Changes */
  const handleChangeInForm = (e, setterToCall) => {
    // Set the target state to the new form field value
    // `${setterToCall}`(e.target);

    const {name, value} = e.target;
    console.log(name, value);
    console.log(eval(setterToCall)(value));
  }


  /* Data Submission */
  const dataToSubmit = {
    stringField: formStringField,
    numberField: formNumberField,
    dateField: formDateField
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example
    try {
      // Axios automatically serializes object to JSON
      // https://masteringjs.io/tutorials/axios/post-json
      const response = await APIService.createExample(dataToSubmit);
      console.log(response);
    } catch (err) {
      console.error(err)
      return
    }

    // Re-fetch data after addition
    fetchData();
  }

  /* Data Deletion */
  const handleDelete = async (event, idToDelete) => {
    try {
      const response = await APIService.deleteExample(idToDelete);
      console.log(response);
    } catch (err) {
      console.error(err)
      return
    }

    // Re-fetch data after delete
    fetchData();
  }

  // Render nothing while fetching for data from server
  if (loading) return null;

  return (
    <div className="">
      <NavBar />

      <main className="mx-[10%] text-center flex flex-col justify-center">
        <Layout />

        {/* TODO: Figure out how to keep context's state variable without refresh.
      Options include cookies, sessionStorage, or a routingContext like in together
      This should be discussed with the team */}
        <Routes>
          <Route index element={<MainPage/ >}></Route>
          <Route path="one" element={<FeatureOne />}></Route>
          <Route path="two" element={<FeatureTwo />}></Route>
        </Routes>

        <form className="mx-[20%] mt-10 px-[5%] border-2">
          <div className="mt-10 overflow-auto">
            <label className="float-left">String Field:</label>
            <input type="text" onChange={(e) => handleChangeInForm(e, "setFormStringField")} className="border-2 float-right" />
          </div>

          <div className="mt-10 overflow-auto">
            <label className="float-left">Number Field:</label>
            <input type="text" onChange={(e) => handleChangeInForm(e, "setFormNumberField")} className="border-2 float-right" />
          </div>

          <div className="mt-10 overflow-auto">
            <label className="float-left">Date Field:</label>
            <input type="date" onChange={(e) => handleChangeInForm(e, "setFormDateField")} className="border-2 float-right" />
          </div>

          <button className="my-10" onClick={(e) => handleSubmit(e)}>Press me to submit data!</button>
        </form>

        <h1 className="mt-20">Here is your Data:</h1>
        <div className="mx-[20%] mb-20">
          { data?.map(item =>
              <ul className="my-10" key={item._id}>
                <li>stringField: {item.stringField}</li>
                <li>numberField: {item.numberField}</li>
                <li>dateField: {item.dateField.substring(0,10)}</li>
                <button onClick={(e) => { handleDelete(e, item._id) }}> Delete Me!</button>
              </ul>
            )
          }
        </div>
      </main>

    </div>
  )
}

export default App