import { IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import InputData from "./InputData"
import { Field, Formik,FieldProps, FieldArray, FormikValues, useFormikContext } from "formik";
import Row from "./Row";


interface SelectData extends InputData{
    items:string[]|Option[]
    multiple?:boolean
}
interface Option {
    name:string
    
}
const Select: React.FC<SelectData> = ({name,label,autosave,items,onChange,multiple}) => {    
    if(label) return(<Row label={label}>
            <Select {...{name:name,autosave:autosave,items:items,onChange:onChange,multiple:multiple}}/>
        </Row>
    )

    return (<Field name={name}>
        {(field:FieldProps)=><IonSelect  
            interface={multiple?"alert":"popover"}
            multiple={multiple||false} 
            value={field.field.value} 
            onIonChange={(e)=>{
        field.form.setFieldValue(field.field.name,e.detail.value)
        onChange && onChange(e.detail.value)
        autosave && autosave({...field.form.values,[field.field.name]:e.detail.value})
        }}>
        {items.map(item=><IonSelectOption value={item}>{typeof item!=='string'?item.name:item}</IonSelectOption>)}
        </IonSelect>}
    </Field>  )
  }

export default Select;