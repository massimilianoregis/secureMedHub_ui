import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import { useState } from "react";
import LazyComponent from "../../../../LazyComponent";

interface Procedure {
  name:string,
  component:string
}
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
  {name:"Cryoprocedure",component:"./visit/dermatology/procedures/Cryoprocedure/Edit"},
  {name:"Laser",component:"./visit/dermatology/assessments/warts/procedures/Laser"},
  {name:"Excision",component:"./visit/dermatology/procedures/Excision/Edit"},
  {name:"Medication",component:"./visit/dermatology/assessments/warts/procedures/Medication"}
]


const WartsEdit: React.FC = () => {    
  var [procedure,setProcedure] =useState<Procedure|null>(null);
    return (
      <IonRow>
        <IonCol size='12' size-lg='6'>

        <IonCard>
          <IonButtons className="ion-float-right">
            <IonButton fill="clear">Delete</IonButton>          
          </IonButtons>
          <IonCardHeader>
            <IonCardTitle>Warts</IonCardTitle>                
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
                {procedures.map(item=><IonSelectOption value={item}>{item.name}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel slot="start">Note</IonLabel>
              <IonTextarea>Condyloma acuminatum (genital warts) can be treated with retinoids, Aldara, salicylic acid preparations or cryotherapy. There may be off-label treatment options as well that have been reported in the literature to yield good results.</IonTextarea>
            </IonItem>
            <IonItem>
              <IonLabel slot="start">Expectations</IonLabel>
              <IonTextarea>Warts are cauliflower-like bumps caused by viral infections. They may resemble skin tags in the genital area. They can be spread through direct contact and usually resolve with treatment. But they may recur, typically in times of immunosuppression or stress. With genital warts, please disclose with your current and prior partner(s) to the best of your ability so that they can seek medical evaluation and treatment (if they are also affected). In women, untreated cervical/genital warts can increase the risk of mucocutaneous cancer, so it is important to communicate this part of your history clearly, openly, and in a timely manner.</IonTextarea>
            </IonItem>
            <IonItem>
              <IonLabel slot="start">Contact office if</IonLabel>
              <IonTextarea>The warts spread, or recur despite treatment.</IonTextarea>
            </IonItem>
            
          </IonCardContent>
          
        </IonCard>  

        </IonCol>
        <IonCol size='12' size-lg='6'>        
        {procedure&&<LazyComponent name={procedure.component}/>}
        </IonCol>
        </IonRow>
    )
}

export default WartsEdit;
