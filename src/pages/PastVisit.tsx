import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, readerOutline } from 'ionicons/icons';
import moment from 'moment-timezone';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  interface Assessment {
    name:string,
    where:string,
    expectations?:string,
    note:string,
    prescriptions?:string[]
    referrals?:string[],
    contact_office_if?:string
  }
  interface Visit {
    when: Date;
    where?: string; //onsite/telephone/video
    type: string; //optometry/today
    who?: string;
    assessment?:Assessment[]    
  }
  
  const visits: Visit[] = [
    {
      when: new Date(2023,7,8),
      where: 'onsite',
      type: 'plastic surgery',
      who: 'ASHLEY MARIE BROWN MD'
    },
    {
      when: new Date(2023,6,12),
      where: 'onsite',
      type: 'dermatology',
      who: 'TIEN VIET NGUYEN MD'
    },
    {
      when: new Date(),      
      type: 'today'
    },
    {
      when: new Date(2023,4,31),
      where: 'onsite',
      type: 'optometry',
      who: 'NOOR AL-HASSAN OD'
    },
    {
      when: new Date(2023,4,24),
      where: 'tel',
      type: 'plastic surgery',
      who: 'ASHLEY MARIE BROWN MD'
    },
    {
      when: new Date(2023,4,23),
      where: 'onsite',
      type: 'dermatology',
      who: 'TIEN VIET NGUYEN MD',
      assessment:[{
          name:'ANAL WART',
          where: 'R perianal area',
          note:`Condyloma acuminatum (genital warts) can be treated with retinoids, Aldara, salicylic acid preparations or cryotherapy. There may be off-label treatment options as well that have been reported in the literature to yield good results.`,
          expectations:`Warts are cauliflower-like bumps caused by viral infections. They may resemble skin tags in the genital area. They can be spread through direct contact and usually resolve with treatment. But they may recur, typically in times of immunosuppression or stress. With genital warts, please disclose with your current and prior partner(s) to the best of your ability so that they can seek medical evaluation and treatment (if they are also affected). In women, untreated cervical/genital warts can increase the risk of mucocutaneous cancer, so it is important to communicate this part of your history clearly, openly, and in a timely manner.
          Contact Office if: The warts spread, or recur despite treatment.`
        },{
          name:'IRRITANT CONTACT DERMATITIS',
          where:'penis',
          note: `Irritant Contact Dermatitis Skin Care: Avoiding harsh chemicals, prolonged water exposure and wearing gloves can all help improve irritant contact dermatitis. Applying moisturizers regularly will also help reduce irritation. Topical steroids can help in more severe cases.`,
          expectations: `Irritant Contact dermatitis can persist unless contact with irritants in the environment are eliminated. Sometimes, patch testing is necessary to exclude an allergic contact dermatitis.
          Contact office if: Your dermatitis worsens or fails to improve despite several weeks of treatment.`,
          prescriptions:[
            'TACROLIMUS 0.1 % TOP OINT'
          ]
          
        },
        {
          name:'SKIN TAG',
          where:'bilateral lower eyelids',
          note:`Skin tags can be removed surgically or with liquid nitrogen.`,
          expectations:`Acrochordons are benign skin growths usually found around the neck or the armpits. They do not need to be treated, unless sometimes, when they get caught on clothing or jewelry and get inflamed.
 
          - reassured patient regarding the benign nature of these lesions or the condition
          - no treatment is needed unless they are symptomatic - patient requested treatment for lower eyelid lesions that interfere with visual field`,
          referrals:[
            'PLASTIC SURGERY'
          ]
        },{
          name:'BENIGN NEVUS OF SKIN',
          where:'face, trunk, arms, legs',
          note:`Monthly self-skin checks to monitor for any changes in moles are recommended.`,
          expectations:`Benign Nevi are pigmented nests of cells within the skin. No treatment is necessary.`,
          contact_office_if:`Any of the patient's moles change in size, shape or color, or if they itch, burn or bleed. Even if the patient notices a vague change of any kind but cannot describe it, patient should still contact us for a follow up visit and evaluation of the changing mole(s).`
        }
      ]
    }
  ]
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Past visit</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        
          {visits.map((visit, index) => <>
            {visit.type=='today'&&
              
                <IonRow>
                  <IonCol size='3' className='ion-text-end'>
                    <IonChip>   
                      <IonIcon icon={caretForwardOutline} color="clear"></IonIcon>             
                        <IonLabel>{moment(visit.when).format('MMM DD')}</IonLabel>
                    </IonChip>
                  </IonCol>
                  <IonCol size='9'>
                  <IonItemDivider><IonLabel>Today</IonLabel></IonItemDivider>
                  </IonCol>
                </IonRow>
              }
            {visit.type!='today'&&
            <IonRow>
              <IonCol size='3' className='ion-text-end'>

                <br/>
                <IonChip>
                {visit.where=='onsite'&&<IonIcon icon={businessOutline} color="clear"></IonIcon>}
                {visit.where=='tel'&&<IonIcon icon={callOutline} color="clear"></IonIcon>}
                  <IonLabel>{moment(visit.when).format('MMM DD')}</IonLabel>
                </IonChip> 

              </IonCol>
              <IonCol size='9'>
              
              <IonCard key='index'>
                <IonCardHeader>
                  <IonCardTitle>
                                        
                      <IonLabel>{visit.type}</IonLabel>
                    </IonCardTitle>
                  <IonCardSubtitle>{visit.who}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                <IonAccordionGroup>
                {visit.assessment?.map((assessment,index)=>
                  <IonAccordion value={assessment.name}>
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
                      {assessment.prescriptions&&<>
                        <IonText color="secondary"><h2>Prescriptions</h2></IonText>
                        {assessment.prescriptions?.join()}
                      </>}
                      {assessment.contact_office_if&&<>
                        <IonText color="secondary"><h2>Contact office if</h2></IonText>
                        <p>{assessment.contact_office_if}</p>
                      </>}
                      {assessment.referrals&&<>
                        <IonText color="secondary"><h2>Referrals</h2></IonText>
                        {assessment.referrals?.join()}
                      </>}
                      </div>
                  </IonAccordion>
                )}
                </IonAccordionGroup>
                

                {visit.when< new Date()&&
                <IonList>                  
                  <IonItem>
                    <IonIcon slot='start' icon={readerOutline}></IonIcon>                   
                    <IonLabel>View Notes</IonLabel>
                  </IonItem>
                  <IonItem lines='none'>
                    <IonIcon slot='start' icon={calendarNumberOutline}></IonIcon>                   
                    <IonLabel>View After Visit</IonLabel>
                  </IonItem>
                </IonList>}
                </IonCardContent>              
              </IonCard>

              </IonCol>
            </IonRow>
            }
            </>)}
          
          
      </IonContent>
    </IonPage>
  );
};

export default Page;
