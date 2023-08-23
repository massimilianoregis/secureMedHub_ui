
import React, {  useState } from "react";
import LazyComponent from "../../../../LazyComponent";
import { usePatientContext } from "../../../../../context/PatientContext";
import { Formik} from "formik";
import Textarea from "../../../../form/Textarea";
import Select from "../../../../form/Select";
import Visits from "../../../../../calls/Visits";
import { useUserContext } from "../../../../../context/UserContext";
import AssessmentCard from "../../../AssessmentCard";

import bodyPart from "../../bodyParts.json"
import procedures from "./procedures.json"
import { IonCol, IonRow } from "@ionic/react";

interface Procedure {
  name:string,
  component:string
}

const Edit: React.FC = () => {    
  const { patientInfo } = usePatientContext(); 
  const { user } = useUserContext(); 
  var [procedure,setProcedure] =useState<Procedure|null>(null);
  var [id,setId] =useState<string|null>(null);
  var initialValues={                  
    name:'Warts',
    visit:user.patient?.visit,
    patientId:user.patient?.id,
    physician:user.id,
    where: ['Genitals'], 
    type:"dermatologist",
    actions: '', 
    notes:'Condyloma acuminatum (genital warts) can be treated with retinoids, Aldara, salicylic acid preparations or cryotherapy. There may be off-label treatment options as well that have been reported in the literature to yield good results.',
    expectations:'Warts are cauliflower-like bumps caused by viral infections. They may resemble skin tags in the genital area. They can be spread through direct contact and usually resolve with treatment. But they may recur, typically in times of immunosuppression or stress. With genital warts, please disclose with your current and prior partner(s) to the best of your ability so that they can seek medical evaluation and treatment (if they are also affected). In women, untreated cervical/genital warts can increase the risk of mucocutaneous cancer, so it is important to communicate this part of your history clearly, openly, and in a timely manner.',
    contact_office_if:'The warts spread, or recur despite treatment.' 
  }

  const save = async (values:object) => {    
    var data:any =await Visits.saveAssessment({id:id,...values})    
    setId(data.id)
  };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {}}
      >      
      <IonRow>
        <IonCol size='12' size-lg='6'>

        <AssessmentCard name="Warts">        
          <Select label="Where" name="where" autosave={save} items={bodyPart} multiple={true}/>                                     
          <Select label="Actions" name="actions" items={procedures} multiple={false} onChange={(value:Procedure)=>{setProcedure(value)}}/>                                     
          <Textarea label="Note" name="notes" autosave={save}/>   
          <Textarea label="Expectations" name="expectations" autosave={save}/>                 
          <Textarea label="Contact office if" name="contact_office_if" autosave={save}/>                               
        </AssessmentCard>

        </IonCol>

        <IonCol size='12' size-lg='6'>       
          {procedure&&<LazyComponent name={procedure.component} assessment={id}/>}
        </IonCol>
      </IonRow>
        
      </Formik>
    )
}
export default Edit