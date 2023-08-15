import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useApp from "../dataContext/AppContext";
import { apiEndPoint } from "../config";

const Step2ModalForm = ({updateJobList}) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({mode: "onBlur"});
  const {showModal,formData,formEditMode,updateFormData,showModalData,formEditData} = useApp();
  const [loading,setLoading] = useState(false);
  const handleSubmitForm = (data) => {
    const submitData = {
        ...formData,
        apply_type: data.apply_type,
        experience: {max: data.experience_max, min: data.experience_min},
        salary: {max: data.salary_max, min: data.salary_min},
        total_employee: data.total_employee,
    }
    setLoading(true);
    if(formEditMode?.editMode){
        axios.put(apiEndPoint+'jobs/'+formEditMode.id, submitData)
            .then(response => {
                reset();
                showModalData(false);
                setLoading(false);
                updateJobList();
                formEditData({id:"",editMode: false});
                updateFormData({});
            }).catch((err)=>console.log(err));
    }else{
        axios.post(apiEndPoint+'jobs', submitData)
            .then(response => {
                reset();
                showModalData(false);
                setLoading(false);
                updateJobList();
                updateFormData({});
            }).catch((err)=>console.log(err));
    }
    
    }
  const handleClose=(e)=>{
    e.stopPropagation();
    if(e.target.id == 'outer'){
        showModalData(false);
        updateFormData({});
        reset();
        formEditData({id:"",editMode: false});
    }
  }

  useEffect(()=>{
    if(formEditMode?.editMode){
        setValue('experience_min', formData?.experience?.min);
        setValue('experience_max', formData?.experience?.max);
        setValue('salary_min', formData?.salary?.min);
        setValue('salary_max', formData?.salary?.max);
        setValue('total_employee', formData?.total_employee);
        setValue('apply_type', formData?.apply_type);
    }
  },[formEditMode?.editMode])

  return (
    <>
      {showModal == 2 ? (
        <>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div id="outer" onClick={handleClose} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#2d2b2bbd] font-body">
          <div className="w-[577px] h-[564px] p-8 bg-white rounded-[10px] border border-neutral-200 flex-col justify-start items-center gap-8 inline-flex">
            <div className="flex-col justify-start items-start gap-24 flex">
                
                <div className="h-[364px] flex-col justify-start items-start gap-6 flex">
                    <div className="w-[513px] justify-between items-center gap-2 inline-flex">
                        <div className="text-xl font-medium text-[#182021]">Create a job</div>
                        <div className="text-right text-base font-medium text-[#182021]">Step 2</div>
                    </div>
                    <div className="self-stretch justify-start items-end gap-6 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                                <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                    <div className="text-neutral-800 text-sm font-medium leading-tight text-[#182021] mb-[4px]">Experience</div>
                                </div>
                                <input 
                                    placeholder="Minimum" 
                                    className="placeholder-[#7A7A7A] self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex" 
                                    name="experience_min"
                                    {...register('experience_min')}
                                    />
                            </div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                                <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                    <div className="text-neutral-800 text-sm font-medium leading-tight text-[#182021] mb-[4px]">&nbsp;</div>
                                </div>
                                <input name="experience_max"
                                    {...register('experience_max')} 
                                    placeholder="Maximum" 
                                    className="placeholder-[#7A7A7A] self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex" />
                                
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-end gap-6 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                                <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                    <div className="text-neutral-800 text-sm font-medium leading-tight text-[#182021] mb-[4px]">Salary</div>
                                </div>
                                <input name="salary_min"
                                    {...register('salary_min')} placeholder="Minimum" className="placeholder-[#7A7A7A] self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex" />
                                
                            </div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                                <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                    <div className="text-neutral-800 text-sm font-medium leading-tight text-[#182021]">&nbsp;</div>
                                </div>
                                <input name="salary_max"
                                    {...register('salary_max')} placeholder="Maximum" className="placeholder-[#7A7A7A] self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex" />
                                
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                            <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                <div><span className="text-sm font-medium leading-tight text-[#182021] mb-[4px]">Total employee</span></div>
                            </div>
                            <input 
                                placeholder="ex. 100" 
                                className="self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex placeholder-[#7A7A7A]" 
                                name="total_employee"
                                {...register('total_employee')}
                            />
                            <div className="relative w-full">
                                <span className="text-xs absolute right-0 text-red-400">{errors?.['total_employee'] && errors['total_employee'].message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                            <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                <div><span className="text-sm font-medium leading-tight text-[#182021] mb-[4px]">Apply Type</span><span className="text-red-400 text-sm font-medium leading-tight">*</span></div>
                            </div>
                            <div className="flex items-center h-[36px]">
                                <input {...register('apply_type', { required: "Apply Type is required" })} type="radio" 
                                    className="cursor-pointer w-[20px] h-[20px] appearance-none rounded-[20px] border-[#D8D8D8] border-2 checked:bg-[#1597E4]"
                                    id="quick" name="apply_type" value="Quick"
                                    />
                                <label htmlFor="quick" className="text-sm font-medium text-[#7A7A7A] ml-[4px]">Quick apply</label>
                                <input {...register('apply_type', { required: "Apply Type is required" })} type="radio" 
                                    className="cursor-pointer ml-[16px] w-[20px] h-[20px] appearance-none rounded-[20px] border-[#D8D8D8] border-2 checked:bg-[#1597E4]"
                                    id="external" name="apply_type" value="External"
                                    />
                                <label htmlFor="external" className="text-sm font-medium text-[#7A7A7A] ml-[4px]">External apply</label>
                            </div>
                            <div className="relative w-full">
                                <span className="text-xs absolute right-0 text-red-400">{errors?.['apply_type'] && errors['apply_type'].message}</span>
                            </div>
                        </div>
                    </div>  
                </div>
                <div className="w-[513px] justify-end items-center inline-flex">
                    <div className="justify-start items-start gap-6 flex">
                        <button disabled={loading} type="submit" className="cursor-pointer px-4 py-2 bg-[#1597E4] rounded-md shadow justify-center items-center flex text-white text-base font-medium leading-normal">
                            {formEditMode.editMode?"Update":"Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
        </>
      ) : null}
    </>
  );
};

export default React.memo(Step2ModalForm);