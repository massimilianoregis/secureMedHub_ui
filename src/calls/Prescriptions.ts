import axios, { AxiosResponse } from 'axios';

export interface Procedure{
    number:number,
    method:string,
    consent:string,
    post_care_instruction:string
  }
  export interface Assessment {
    name:string,
    where?:string,
    expectations?:string,
    note:string,
    prescriptions?:string[]
    referrals?:string[],
    contact_office_if?:string
    procedures?:Procedure[]
  }
  export interface Prescription {
    when: Date;
    where?: string; //onsite/telephone/video
    type: string; //optometry/today
    who?: string;
    assessment?:Assessment[],
    conclusion?:string
  }

  export interface Prescriptions{
    visits:Prescription[];
  }

  class Calls {
    getPrescriptions(id:string): Promise<Prescription[]>{      
      return new Promise((ok,ko)=>{
      const options = {
        method: 'GET',
        url: `/patient/${id}/prescription`
      };
      axios.request(options)
        .then((response: AxiosResponse)  =>{
          
          ok(response.data)
        })
        .catch(ko);
      })
    }
  }

  export default new Calls();