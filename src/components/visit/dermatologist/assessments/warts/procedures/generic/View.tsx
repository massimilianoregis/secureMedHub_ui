import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import { businessOutline, calendarNumberOutline, callOutline, caretForwardOutline, closeOutline, refreshOutline } from "ionicons/icons";

import React, { Suspense, useState } from "react";


interface Procedure {
  name:string,
  component:string
}


const View: React.FC<Procedure> = (procedure) => {   
  return (<>test</>)
}

export default View
