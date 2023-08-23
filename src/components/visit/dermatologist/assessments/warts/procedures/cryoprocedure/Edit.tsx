import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText, IonTextarea } from "@ionic/react";
import { Formik } from "formik";
import { bandageOutline, businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import { usePatientContext } from "../../../../../../../context/PatientContext";
import { useUserContext } from "../../../../../../../context/UserContext";
import Row from "../../../../../../form/Row";
import Number from "../../../../../../form/Number";
import Textarea from "../../../../../../form/Textarea";
import Visits from "../../../../../../../calls/Visits";
import ProcedureCard from "../../../../../ProcedureCard";

interface CryoprocedureDate{
    assessment:string
}
const Cryoprocedure: React.FC<CryoprocedureDate> = ({assessment}) => {        
    const { patientInfo } = usePatientContext(); 
    const { user } = useUserContext(); 
    var id:string;
    const save = async (values:object) => {    
      var data:any =await Visits.saveProcedure({id:id,assessment:assessment,...values})    
      id=data.id
    };
  
    return (
        <Formik
        initialValues={{    
          type:"dermatologist",              
          name:'cryoprocedure',
          visitId:user.patient?.visit,
          patientId:user.patient?.id,
          physician:user.id,
          lesions:0,          
          consent: 'The patient\'s consent was obtained including but not limited to risks of crusting, scabbing, blistering, scarring, darker or lighter pigmentary change, recurrence, incomplete removal and infection.', 
          post_care_instruction:'Patient should wear sun protection when outside and avoid picking at any of the treated lesions. Patient may apply a thick emollient (e.g., Vaseline or Aquaphor ointment) to crusted or scabbing areas; otherwise, keeping the treated areas clean and dry works best in many cases.'
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <ProcedureCard name="Cryoprocedure">
            <Number label="Lesions" name="number" autosave={save}/>          
            <Textarea label="Consent" name="consent" autosave={save}/>          
            <Textarea label="Note" name="post_care_instruction" autosave={save}/>                        
        </ProcedureCard>

        </Formik>
    )
}

export default Cryoprocedure;