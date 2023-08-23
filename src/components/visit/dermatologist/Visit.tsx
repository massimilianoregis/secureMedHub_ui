import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText, IonTextarea } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import { usePatientContext } from "../../../context/PatientContext";
import { useEffect, useRef } from "react";
import Visits from "../../../calls/Visits";
import { useUserContext } from "../../../context/UserContext";

const Warts: React.FC = () => {    
    const {user} = useUserContext();

    
    var saveVisit= async ()=>{        
        if(!user.patient?.id) return;
        if(user.patient?.visit) return;
    
        var visit:any=await Visits.saveVisit({
            id:user.patient.visit,
            patientId:user.patient.id,
            type:'dermatologist'
        })       
        user.patient.visit=visit.id         
    }

    const effectRan = useRef(false);
    useEffect(()=>{    
      if(effectRan.current) return;
      saveVisit();
      return () => {effectRan.current = true;}
    },[])

    
    

    return (
        <IonCard>
            <IonCardHeader>
            <IonCardTitle>Visit</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonLabel>Note</IonLabel>
                        <IonTextarea></IonTextarea>
                    </IonItem>
                </IonList>

            </IonCardContent>
        </IonCard>  
    )
}

export default Warts;