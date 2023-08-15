import React, { useState, useCallback, useEffect } from "react";
import './App.css';
import Step1ModalForm from './components/Step1ModalForm';
import Step2ModalForm from './components/Step2ModalForm';
import axios from "axios";
import useApp from "./dataContext/AppContext";
import JobCard from "./components/JobCard";
import { apiEndPoint } from "./config";

function App() {
  const [loading, setLoading] = useState(false);
  const {jobList,showModalData,formEditData, updateJobList} = useApp();
  useEffect(()=>{
    setLoading(true);
    axios.get(apiEndPoint+'jobs').then((response)=>{
      updateJobList(response.data);
      setLoading(false);
    })
  },[])

  const handleUpdateJobList =useCallback(()=>{
    axios.get(apiEndPoint+'jobs').then((response)=>{
      updateJobList(response.data);
    })
  },[jobList])

  const resetEditMode=()=>{
    formEditData({id:"",editMode: false})
  }

  const handleCreateJob=()=>{
    showModalData(1)
    resetEditMode();
  }

  return (
    <div className="App">
        <Step1ModalForm />
        <Step2ModalForm updateJobList={handleUpdateJobList} />
        <div className='flex justify-end mr-10 mt-4'>
          <button className='rounded-md bg-[#1597E4] px-4 py-2 text-white' onClick={handleCreateJob}>Create Job</button>
        </div>
        {loading && <div className="border bg-[#1597e4] border-black-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>}

      {!loading && <div className='grid grid-cols-1 md:grid-cols-2 gap-10 font-body px-10 py-4'>  
          <JobCard handleUpdateJobList={handleUpdateJobList}/>
      </div>}
    </div>
  );
}

export default App;
