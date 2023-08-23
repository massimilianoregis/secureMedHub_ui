import axios, { AxiosResponse } from 'axios';

export interface Patient{
  id:string
  visit:string
}  
export interface User{  
    id:string,  
    name:string
    visitType?:any
    email:string
    features:any
    patient?:Patient
    admit(name:string):boolean;
  }

  
  class Calls {
    getUserMe(): Promise<User[]>{      
      return new Promise((ok,ko)=>{
      const options = {
        method: 'GET',
        url: `/2022-10/auth/me`
      };
      axios.request(options)
        .then((response: AxiosResponse)  =>{
          ok(response.data)
        })
        .catch(ko);
      })
    }

    fakeLogin(name:string): Promise<User[]>{      
      return new Promise((ok,ko)=>{
      const options = {        
        withCredentials: true,
        method: 'GET',
        url: `/2022-10/auth/login/${name}`        
      };
      axios(options)
        .then((response: AxiosResponse)  =>{
          ok(response.data)
        })
        .catch(ko);
      })
    }
  }

  export default new Calls();