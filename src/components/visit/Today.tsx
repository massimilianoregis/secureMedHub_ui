import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { Visit } from "../../calls/Visits";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";

const Generic: React.FC<{ item: Visit }> = ({item}) => {    
    return (
        <IonRow>
        <IonCol size='3' className='ion-text-end'>
          <IonChip>   
            <IonIcon icon={caretForwardOutline} color="clear"></IonIcon>             
              <IonLabel>{moment(item.when).format('MMM DD')}</IonLabel>
          </IonChip>
        </IonCol>
        <IonCol size='9'>
        <IonItemDivider><IonLabel>Today</IonLabel></IonItemDivider>
        </IonCol>
      </IonRow>
    )
}

export default Generic;