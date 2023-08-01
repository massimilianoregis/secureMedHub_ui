import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import { useState } from "react";
import LazyComponent from "../../LazyComponent";


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
  "Prescription",
  "Referral"
]

const General: React.FC = () => {    
  var [procedure,setProcedure] =useState<string>(null);
    return (
      <IonRow>
        <IonCol size='12' size-lg='6'>

        <IonCard>
          <IonButtons className="ion-float-right">
            <IonButton fill="clear">Delete</IonButton>          
          </IonButtons>
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>                
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
              <IonSelect interface="popover" onIonChange={e=>{setProcedure(e.detail.value)}}>
                {procedures.map(item=><IonSelectOption>{item}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel slot="start">Note</IonLabel>
              <IonTextarea></IonTextarea>
            </IonItem>
            <IonItem>
              <IonLabel slot="start">Expectations</IonLabel>
              <IonTextarea></IonTextarea>
            </IonItem>
            <IonItem>
              <IonLabel slot="start">Contact office if</IonLabel>
              <IonTextarea></IonTextarea>
            </IonItem>
            
          </IonCardContent>
          
        </IonCard>  

        </IonCol>
        <IonCol size='12' size-lg='6'>
        {procedure&&<LazyComponent name={`../components/visit/dermatology/procedures/${procedure}`}/>}
        </IonCol>
        </IonRow>
    )
}

export default General;
