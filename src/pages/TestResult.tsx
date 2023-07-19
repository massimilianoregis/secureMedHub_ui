import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, readerOutline, refreshOutline } from 'ionicons/icons';
import moment from 'moment-timezone';
import Call, { Tests,Test } from '../calls/Tests';
import React, { Suspense, useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import Skeleton from '../components/test/Skeleton';


const Page: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const { name } = useParams<{ name: string; }>();
  var [items,setItems] =useState<Test[]>([]);

  useEffect(()=>{    
    Call.getTests(user?.dataId||'').then(test=>{      
      setItems(test)})
  },[])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Test</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        
        {items.map((item, index) => {         
            var name='../components/visit/Today'
            if(item.type!='today') name='../components/test/Generic';
            var Item=React.lazy(() => import(/* @vite-ignore */name))
            
            return (
            <div key={index}>                         
              <Suspense fallback={<Skeleton/>}>
                <Item item={item}/>
              </Suspense>            
            </div>)
          }
          )}       
      </IonContent>
    </IonPage>
  );
};

export default Page;
