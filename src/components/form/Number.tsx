import { IonInput, IonTextarea } from "@ionic/react";
import InputData from "./InputData"
import { Field, Formik,FieldProps, FieldArray, FormikValues, useFormikContext } from "formik";
import Row from "./Row";


const Textarea: React.FC<InputData> = ({name,label,autosave=()=>{}}) => {    
  if(label) return(<Row label={label}>
      <Textarea {...{name:name,autosave:autosave}}/>
  </Row>
  )
    return (<Field name={name}>
            {(field:FieldProps)=><IonInput type="number" value={field.field.value}  onIonChange={(e)=>{
                field.form.setFieldValue(field.field.name,e.detail.value)
                autosave({...field.form.values,[field.field.name]:e.detail.value})
                }}/>}
        </Field>)
  }

export default Textarea;