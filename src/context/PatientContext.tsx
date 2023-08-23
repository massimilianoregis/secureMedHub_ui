import React, { createContext, useContext, useState } from 'react';
interface PatientInfo{
  id:string,
  visit?:string,
  children?: JSX.Element
}

interface PatientContextType {
  patientInfo?: PatientInfo;
  updatePatient: (userData: PatientInfo) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

  
interface PatientData{
  patient?:PatientInfo,
  children?: JSX.Element
}
export const PatientProvider: React.FC<PatientData> = ({patient, children }) => {
  const [patientInfo, setPatient] = useState<PatientInfo|undefined>(patient);

  const updatePatient = (userData: PatientInfo ) => {
    setPatient(userData);
  };

  return (
    <PatientContext.Provider value={{ patientInfo, updatePatient }}>
      {children}
    </PatientContext.Provider>
  );
};


export const usePatientContext = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatientContext deve essere utilizzato all\'interno di un UserProvider');
  }
  return context;
};

