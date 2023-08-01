import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText, IonTextarea } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";

const Warts: React.FC = () => {    
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