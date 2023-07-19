import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRow, IonSkeletonText, IonText } from "@ionic/react";
import { Visit } from "../../calls/Visits";
import { businessOutline, calendarNumberOutline, callOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import React, { Suspense } from "react";

const Skeleton: React.FC = ({}) => {
    return (
        <IonRow>
              <IonCol size='3' className='ion-text-end'>
                <br/>
                <IonSkeletonText animated={true} style={{ width: '80px', height:'20px'}}/>
              </IonCol>
              <IonCol size='9'>
              
              <IonCard key='index'>
                <IonCardHeader>
                  <IonCardTitle>
                                        
                      <IonLabel><IonSkeletonText animated={true} style={{ width: '100px', height:'10px' }}/></IonLabel>
                    </IonCardTitle>
                  <IonCardSubtitle><IonSkeletonText animated={true} style={{ width: '80px', height:'10px' }}/></IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                
                <IonAccordionGroup>
                  <IonSkeletonText animated={true} style={{ width: '200px', height:'100px' }}/>
                </IonAccordionGroup>

                </IonCardContent>              
              </IonCard>

              </IonCol>
            </IonRow>
    )
}

export default Skeleton;