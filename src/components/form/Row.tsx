import { IonItem, IonLabel, IonTextarea } from "@ionic/react";
import InputData from "./InputData"
import { Field, Formik,FieldProps, FieldArray, FormikValues, useFormikContext } from "formik";
import Textarea from "./Textarea";


const Row: React.FC<{label:string,children?: JSX.Element,}> = ({label,children}) => {    
    return (<IonItem>
        <IonLabel slot="start">{label}</IonLabel>
        {children}         
      </IonItem>)
  }

export default Row;