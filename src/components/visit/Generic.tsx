import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { Visit } from "../../calls/Visits";
import { businessOutline, calendarNumberOutline, callOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import React, { Suspense } from "react";
import LazyComponent from "../LazyComponent";

const Generic: React.FC<{ item: Visit }> = ({item}) => {
    return (
        <IonRow>
              <IonCol size='3' className='ion-text-end'>

                <br/>
                <IonChip>
                {item.where=='onsite'&&<IonIcon icon={businessOutline} color="clear"></IonIcon>}
                {item.where=='tel'&&<IonIcon icon={callOutline} color="clear"></IonIcon>}
                  <IonLabel>{moment(item.when).format('MMM DD')}</IonLabel>
                </IonChip> 

              </IonCol>
              <IonCol size='9'>
              
              <IonCard key='index'>
                <IonCardHeader>
                  <IonCardTitle>                                        
                      <IonLabel>{item.type}</IonLabel>
                    </IonCardTitle>
                  <IonCardSubtitle>{item.who}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                
                <IonAccordionGroup>
                {item.assessment?.map((assessment,index)=>
                  <LazyComponent name={`./visit/${item.type}/assessments/${assessment.name.toLocaleLowerCase()}/View`} assessment={assessment}/>
                  
                )}
                </IonAccordionGroup>

                {item.conclusion&&<p>{item.conclusion}</p>}

                {item.when> new Date()&&
                <>
                  <IonButton fill='clear' color='danger'><IonIcon icon={closeOutline} slot='start'/>Cancel</IonButton>
                  <IonButton fill='clear' color='warning'><IonIcon icon={refreshOutline} slot='start'/>Reschedule</IonButton>                
                </>}
                {item.when< new Date()&&
                <IonList>                                    
                  <IonItem lines='none'>
                    <IonIcon slot='start' icon={calendarNumberOutline}></IonIcon>                   
                    <IonLabel>View After Visit</IonLabel>
                  </IonItem>
                </IonList>}
                </IonCardContent>              
              </IonCard>

              </IonCol>
            </IonRow>
    )
}

export default Generic;