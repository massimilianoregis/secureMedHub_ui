import React, { createContext, useContext, useEffect, useState } from 'react';
import Call, { User } from '../calls/User'

const patient ={      
    features:{  
    },
    role:[],
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

  useEffect(()=>{        
    Call.getUserMe().then((user:any)=>{
      console.log(user)
      setUser({
        ...user,
        features:user.features||{"test.logins":true },
        email:'email@email.com',
        admit:function(name:string){      
          return this.features[name]
      }
      });
    })
  },[])
  

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

