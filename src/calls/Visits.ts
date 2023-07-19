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
  export interface Visit {
    when: Date;
    where?: string; //onsite/telephone/video
    type: string; //optometry/today
    who?: string;
    assessment?:Assessment[],
    conclusion?:string
  }

  export interface Visits{
    visits:Visit[];
  }

  class Calls {
    getVisits(id:string): Promise<Visit[]>{      
      return new Promise((ok,ko)=>{
      const options = {
        method: 'GET',
        url: `/patient/${id}/visit`
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