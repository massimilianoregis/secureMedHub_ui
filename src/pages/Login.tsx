import { IonAccordion, IonAccordionGroup, IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, readerOutline, refreshOutline } from 'ionicons/icons';
import moment from 'moment-timezone';
import Call, { Tests,Test } from '../calls/Tests';
import UserCall from '../calls/User';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import Skeleton from '../components/test/Skeleton';


const Login: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const { name } = useParams<{ name: string; }>();
  var [items,setItems] =useState<Test[]>([]);

  const login=(name:string)=>{
    UserCall.fakeLogin(name).then(()=>{
      window.location.reload();
    })
  }
  

  const effectRan = useRef(false);
  useEffect(()=>{    
    if(effectRan.current) return;
      Call.getTests(user?.name||'').then(test=>{      
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
          <IonItem onClick={()=>login('patient')}  button detail={true}>
            <IonAvatar slot="start">
              <IonImg src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'/>
            </IonAvatar>
            <IonLabel>
              <h1>patient</h1>
              <h2>#1</h2>
            </IonLabel>
          </IonItem>  
          <IonItem onClick={()=>login('dermatologist')}  button detail={true}>
            <IonAvatar slot="start">
              <IonImg src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'/>
            </IonAvatar>
            <IonLabel>
              <h1>Doctor</h1>
              <h2>Dermatologist</h2>
            </IonLabel>
          </IonItem>  
          <IonItem onClick={()=>login('admin')}   button detail={true}>
            <IonAvatar slot="start">
              <IonImg src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'/>
            </IonAvatar>
            <IonLabel>
              <h1>Patient</h1>
              <h2>Max</h2>
            </IonLabel>
          </IonItem>                  
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Login;
