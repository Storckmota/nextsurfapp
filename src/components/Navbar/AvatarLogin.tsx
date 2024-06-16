"use client"

import useAuthHiveUser from "@/lib/useHiveAuth"
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip
} from "@chakra-ui/react"
import { LogOut, User } from "lucide-react"
import Link from "next/link"
import { FaEthereum, FaSpeakap, FaWallet } from "react-icons/fa"
import LoginButton from "../Hive/Login/LoginButton"


export default function AvatarLogin() {
  const { hiveUser, logout } = useAuthHiveUser()

  return hiveUser ? (
    <Menu placement="bottom-end">
      <MenuButton>
        <Tooltip label="Profile">
          <Avatar
            name={hiveUser.name}
            src={hiveUser.metadata?.profile.profile_image}
            borderRadius={"10px"}
            size="md"
            bg="gray.200"
          />
        </Tooltip>
      </MenuButton>

      <MenuList bg="white" >
        <MenuItem
          bg="white"
          _hover={{ bg: "#A5D6A7", color: "white" }}
          icon={<User size={"16px"} />}
          as={Link}
          href={`/profile/${hiveUser.name}`}
        >
          Profile
        </MenuItem>
        <MenuItem
          _hover={{ bg: "#A5D6A7", color: "white" }}
          bg="white"
          icon={<FaEthereum size={"16px"} />}
          as={Link}
          href={`/dao`}
        >
          Dao
        </MenuItem>
        <MenuItem
          _hover={{ bg: "#A5D6A7", color: "white" }}
          bg="white"
          icon={<FaWallet size={"16px"} />}
          as={Link}
          href={`/wallet`}
        >
          Wallet
        </MenuItem>
        <MenuItem
          _hover={{ bg: "#A5D6A7", color: "white" }}
          bg="white"
          icon={<FaSpeakap size={"16px"} />}
          as={Link}
          href={`/plaza`}
        >
          Plaza
        </MenuItem>
        <MenuItem
          _hover={{ bg: "red", color: "white" }} bg="white" icon={<LogOut size={"16px"} />} onClick={logout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <LoginButton />
  )
}
