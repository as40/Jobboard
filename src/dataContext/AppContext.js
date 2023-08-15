import { createContext, useReducer, useContext } from "react"
import appReducer, { initialState } from "./appReducer";
const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const updateFormData = (formData) => {
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: {
            formData: formData
          }
        });
      };

      const showModalData = (data) => {
        dispatch({
          type: "SHOW_MODAL",
          payload: {
            showModal: data
          }
        });
      };

      const formEditData = (data) => {
        dispatch({
          type: "FORM_EDIT",
          payload: {
            formEditMode: data
          }
        });
      };

      const updateJobList = (data) => {
        dispatch({
          type: "UPDATE_JOB_LIST",
          payload: {
            jobList: data
          }
        });
      };
      
      const value = {
        formData: state.formData,
        formEditMode: state.formEditMode,
        showModal: state.showModal,
        jobList: state.jobList,
        updateFormData,
        showModalData,
        formEditData,
        updateJobList,
      };

      return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

};

const useApp = () => {
    const context = useContext(AppContext)
  
    if (context === undefined) {
      throw new Error("useApp must be used within AppContext")
    }
  
    return context
  }
  
export default useApp

