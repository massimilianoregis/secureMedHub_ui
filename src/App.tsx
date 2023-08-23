import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import {Medication, PastVisit, Status, TestResult} from './pages';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { UserProvider } from './context/UserContext';
import Patients from './pages/Patients';
import Visit from './pages/Visit';
import { useEffect } from 'react';
import Login from './pages/Login';

setupIonicReact();

const App: React.FC = () => {

  useEffect(()=>{    
    console.log('app')    
  },[])
  
  return (    
    <IonApp>
      <IonReactRouter>
        <UserProvider>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/PastVisit" />
            </Route>
            <Route path="/page/PastVisit" exact={true}>
              <PastVisit />
            </Route>
            <Route path="/page/TestResult" exact={true}>
              <TestResult />
            </Route>
            <Route path="/page/Medication" exact={true}>
              <Medication />
            </Route>
            <Route path="/page/Status" exact={true}>
              <Status />
            </Route>
            <Route path="/page/Visit" exact={true}>
              <Visit />
            </Route>
            <Route path="/page/Patient/:id" exact={true}>
              <Visit />
            </Route>
            <Route path="/page/Login" exact={true}>
              <Login />
            </Route>            
          </IonRouterOutlet>
        </IonSplitPane>
        </UserProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
