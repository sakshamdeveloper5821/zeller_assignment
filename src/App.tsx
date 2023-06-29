import { useEffect, useState } from "react";
import { getListCustomers } from "./utils/getListZellerCustomers";
import {
  Box,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import "./App.css";
import { UserData } from "./utils/userInterface";

interface userTypes {
  "ADMIN": string,
  "MANAGER": string
}

const userType: userTypes = {
  "ADMIN": "Admin User",
  "MANAGER": "Manager User"
}

function App() {
  const [role, setRole] = useState<string>("ADMIN");
  const [userDetails, setUserDetails] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const filteredUsers = userDetails.filter((detail: UserData) => detail.role === role);

  useEffect(() => {
    setLoading(true);
    getListCustomers().then((response:UserData[]) => {
      setLoading(false);
      setUserDetails(response);
    });
  }, []);
  if (loading)
    return (
      <div className="spinner" >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          data-testid="spinner"
        ></Spinner>
      </div>
    );
  return (
    <Box className="mainWrapper">
      <Box className="childWrapper">
        <Box className="titles">User Types</Box>
        <RadioGroup onChange={setRole} value={role}>
          <Stack direction="column" className="radioWrapper">
            <Box className={`highlighted ${role === "Admin" && "addColor"}`}>
              <Radio value="ADMIN">Admin</Radio>
            </Box>
            <Box className={`highlighted ${role === "Manager" && "addColor"}`}>
              <Radio value="MANAGER">Manager</Radio>
            </Box>
          </Stack>
        </RadioGroup>
      </Box>
      <Box className="childWrapper">
        <Box className="titles">{userType[role as keyof userTypes]}</Box>
        <VStack spacing={4} align="stretch">
          {filteredUsers.map((user: UserData) => (
            <Box key={user.id} className="usersWrapper">
              <Box className="avatar" data-testid="user-avatar">
                <Box className="avatarChild">
                  {user.name.charAt(0).toUpperCase()}
                </Box>
              </Box>
              <Box className="nameAndRoleWrapper">
                <Box className="username" data-testid="user-name">{user.name}</Box>
                <Box>{user.role === "ADMIN" ? "Admin" : "Manager"}</Box>
              </Box>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

export default App;
