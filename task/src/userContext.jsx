import {createContext, useState} from "react";

 const UserContext = createContext({
    userInfo: null,
    setUserInfo: (info) => {},
});

export function UserContextProvider({children}) {
  const [userInfo,setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}  
export default UserContext;