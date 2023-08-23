import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRange, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { accessibilityOutline, alarmOutline, businessOutline, calendarNumberOutline, calendarOutline, callOutline, caretForwardOutline, checkmarkCircleOutline, closeCircleOutline, closeOutline, eyeOffOutline, pinOutline, readerOutline, refreshOutline, scaleOutline, thermometerOutline } from 'ionicons/icons';
import moment from 'moment-timezone';
import Call, { Patient, PatientRange,RangeValue } from '../calls/Patient';
import React, { Suspense, useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import Skeleton from '../components/test/Skeleton';
import LazyComponent from '../components/LazyComponent';
import { PatientProvider, usePatientContext } from '../context/PatientContext';
import VisitCall,{ AssessmentSummary, VisitSummary } from '../calls/Visits';


const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string; }>();
  const { user} = useUserContext();  

  
  var [visitTypes,setVisitTypes] =useState<VisitSummary[]>([]);
  var [visitType,setVisitType] =useState<string>("");
  var [assessmentSearch,setAssessmentSearch] =useState<string>('');
  var [assessment,setAssessment] =useState<AssessmentSummary|null>(null);

  var [patientId,setPatientId] =useState<string|undefined>(undefined);  
  var [patient,setPatient] =useState<PatientRange|undefined>(undefined);  
  var [visit,setVisit] =useState<VisitSummary|null>(null);
    
  useEffect(()=>{        
    VisitCall.getVisitTypes().then((visits:VisitSummary[])=>setVisitTypes(visits))
  },[])

  useEffect(()=>{        
    setVisitType(user.visitType)
  },[user])

  useEffect(()=>{       
    if(!patientId)     return;
    user.patient={id:patientId}
    Call.getPatientRanges(patientId).then(patient=>{                
      setPatient(patient)
    })
  },[patientId])


  useEffect(()=>{    
    setAssessmentSearch(' ')
    if(assessment==null) return;

    if(!visit) return;
    visit.assessments.push(assessment)
    setVisit({...visit})
  },[assessment])

  useEffect(()=>{    
    setAssessmentSearch('')
    setAssessment(null)

    var currentvisit =visitTypes.find(visit=>visit.name==visitType)      
    setVisit({
      name:"",
      component:currentvisit?.component,
      assessments:[]})
  },[visitType])


  return (
    <PatientProvider patient={patient}>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{patient?.first_name} {patient?.last_name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">DashBoard</IonTitle> 
          </IonToolbar>
        </IonHeader>
  <IonGrid>  
    <IonRow>
      <IonCol size='12' size-lg='4'>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{visitType} Visit</IonCardTitle>                       
          </IonCardHeader>
          <IonCardContent>        
            <IonItem lines='full'>    
              <IonIcon slot='start' icon={accessibilityOutline} className="card-icon"/>
              <IonSelect interface="popover" onIonChange={(e)=>setPatientId(e.detail.value)} placeholder='Patient id'>
                <IonSelectOption>8efc09f8-f0dd-49d2-9887-c61ffaa8d367</IonSelectOption>
                <IonSelectOption>9ed9754f-20a3-4dee-8bd7-19226cf5419b</IonSelectOption>
              </IonSelect>
            </IonItem>            
            <IonItem lines='full'>
              <IonIcon slot='start' icon={accessibilityOutline} className="card-icon"/>
              <IonSelect 
              interface="popover" placeholder="Start a new visit" value={visitType} onIonChange={e=>setVisitType(e.detail.value)}>
                <IonSelectOption></IonSelectOption>
                {visitTypes.map(visit=><IonSelectOption key={visit.name}>{visit.name}</IonSelectOption>)}                                
              </IonSelect>
            </IonItem>                        
            
            {visitType!=null&&
            <IonList >
              <IonItem lines='none'>                       
                <IonSearchbar debounce={100} onIonChange={e=>setAssessmentSearch(e.detail.value||"")}/>
              </IonItem>   
          
              <div style={{maxHeight:500,overflow:'auto'}}>
                {visitTypes.find(visit=>visit.name==visitType)
                ?.assessments
                .filter(item=>item.name.match(new RegExp(assessmentSearch,"i")))
                .map(item=>
                <IonItem key={item.name} button detail={true} onClick={()=>{setAssessment(item)}}>          
                  <IonLabel>{item.name}</IonLabel>                          
                </IonItem>)}
              </div>
            </IonList>              
            }                                
            
          </IonCardContent>
        </IonCard>
        </IonCol>
        
        <IonCol size='12' size-lg='8'>      
        {visit&&visit.component&&patient&&          
          <LazyComponent name={`../components/visit/${visit.component}`}/>                      
        }
        {visit&&visit.assessments.map(assessment=>             
          <LazyComponent name={`../components/visit/${assessment.component}`}/>                  
        )}
        </IonCol>        
        </IonRow>
      </IonGrid>
      </IonContent>
      
    </IonPage>
    </PatientProvider>
  );
};

export default PatientPage;
