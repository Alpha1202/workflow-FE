import axios from "axios";
import * as _ from 'lodash'
export const apiUrl = process.env.REACT_APP_API_URL;

export const API = async (callObj, dispatch) => {
  const { path, method, data = null, header = false,   } = callObj;
   
  const headers = { "Content-Type": "application/json" };
  let url = `${apiUrl}${path}`;

  try {

    const response = await axios({ method, url, data, headers, json: true });

    const result = response && response.data;
    
    if(header){
      return response
    } else {
      return result;
    }
   
  } catch (error) {
    console.log(error)
    const { data } = error?.response
      if(!_.isEmpty(data)){
        return data;
      }
    console.log({error})
    // throw error;
  }
  
};
