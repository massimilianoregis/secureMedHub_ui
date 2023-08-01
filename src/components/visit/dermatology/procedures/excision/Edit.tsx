import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText, IonTextarea } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";

const Excision: React.FC = () => {    
    return (
        <IonCard>
            <IonCardHeader>
            <IonCardTitle>Excision</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonLabel slot="start">Lesions</IonLabel>
                        <IonInput type="number"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Consens</IonLabel>  
                        <IonTextarea>The patient's consent was obtained including but not limited to risks of crusting, scabbing, blistering, scarring, darker or lighter pigmentary change, recurrence, incomplete removal and infection.</IonTextarea> 
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Note</IonLabel>  
                        <IonTextarea>Patient should wear sun protection when outside and avoid picking at any of the treated lesions. Patient may apply a thick emollient (e.g., Vaseline or Aquaphor ointment) to crusted or scabbing areas; otherwise, keeping the treated areas clean and dry works best in many cases.</IonTextarea> 
                    </IonItem>                    
                </IonList>
            </IonCardContent>
        </IonCard>  
    )
}

export default Excision;