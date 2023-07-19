import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonImg, IonItem, IonLabel, IonList, IonRow, IonText, IonThumbnail } from "@ionic/react";
import { Visit } from "../../calls/Visits";
import { businessOutline, calendarNumberOutline, callOutline, checkmarkCircleOutline, checkmarkDoneOutline, checkmarkOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import './Generic.css';
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
                      <IonLabel className="card-title-with-icon">                                              
                        Imiquimod 5 % Cre Pada                        
                      </IonLabel>
                    </IonCardTitle>
                  <IonCardSubtitle>{item.who}</IonCardSubtitle>                  
                  <IonIcon size="large" icon={checkmarkCircleOutline} color="success" className="card-icon"/>
                </IonCardHeader>
                {/*<IonList>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <IonImg src="https://content.fdbcloudconnector.com/cc450us2/imageimprint/PRG03683.JPG?Expires=1689355504&Signature=MyDOkcqBi5O-3xtxB~PrwqiX5IXTADYmL3LgWbyoNowNtrg8beAO39bTGim8MxXCRn1p9BaYRdd87yct2fxzPokiLrIi5nJKyEsrUbdvmatYGwzippEK52KQyfqJyHMfxwD4Y6G4PAm9K7~y5ftUsM1Ca8yxRKrZNNLvkaqal3p0Nva-1CD6WQr4hClSdVZOwd1oyDY3pwosFEB-N~Nu9RnQSELZ7ddv9kA2ITa7fysIbTZoJyCvwVQI5UeCTpvUzi5AoL9nM6fz5QMt7w1-8UNWu2HqsmCqUi1zpWI1sEk7~CnKQaafstP9wnJMVnxSv0C~UsVSFhvexRarPlLgYQ__&Key-Pair-Id=APKAIGGPS6GQRYMYKC4A"/>
                    </IonThumbnail>                    
                  </IonItem>
                </IonList>*/}
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