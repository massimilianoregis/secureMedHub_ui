import React, { createContext, useContext, useState } from 'react';
interface User {
  name: string;
  dataId: string;
  email:string;
  admit(name:string):boolean
}


const patient ={  
    dataId:'testData',
    name:'max@gmail.com',
    email:'mail@test.it',
    features:{
        'patient.status':{},
        'patient.visits':{},          
        'patient.tests':{},        
        'patient.prescription':{},
        'hospital.patients':{},      
    },
    role:[
      "patients"
    ],
    admit:function(name:string){      
        return patient.features[name]!=null
    }
}
const testUser=patient


interface UserContextType {
  user: User;
  updateUser: (userData: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

  
export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User>(testUser);

  const updateUser = (userData: User ) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext deve essere utilizzato all\'interno di un UserProvider');
  }
  return context;
};

