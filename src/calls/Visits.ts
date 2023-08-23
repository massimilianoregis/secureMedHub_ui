import axios, { AxiosResponse } from 'axios';

export interface Procedure{
    number:number,
    name:string,
    consent:string,
    post_care_instruction:string
  }
  export interface Assessment {
    name:string,
    type:string,
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

  export interface AssessmentSummary{
    name:string
    component?:string
  }
  
  export interface VisitSummary{
    name:string
    assessments:AssessmentSummary[];
    component?:string
  }
  class Calls {
    getVisitTypes():Promise<VisitSummary[]>{
      return new Promise((ok,ko)=>{
        const options = {
          method: 'GET',
          url: `/2023-06/visit`
        };
        axios.request(options)
          .then((response: AxiosResponse)  =>{
            
            ok(response.data)
          })
          .catch(ko);
        })
    }
    getVisits(id:string): Promise<Visit[]>{      
      return new Promise((ok,ko)=>{
      const options = {
        method: 'GET',
        url: `/2023-06/patient/${id}/visit`
      };
      axios.request(options)
        .then((response: AxiosResponse)  =>{
          
          ok(response.data)
        })
        .catch(ko);
      })
    }

    saveVisit(data:any){
      return new Promise((ok,ko)=>{
        const options = {
          method: 'POST',
          url: `/2023-06/${data.type}/visit`,
          data:data
        };
        axios.request(options)
          .then((response: AxiosResponse)  =>{            
            ok(response.data)
          })
          .catch(ko);
        })
    }
    saveAssessment(data:any){
      return new Promise((ok,ko)=>{
        const options = {
          method: 'POST',
          url: `/2023-06/${data.type}/assessment`,
          data:data
        };
        axios.request(options)
          .then((response: AxiosResponse)  =>{            
            ok(response.data)
          })
          .catch(ko);
        })
    }
    saveProcedure(data:any){
      return new Promise((ok,ko)=>{
        const options = {
          method: 'POST',
          url: `/2023-06/${data.type}/procedure`,
          data:data
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