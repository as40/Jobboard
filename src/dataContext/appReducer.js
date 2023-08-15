export const initialState = {
    formData: {},
    showModal: false,
    formEditMode: {id:"",editMode:false},
    jobList: [],
  };

  const appReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case "UPDATE_FORM_DATA":  
        return {
          ...state,
          formData: payload.formData
        };
      case "SHOW_MODAL":  
        return {
          ...state,
          showModal: payload.showModal
        };
      case "FORM_EDIT":  
        return {
          ...state,
          formEditMode: payload.formEditMode
        };
        case "UPDATE_JOB_LIST":
        return {
          ...state,
          jobList: payload.jobList
        };
        default:
      throw new Error(`No case for type ${type} found in appReducer.`);
    }
  }
  
  export default appReducer