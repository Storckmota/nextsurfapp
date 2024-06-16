import { SKATEHIVE_TAG } from "@/lib/constants"
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"

interface CommunityTotalPayout {
  totalHBDPayout: number
}

function CommunityTotalPayout() {
  const [totalHBDPayout, setTotalHBDPayout] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const formattedNumber = useMemo(
    () =>
      totalHBDPayout.toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    [totalHBDPayout]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hiveHubResponse = await fetch(
          `https://stats.hivehub.dev/communities?c=${SKATEHIVE_TAG}`
        )
        const resJson = await hiveHubResponse.json()
        const hiveInfo = resJson[SKATEHIVE_TAG]
        let totalPayoutNumber = 65666;
        if (hiveInfo && hiveInfo.total_payouts_hbd) {
          try {
            totalPayoutNumber = parseFloat(hiveInfo.total_payouts_hbd.replace("$", ""));
          } catch (error) {
            console.error("Error reading 'total_payouts_hbd': ", error);
            totalPayoutNumber = 65666;
          }
        }

        setTotalHBDPayout(totalPayoutNumber)
        setLoading(false)
      } catch (error: any) {
        setTotalHBDPayout(420.0)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <center>
      <Box
        margin="0px"
        padding="4px"
        width={"100%"}
        borderRadius="md"
        color="chartreuse"
        border={"1px solid #A5D6A7"}
      >
        {loading ? (
          <VStack>
            <Image
              alt="Loading..."
              boxSize={"24px"}
              src="https://64.media.tumblr.com/12da5f52c1491f392676d1d6edb9b055/870d8bca33241f31-7b/s400x600/fda9322a446d8d833f53467be19fca3811830c26.gif"
            />

            <Text fontSize={"12px"} color={"chartreuse"}>
              Loading...
            </Text>
          </VStack>
        ) : error ? (
          <Text fontSize="18px">Error: {error}</Text>
        ) : (
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Text
              color={"lightgreen"}
              fontSize="25px"
              fontWeight="bold"
              textShadow={"1px 1px 15px white"}
              gap={1}
              display={"flex"}
            >
              ${formattedNumber}
            </Text>
            <Text
              color={"#A5D6A7"}
              fontSize="12px"
              fontWeight="bold"
              textShadow={"1px 1px 15px white"}
            >
              Paid to Surfers Skaters
            </Text>
          </Flex>
        )}
      </Box>
    </center>
  )
}

export default CommunityTotalPayout
