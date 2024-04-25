"use client"

import ReactMarkdown from "react-markdown"

import { MarkdownRenderers } from "@/app/upload/utils/MarkdownRenderers"
import { usePostContext } from "@/contexts/PostContext"
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react"
import Header from "../PostCard/Header"

import { useComments } from "@/hooks/comments"
import { transform3SpeakContent } from "@/lib/utils"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import CommentsSection from "./commentSection"
import HiveClient from "@/lib/hiveclient"
import Post from "../PostCard"
import { PostProps } from "@/lib/models/post"
import { use, useState, useEffect } from "react"
import { transformIPFSContent } from "@/lib/utils"
interface PostModalInterface {
  isOpen: boolean
  onClose(): void
}

export function PostModal({ isOpen, onClose }: PostModalInterface) {
  const { post } = usePostContext()
  const { comments } = useComments(post.author, post.permlink)
  const postBody = transform3SpeakContent(post.body)
  const [postData, setPostData] = useState<PostProps[]>([])

  const fetchPosts = async (username: string) => {
    try {
      const query = {
        tag: username,
        limit: 3
      };
      const hiveClient = HiveClient;
      const response = await hiveClient.database.getDiscussions("blog", query);
      console.log(response);

      // export interface PostProps {
      //   post_id: number
      //   author: string
      //   permlink: string
      //   title: string
      //   body: string
      //   json_metadata: string
      //   created: string
      //   url: string
      //   root_title: string
      //   total_payout_value: Asset | string
      //   curator_payout_value: Asset | string
      //   pending_payout_value: Asset | string
      //   active_votes: PostActiveVotes[]
      // }

      // Assuming the response is an array of posts, map each post to match the PostProps type
      // console.log("RESPONSE:", response[0].author);
      // const formattedResponse = response.map((post: any) => ({
      //   post_id: 1,
      //   author: response.
      // }));
      // setPostData(formattedResponse);
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchPosts(post.author)
  }, [post.author])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "lg", md: "2xl", lg: "6xl" }}
    >
      <ModalOverlay style={{ backdropFilter: "blur(5px)" }} />
      <ModalContent
        bg={"black"}
        border={"1.4px solid limegreen"}
        borderRadius={0}
        p={4}
        w={"100%"}
      >
        <ModalHeader>
          <Header variant="open" />
        </ModalHeader>
        <ModalCloseButton mr={4} mt={2} color={"red"} />
        <ModalBody
          display={"flex"}
          flexDir={{ base: "column", lg: "row" }}
          minH={"60vh"}
          gap={6}
        >
          <Box
            bg={"black"}
            flex={0}
            p={0}
            border={"0px solid limegreen"}
            borderRadius={0}
            minW={"50%"}
          >
            <ReactMarkdown
              components={MarkdownRenderers}
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {transformIPFSContent(postBody)}
            </ReactMarkdown>
          </Box>
          <Box minW={"50%"}>
            <Center>
              <Text
                fontSize={"2xl"}
              >
                Comments
              </Text>
            </Center>
            <CommentsSection comments={comments} />
            <Center>
              <Text
                fontSize={"2xl"}
              >
                More from {post.author}
              </Text>
              {/* <VStack>

                {postData.map((post: PostProps, index: number) => (
                  <Post key={index} postData={post} />
                ))}
              </VStack> */}
            </Center>
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PostModal
