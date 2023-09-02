import { IonAccordion, IonAccordionGroup, IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, readerOutline, refreshOutline } from 'ionicons/icons';
import moment from 'moment-timezone';
import Call, { Tests,Test } from '../calls/Tests';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import Skeleton from '../components/test/Skeleton';


const Patients: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const { name } = useParams<{ name: string; }>();
  var [items,setItems] =useState<Test[]>([]);

  const effectRan = useRef(false);
  useEffect(()=>{    
    if(effectRan.current) return;
      Call.getTests(user?.id||'').then(test=>{      
        setItems(test)})
    return () => {effectRan.current = true;}
  },[])
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonSearchbar/>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonSearchbar/>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem href="/page/Patient/9ed9754f-20a3-4dee-8bd7-19226cf5419b"  button detail={true}>
            <IonAvatar slot="start">
              <IonImg src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'/>
            </IonAvatar>
            <IonLabel>
              <h1>Max Regis</h1>
              <h2>08/06/1977</h2>
              <p>#0123256768777</p>              
            </IonLabel>
          </IonItem>          
        </IonList>
                   
      </IonContent>
    </IonPage>
  );
};

export default Patients;
