import React, { useState } from "react";
import useApp from "../dataContext/AppContext";
import company from '../assets/icons/company-logo.png';
import deleteIcon from '../assets/icons/icon-delete.svg';
import editIcon from '../assets/icons/icon-edit.svg';
import axios from "axios";
import { apiEndPoint } from "../config";

const JobCard = ({handleUpdateJobList}) => {
  const {jobList,updateFormData,showModalData,formEditData} = useApp();  
  const [loading,setLoading] = useState(false);

  const editJob=(id)=>{
    axios.get(apiEndPoint+'jobs/'+id).then((response)=>{
      updateFormData(response.data)
      showModalData(1)
      formEditData({id:response.data.id,editMode: true})
    })
  }

  const deleteJob=(id)=>{
    setLoading(true);
    axios.delete(apiEndPoint+'jobs/'+id).then((response)=>{
        handleUpdateJobList();
        setLoading(false);
    })
  }

  return (
    <>
    {jobList && jobList.length && jobList.map((job,index)=>{
            return (<div key={'job-'+index} className='px-6 py-4 bg-white rounded-[10px] relative'>
                      <img src={editIcon} className="absolute right-[20px] w-[25px] cursor-pointer" onClick={()=>{editJob(job.id)}}/>
                      <img disabled={loading} src={deleteIcon} className="absolute right-[20px] bottom-[20px] w-[25px] cursor-pointer" onClick={()=>{deleteJob(job.id)}}/>
                      <div className='flex text-left'>
                        <div>
                          <img src={company}/>
                        </div>
                        <div>
                          <p className='text-2xl ml-2'>{job.job_title}</p>
                          <p className='text-base ml-2'>{job.company_name} - {job.industry}</p>
                          <p className='text-base ml-2 text-[#646464]'>{job.location} ({job.remote_type})</p>
                          <div className='mt-6 mb-6'>
                            <p className='text-base ml-2 mb-2 text-[#212427]'>Part-Time (9.00 am - 5.00 pm IST)</p>
                            <p className='text-base ml-2 mb-2 text-[#212427]'>Experience ({job.experience.min} - {job.experience.max})</p>
                            <p className='text-base ml-2 mb-2 text-[#212427]'>INR (₹) {job.salary.min} - {job.salary.max} / Month</p>
                            <p className='text-base ml-2 text-[#212427]'>{job.total_employee} employees</p>
                          </div>
                          <div>
                            {job.apply_type == "Quick"?<button className='rounded-md bg-[#1597E4] px-4 py-2 text-white' data-modal-target="defaultModal" data-modal-toggle="defaultModal">Apply Now</button>:
                            <button className='rounded-md bg-white px-4 py-2 border-[#1597E4] border text-[#1597E4]'>External Apply</button>}
                          </div>
                        </div>
                      </div>
                    </div>)
          })}
     </>
  );
};

export default React.memo(JobCard);