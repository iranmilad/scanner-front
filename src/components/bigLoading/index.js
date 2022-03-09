import { Center, Loader,Text } from "@mantine/core"

/**
 * Big Loading Component is a fullscreen loading
 * @component
 * @example
 * return (
 * <BigLoading />
 * )
 */
const BigLoading = ()=>{
  return (
    <Center sx={(theme)=>({height:"100vh",flexDirection:"column",zIndex:9999999999})}>
      <Loader color="indigo" size={70} mb={30} variant="dots" />
      <Text color="indigo" size="md">لطفا منتظر بمانید</Text>
    </Center>
  )
}

export default BigLoading;