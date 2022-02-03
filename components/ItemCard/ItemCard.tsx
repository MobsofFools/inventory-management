import { Box } from "@chakra-ui/react";
import { DisplayItem } from "../../common/types";
import { useRouter } from "next/router";
import Image from "next/image";
type ItemCardProps = DisplayItem & {
  outofstock?:boolean;
}
const ItemCard = (props: ItemCardProps) => {
  const { itemname, description, price, imgurl, id, outofstock } = props;
  const router = useRouter();
  const pushToURL = () => {
      const pathname = router.pathname;
      if(id)
      {
        router.push(`${pathname}/${id}`);
      }
  }
  return (
    <Box onClick={pushToURL} border={"1px solid black"} margin={4} padding={4} maxW='xs' borderRadius={8}>
      <Box>
        {outofstock?
        <Box minW={200} height={150} backgroundColor={'black'}></Box>
        :
        <Box minW={200} height={150} backgroundColor={'red'}></Box>
        }
        <Box>{itemname}</Box>
        <Box>{description}</Box>
        <Box>Price:$ {price}</Box>
      </Box>
    </Box>
  );
};
export default ItemCard;
