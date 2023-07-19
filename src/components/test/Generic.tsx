import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { Test } from "../../calls/Tests";
import { businessOutline, calendarNumberOutline, callOutline, checkmarkCircleOutline, checkmarkDoneOutline, checkmarkOutline, closeCircleOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import './Generic.css';
const Generic: React.FC<{ item: Test }> = ({item}) => {
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
                  <IonCardTitle >                                        
                      <IonLabel className="card-title-with-icon">                      
                        {item.type}
                      </IonLabel>
                    </IonCardTitle>
                  <IonCardSubtitle>{item.who}</IonCardSubtitle>     
                  {item.result=='ok'&&<IonIcon size="large" icon={checkmarkCircleOutline} color="success" className="card-icon"/>}
                  {item.result=='ko'&&<IonIcon size="large" icon={closeCircleOutline} color="danger" className="card-icon"/>}
                </IonCardHeader>
                <IonCardContent>
                
                <IonAccordionGroup>
                {item.assessment?.map((assessment,index)=>
                  <IonAccordion value={assessment.name} key={index}>
                    <IonItem slot="header" color="light">
                      <IonLabel>{assessment.name} - {assessment.where}</IonLabel>
                    </IonItem>
                      <div className="ion-padding" slot="content">
                      <IonText color="secondary"><h2>Note</h2></IonText>
                      <p>{assessment.note}</p>
                      {assessment.expectations&&<>
                        <IonText color="secondary"><h2>Expectations</h2></IonText>
                        <p>{assessment.expectations}</p>
                      </>}
                      {assessment.contact_office_if&&<>
                        <IonText color="secondary"><h2>Contact office if</h2></IonText>
                        <p>{assessment.contact_office_if}</p>
                      </>}
                      {assessment.prescriptions&&<>
                        <IonText color="secondary"><h2>Prescriptions</h2></IonText>
                        {assessment.prescriptions?.join()}
                      </>}                      
                      {assessment.referrals&&<>
                        <IonText color="secondary"><h2>Referrals</h2></IonText>
                        {assessment.referrals?.join()}
                      </>}                      
                      {assessment.procedures&&<>
                        <IonText color="secondary"><h2>Procedures</h2></IonText>
                        {assessment.procedures?.map((procedure,index)=><>          
                          <IonCard key={index}>
                              <IonCardHeader>
                                <IonCardTitle>{procedure.method} #{procedure.number}</IonCardTitle>
                              </IonCardHeader>
                              <IonCardContent>
                                <li>{procedure.consent}</li>
                                <li>{procedure.post_care_instruction}</li>
                              </IonCardContent>
                          </IonCard>                                          
                          
                        </>)}
                      </>}
                      </div>
                  </IonAccordion>
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