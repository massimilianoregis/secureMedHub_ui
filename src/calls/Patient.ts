import axios, { AxiosResponse } from 'axios';

export interface RangeValue{
  unit:string,
  min?:number,
  max?:number,
  value:number
}
export interface PatientRange{
  "first_name":string,
  "last_name":string,
  "birth_date":string,
  "bloodPressure": {
    "Systolic": RangeValue,
    "Diastolic": RangeValue,
    "Test":RangeValue
  },
  "heartRate": RangeValue,
  "respiratoryRate": number,
  "bodyTemperature": number,
  "oxygenSaturation": RangeValue,
  "bodyWeight": number,
  "bodyHeight": number,
  "cholesterol": {
    "Total": RangeValue,
    "HDL": RangeValue,
    "LDL": RangeValue,
    "Triglycerides": RangeValue
  },
  "electrolytes": {
    "Sodium": RangeValue,
    "Potassium": RangeValue,
    "Calcium": RangeValue,
    "Magnesium": RangeValue,
    "Phosphorus": RangeValue
  },
  "kidneyFunction": {
    "Creatinine": RangeValue,
    "Blood Urea Nitrogen (BUN)": RangeValue,
    "Estimated Glomerular Filtration Rate (eGFR)": RangeValue,
    "Albumin/Creatinine Ratio - ACR":RangeValue
  },
}
  export interface Patient {
    "first_name":string,
    "last_name":string,
    "birth_date":string,
    "bloodPressure": {
      "Systolic": number,
      "Diastolic": number
    },
    "heartRate": number,
    "respiratoryRate": number,
    "bodyTemperature": number,
    "oxygenSaturation": number,
    "bodyWeight": number,
    "bodyHeight": number,
    "cholesterol": {
      "Total": number,
      "HDL": number,
      "LDL": number,
      "Triglycerides": number
    },
    "electrolytes": {
      "Sodium": number,
      "Potassium": number,
      "Calcium": number,
      "Magnesium": number,
      "Phosphorus": number
    },
    "kidneyFunction": {
      "Creatinine": number,
      "Blood Urea Nitrogen (BUN)": number,
      "Estimated Glomerular Filtration Rate (eGFR)": number,
      "Albumin/Creatinine Ratio - ACR":number
    },
  }



  class Calls {
    getPatient(id:string): Promise<Patient>{      
      return new Promise((ok,ko)=>{
      const options = {
        method: 'GET',
        url: `/patient/${id}`
      };      
      axios.request(options)
        .then((response: AxiosResponse)  =>{          
          ok(response.data)
        })
        .catch(ko);
      })
    }
    getPatientRanges(id:string): Promise<PatientRange>{      
      return new Promise((ok,ko)=>{
      const options = {
        method: 'GET',
        url: `/patient/${id}/ranges`
      };      
      axios.request(options)
        .then((response: AxiosResponse)  =>{          
          console.log(response.data)
          ok(response.data)
        })
        .catch(ko);
      })
    }
  }

  export default new Calls();