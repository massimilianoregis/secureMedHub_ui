import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bandageOutline, bandageSharp, bookmarkOutline, eyedropOutline, eyedropSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, peopleCircle, peopleCircleOutline, peopleOutline, peopleSharp, speedometerOutline, speedometerSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { useUserContext } from '../context/UserContext';

interface AppPage {
  id:string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    id:'patient.status',
    title: 'Status',
    url: '/page/Status',
    iosIcon: peopleCircleOutline,
    mdIcon: peopleSharp    
  },
  {
    id:'patient.visits',
    title: 'Visits',
    url: '/page/PastVisit',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    id:'patient.tests',
    title: 'Tests',
    url: '/page/TestResult',
    iosIcon: eyedropOutline,
    mdIcon: eyedropSharp
  },
  {
    id:'patient.prescription',
    title: 'Prescription',
    url: '/page/Medication',
    iosIcon: bandageOutline,
    mdIcon: bandageSharp
  },
  {
    id:'hospital.patients',
    title: 'Patients',
    url: '/page/Patients',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp
  }
];


const Menu: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{user.name}</IonListHeader>
          <IonNote>{user.email}</IonNote>
          {appPages.filter(item=>user.admit(item.id)).map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
