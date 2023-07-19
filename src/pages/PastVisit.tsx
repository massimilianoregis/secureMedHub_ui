import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonPage, IonRow, IonSkeletonText, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, readerOutline, refreshOutline } from 'ionicons/icons';
import moment from 'moment-timezone';
import Call, { Visits,Visit } from '../calls/Visits';
import React, { Suspense, useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import DynamicTag from '../components/DynamicTag';
import Skeleton from '../components/visit/Skeleton';


const Page: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const { name } = useParams<{ name: string; }>();
  var [visits,setVisits] =useState<Visit[]>([]);  

  useEffect(()=>{    
    Call.getVisits(user?.dataId||'').then(visit=>{
      console.log(visit);
      setVisits(visit)})
  },[])
  
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
        
        
          {visits.map((visit, index) => {         
            var name='../components/visit/Today'
            if(visit.type!='today') name='../components/visit/Generic';
            var Item=React.lazy(() => import(/* @vite-ignore */name))
            
            return (
            <div key={index}>                         
              <Suspense fallback={<Skeleton/>}>                
                <Item item={visit}/>
              </Suspense>            
            </div>)
          }
          )}
          
          
      </IonContent>
    </IonPage>
  );
};

export default Page;
