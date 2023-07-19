import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRange, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { alarmOutline, businessOutline, calendarNumberOutline, calendarOutline, callOutline, caretForwardOutline, checkmarkCircleOutline, closeCircleOutline, closeOutline, eyeOffOutline, pinOutline, readerOutline, refreshOutline, scaleOutline, thermometerOutline } from 'ionicons/icons';
import moment from 'moment-timezone';
import Call, { Patient, PatientRange,RangeValue } from '../calls/Patient';
import React, { Suspense, useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import Skeleton from '../components/test/Skeleton';

interface RangeData extends RangeValue{
  enableRange:boolean,
}
const RangeView:React.FC<RangeData>=({unit,min,max,value,enableRange})=>{
  return <>
          {enableRange?<>
          <IonRange className='ion-no-padding' {...{min:min, max:max,value:value}}>
            {min&&<IonLabel slot="start">{min}</IonLabel>}
            {max&&<IonLabel slot="end">{max}</IonLabel>}
          </IonRange>
          <IonLabel slot='end'>{value} {unit}</IonLabel>              
          </>:<IonLabel slot='end'>{value} {unit}</IonLabel>}
          </>
}


interface ValueData extends RangeValue{
  last:boolean,
  name:string  
  enableRange:boolean,
  children?: JSX.Element,
}
const Value:React.FC<ValueData>=({min,max,value,unit,children,last,enableRange,name})=>{  
  return <IonItem lines={last?'none':'full'}>
              {(!min || value>min) && (!max|| value<max)?
              <IonIcon  slot='start' icon={checkmarkCircleOutline} color="success" className="card-icon"/>:
              <IonIcon  slot='start' icon={closeCircleOutline} color="warning" className="card-icon"/>}
              <IonLabel>{name}</IonLabel>              
              <RangeView {...{min,max,value,children,unit}} enableRange={enableRange}/>                
            </IonItem>                          
}
interface ItemData extends RangeValue{
  name:string,
}
interface Group{
  name:string,
  items:ItemData[],
  onlyWarning:boolean,  
  enableRange:boolean,
  children?: JSX.Element,
}
const Group:React.FC<Group>=({items,children,name,  onlyWarning, enableRange})=>{  
  
  var warnings = items.filter(item=>!((!item.min || item.value>item.min) && (!item.max|| item.value<item.max)))
  if(warnings.length==0 &&  onlyWarning) return <></>
  if(onlyWarning) items=warnings;
  return <IonCol size='12' size-lg='4'>
        <IonCard>
          <IonCardHeader>            
            <IonCardTitle>{name}</IonCardTitle>                         
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {items.map((item,index)=><Value {...item} enableRange={enableRange} last={items.length==index+1}/> )}
            </IonList>
          </IonCardContent>        
        </IonCard> 
      </IonCol>      
}
const Status: React.FC = () => {
  const { user, updateUser } = useUserContext();  
  var [patient,setPatient] =useState<PatientRange|null>(null);
  var [range,enableRange] =useState<boolean>(false);
  var [onlyWarning,enableOnlyWarning] =useState<boolean>(true);
  

  useEffect(()=>{    
    Call.getPatientRanges(user?.dataId||'').then(patient=>{      
      setPatient(patient)
    })
  },[])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>DashBoard</IonTitle>
        </IonToolbar>
      </IonHeader>

      {patient&&
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
            <IonCardTitle>Options</IonCardTitle>                       
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon  slot='start' icon={pinOutline} className="card-icon"/>
              <IonLabel>View Rages</IonLabel>
              <IonToggle checked={range} onIonChange={(e)=>enableRange(e.detail.checked)} enableOnOffLabels={true}/>
            </IonItem>
            <IonItem>
              <IonIcon  slot='start' icon={eyeOffOutline} className="card-icon"/>
              <IonLabel>Only warning</IonLabel>
              <IonToggle checked={onlyWarning} onIonChange={(e)=>enableOnlyWarning(e.detail.checked)} enableOnOffLabels={true}/>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {patient?.first_name} {patient?.last_name}
            </IonCardTitle>                       
          </IonCardHeader>
          <IonCardContent>
          
        
            <IonItem>
              <IonIcon  slot='start' icon={calendarOutline} className="card-icon"/>
              <IonLabel>Birth</IonLabel>
              <IonLabel slot='end'>{moment(patient?.birth_date).format('MMMM DD yyyy')}
              <p className='ion-text-right'>{moment().diff(patient?.birth_date, 'years')} years</p>
              </IonLabel>                
            </IonItem>
            <IonItem>
              <IonIcon  slot='start' icon={pinOutline} className="card-icon"/>
              <IonLabel>Height</IonLabel>
              <IonLabel slot='end'>{patient?.bodyHeight} cm</IonLabel>                
            </IonItem>
            <IonItem>
              <IonIcon  slot='start' icon={scaleOutline} className="card-icon"/>
              <IonLabel>Weigth</IonLabel>                            
              <IonLabel slot='end' className='ion-text-right'>{patient?.bodyWeight} Kg
              <p className='ion-text-right'>BMI: { (((patient.bodyWeight) / (patient.bodyHeight * patient.bodyHeight))* 10000).toFixed(2)}</p></IonLabel>                
            </IonItem>
            <IonItem>
              <IonIcon  slot='start' icon={thermometerOutline} className="card-icon"/>
              <IonLabel>Temperature</IonLabel>
              <IonLabel slot='end'>{patient?.bodyTemperature} C</IonLabel>                
            </IonItem>
            

          </IonCardContent>        
        </IonCard>  
    </IonCol>
    <IonCol size='12' size-lg='8'></IonCol>
    
  
    <Group 
      name="Last Vital Signs" 
      onlyWarning={onlyWarning}  
      enableRange={range}
      items={[
        {...patient?.bloodPressure?.Diastolic,name:"Diastolic"},
        {...patient?.bloodPressure?.Systolic,name:"Systolic"},
        {...patient?.heartRate,name:"Hearth Rate"},
        {...patient?.oxygenSaturation,name:"Oxygen Saturation"}
      ]}
      />

  <Group 
      name="Blood - Cholesterol" 
      onlyWarning={onlyWarning}  
      enableRange={range}
      items={[
        {...patient.cholesterol.Total,name:"Total"},
        {...patient.cholesterol.HDL,name:"HDL"},
        {...patient.cholesterol.LDL,name:"LDL"},
        {...patient.cholesterol.Triglycerides,name:"Triglycerides"}
      ]}
      />
    <Group 
      name="Electrolytes" 
      onlyWarning={onlyWarning}  
      enableRange={range}
      items={[
        {...patient.electrolytes.Calcium,name:"Calcium"},        
        {...patient.electrolytes.Magnesium,name:"Magnesium"},        
        {...patient.electrolytes.Phosphorus,name:"Phosphorus"},        
        {...patient.electrolytes.Potassium,name:"Potassium"},        
        {...patient.electrolytes.Sodium,name:"Sodium"}
      ]}
      />
  
  <Group 
      name="Kidney Function" 
      onlyWarning={onlyWarning}  
      enableRange={range}
      items={[
        {...patient.kidneyFunction['Blood Urea Nitrogen (BUN)'],name:"Blood Urea Nitrogen (BUN)"},        
        {...patient.kidneyFunction.Creatinine,name:"Creatinine"},        
        {...patient.kidneyFunction['Estimated Glomerular Filtration Rate (eGFR)'],name:"Estimated Glomerular Filtration Rate (eGFR)"},        
        {...patient.kidneyFunction['Albumin/Creatinine Ratio - ACR'],name:"Albumin/Creatinine Ratio - ACR"},                  
      ]}
      />            

        </IonRow>
      </IonGrid>
      </IonContent>
      }
    </IonPage>
  );
};

export default Status;
