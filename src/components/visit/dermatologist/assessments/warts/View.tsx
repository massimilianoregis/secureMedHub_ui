import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";
import moment from "moment-timezone";
import React, { Suspense, useState } from "react";
import LazyComponent from "../../../../LazyComponent";
import { usePatientContext } from "../../../../../context/PatientContext";
import { Field, Formik,FieldProps, FieldArray, FormikValues, useFormikContext } from "formik";
import Textarea from "../../../../form/Textarea";
import Select from "../../../../form/Select";
import Row from "../../../../form/Row";
import Visits, { Assessment } from "../../../../../calls/Visits";
import { useUserContext } from "../../../../../context/UserContext";
import AssessmentCard from "../../../AssessmentCard";

import bodyPart from "../../bodyParts.json"
import procedures from "./procedures.json"

interface Procedure {
  name:string,
  component:string
}


const View: React.FC<{assessment:Assessment}> = ({assessment}) => {   
  return (
      <IonAccordion value={assessment.name} key={assessment.name}>
              <IonItem slot="header" color="light">
                <IonLabel>{assessment.name} - {assessment.where}</IonLabel>
              </IonItem>
                <div className="ion-padding" slot="content">
                <IonText color="secondary"><h2>Note</h2></IonText>
                <p>{assessment.note}</p>
                {assessment.expectations&&<>
                  <IonText color="secondary"><h2>Expectations</h2></IonText>
                  <p>{assessment.expectations}</p>
                </>}
                {assessment.contact_office_if&&<>
                  <IonText color="secondary"><h2>Contact office if</h2></IonText>
                  <p>{assessment.contact_office_if}</p>
                </>}
                {assessment.prescriptions&&<>
                  <IonText color="secondary"><h2>Prescriptions</h2></IonText>
                  {assessment.prescriptions?.join()}
                </>}                      
                {assessment.referrals&&<>
                  <IonText color="secondary"><h2>Referrals</h2></IonText>
                  {assessment.referrals?.join()}
                </>}                      
          
                </div>
            </IonAccordion>)
}

export default View
