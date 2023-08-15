import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useApp from "../dataContext/AppContext";

const Step1ModalForm = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({mode: "onBlur"});
  const {showModal,formData,formEditMode,updateFormData,showModalData,formEditData} = useApp();
  const handleSubmitForm = (data) => {
    updateFormData({...formData,...data});
    showModalData(2)
    reset();
  };
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
        setValue('job_title', formData?.job_title);
        setValue('company_name', formData?.company_name);
        setValue('industry', formData?.industry);
        setValue('location', formData?.location);
        setValue('remote_type', formData?.remote_type);
    }
  },[formEditMode?.editMode])
  
  return (
    <>
      {showModal == 1 ? (
        <>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div id="outer" onClick={handleClose} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#2d2b2bbd] font-body">
          <div className="w-[577px] h-[564px] p-8 bg-white rounded-[10px] border border-neutral-200 flex-col justify-start items-center gap-8 inline-flex">
            <div className="flex-col justify-start items-start gap-24 flex">
                <div className="h-[364px] flex-col justify-start items-start gap-6 flex">
                    <div className="w-[513px] justify-between items-center gap-2 inline-flex">
                        <div className="text-xl font-medium text-[#182021]">Create a job</div>
                        <div className="text-right text-base font-medium text-[#182021]">Step 1</div>
                    </div>
                    <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                            <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                <div><span className="text-sm font-medium leading-tight text-[#182021] mb-[4px]">Job title</span><span className="text-red-400 text-sm font-medium leading-tight">*</span></div>
                            </div>
                            <input 
                                placeholder="ex. UX UI Designer" 
                                className="self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex placeholder-[#7A7A7A]" 
                                name="job_title"
                                {...register('job_title', { required: "Job Title is required" } )}
                            />
                            <div className="relative w-full">
                                <span className="text-xs absolute right-0 text-red-400">{errors?.['job_title'] && errors['job_title'].message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                            <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                <div><span className="text-neutral-800 text-sm font-medium leading-tight text-[#182021] mb-[4px]">Company name</span><span className="text-red-400 text-sm font-medium leading-tight">*</span></div>
                            </div>
                            <input 
                                placeholder="ex. Google" 
                                className="placeholder-[#7A7A7A] self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex" 
                                name="company_name"
                                {...register('company_name', { required: "Company Name is required" } )}
                                />
                            <div className="relative w-full">
                                <span className="text-xs absolute right-0 text-red-400">{errors?.['company_name'] && errors['company_name'].message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                            <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                <div><span className="text-neutral-800 text-sm font-medium leading-tight text-[#182021] mb-[4px]">Industry</span><span className="text-red-400 text-sm font-medium leading-tight">*</span></div>
                            </div>
                            <input 
                                placeholder="ex. Information Technology" 
                                className="placeholder-[#7A7A7A] self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex" 
                                name="industry"
                                {...register('industry', { required: "Industry is required" } )}
                                />
                            <div className="relative w-full">
                                <span className="text-xs absolute right-0 text-red-400">{errors?.['industry'] && errors['industry'].message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-end gap-6 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                                <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                    <div className="text-neutral-800 text-sm font-medium leading-tight text-[#182021] mb-[4px]">Location</div>
                                </div>
                                <input name="location" 
                                       {...register('location')}
                                       placeholder="ex. Chennai" 
                                       className="placeholder-[#7A7A7A] self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex" />
                                
                            </div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
                                <div className="w-[214px] justify-start items-center gap-2 inline-flex">
                                    <div className="text-neutral-800 text-sm font-medium leading-tight text-[#182021] mb-[4px]">Remote type</div>
                                </div>
                                <input name="remote_type" {...register('remote_type')}  placeholder="ex. In-office" className="placeholder-[#7A7A7A] self-stretch px-3 py-2 bg-white rounded-[5px] border border-neutral-200 justify-start items-start gap-2.5 inline-flex" />
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[513px] justify-end items-center inline-flex">
                    <div className="justify-start items-start gap-6 flex">
                        <button type="submit" className="cursor-pointer px-4 py-2 bg-[#1597E4] rounded-md shadow justify-center items-center flex text-white text-base font-medium leading-normal">
                            Next
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

export default React.memo(Step1ModalForm);