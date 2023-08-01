import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import { Procedure } from "../../../calls/Visits";


const bodyPart=[
  "Face",
  "Neck",
  "Shoulders",
  "Arms",
  "Elbows",
  "Hands",
  "Fingers (Hands)",
  "Chest",
  "Abdomen",
  "Back",
  "Buttocks",
  "Legs",
  "Knees",
  "Feet",
  "Toes (Feet)",
  "Scalp",
  "Lips",
  "Eyes (Eyelids and Periorbital area)",
  "Ears (Auricles)",
  "Genitals"
]
const procedures=[
  "Cryoprocedure"  
]

const WartsEdit: React.FC = () => {    
    return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>ACNE</IonCardTitle>                       
          </IonCardHeader>
          <IonCardContent>
          
            <IonList>
              <IonItem>
                <IonLabel>Where</IonLabel>
                <IonSelect multiple={true}>
                  {bodyPart.map(item=><IonSelectOption>{item}</IonSelectOption>)}
                </IonSelect>
              </IonItem>
            </IonList>
            
            <IonItem>
              <IonLabel>Actions</IonLabel>
              <IonSelect>
                {procedures.map(item=><IonSelectOption>{item}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Note</IonLabel>
              <IonTextarea></IonTextarea>
            </IonItem>
            
          </IonCardContent>
        </IonCard>  
    )
}

export default WartsEdit;
