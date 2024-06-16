"use client"
import AuthorAvatar from "@/components/AuthorAvatar"
import { Avatar, Box, Divider, HStack, Link, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import AirdropModal from "./airdropModal"
interface AvatarListProps {
  sortedComments: any[]
}
const AvatarList = ({ sortedComments }: AvatarListProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const InviteAvatar = () => {
    return (
      <Box
        w={"40px"}
        h={"40px"}
        borderRadius={"50%"}
        bg={"gray.200"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Link href={"/invite"}>
          <Tooltip
            label={"Invite someone cool enough"}
            bg={"white"}
            color={"#A5D6A7"}
            border={"1px dashed #A5D6A7"}
          >

            <Avatar
              border={"1px solid white"}
              name="+"
              boxSize={12}
              bg="white"
              src="/loading.gif"
              loading="lazy"
              borderRadius={100}
              _hover={{ cursor: "pointer" }} />
          </Tooltip>
        </Link>
      </Box>
    )
  }

  const AirdropAvatar = () => {
    return (
      <Box
        mr={1}
        w={"40px"}
        h={"40px"}
        borderRadius={"50%"}
        bg={"gray.200"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {isOpen && <AirdropModal sortedComments={sortedComments} isOpen={isOpen} onClose={handleCloseModal} />}
        <Tooltip
          label={"Create Airdrop"}
          bg={"white"}
          color={"gold"}
          border={"1px dashed gold"}
        >
          <Avatar
            onClick={() => setIsOpen(true)}
            border={"1px solid white"}
            name="airdrop"
            boxSize={12}
            bg="white"
            src="https://i.ibb.co/cgykmcc/image.png"
            loading="lazy"
            borderRadius={100}
            _hover={{ border: "1px solid gold", cursor: "pointer" }} />
        </Tooltip>
      </Box>
    )
  }

  return (
    <HStack
      flexWrap={"nowrap"}
      w={"100%"}
      css={{ "&::-webkit-scrollbar": { display: "none" } }}
      overflowX="auto"
      minHeight={"60px"}
      px={4}
    >
      <AirdropAvatar />
      <InviteAvatar />
      {sortedComments?.map((comment, index, commentsArray) => {
        const isDuplicate =
          commentsArray.findIndex((c) => c.author === comment.author) !==
          index
        if (isDuplicate) {
          return null
        }
        return (
          <AuthorAvatar
            username={comment.author}
            key={comment.author}
            hover={{
              zIndex: 1,
              transform: "scale(1.05)",
              border: "1px solid #A5D6A7",
            }}
            borderRadius={100}

          />
        )
      })}
      <Divider />
    </HStack>
  )
}

export default AvatarList
