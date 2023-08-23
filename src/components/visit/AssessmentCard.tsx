import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import InputData from "./InputData"
import { Field, Formik,FieldProps, FieldArray, FormikValues, useFormikContext } from "formik";
import Row from "./Row";


const AssessmentCard: React.FC<{name:string,children: JSX.Element[]}> = ({name,children}) => {    

    return ( <IonCard>
        <IonButtons className="ion-float-right">            
          <IonButton fill="clear">Delete</IonButton>          
        </IonButtons>
        <IonCardHeader>
          <IonCardTitle>{name}</IonCardTitle>                
        </IonCardHeader>
        <IonCardContent>            
          {children}                    
        </IonCardContent>
        
      </IonCard>  )
  }

export default AssessmentCard;