import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import { Procedure } from "../../../calls/Visits";

const Warts: React.FC<{ item: Procedure }> = ({item}) => {    
    return (
        <IonCard key={item.method}>
            <IonCardHeader>
            <IonCardTitle>{item.method} #{item.number}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            <li>{item.consent}</li>
            <li>{item.post_care_instruction}</li>
            </IonCardContent>
        </IonCard>  
    )
}

export default Warts;