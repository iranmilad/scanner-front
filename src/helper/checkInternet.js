import {useNetwork} from "@mantine/hooks"

const CheckInternet = () => {
  let networkStatus = useNetwork();
  window['networkStatus'] = networkStatus;
  return <></>
}

export default CheckInternet