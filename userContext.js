import { createContext, useState } from "react";

const UserType = createContext({
  userId: "",
  setUserId: () => {},
  userDetail: [],
  setUserDetail: () => {},
});

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  return (
    <UserType.Provider value={{ userId, setUserId ,userDetail,setUserDetail}}>
      {children}
    </UserType.Provider>
  );
};

export { UserContext, UserType };
