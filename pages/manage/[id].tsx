import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent } from "react";
import {
  Container,
  Input,
  FormControl,
  FormLabel,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  IconButton,
  TableCaption,
} from "@chakra-ui/react";
import { DisplayItem, Stock } from "../../common/types";
import { getItem, updateStock } from "../../db/calls";
const ItemDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentItem, setCurrentItem] = useState<DisplayItem>();
  const [itemname, setItemName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imgurl, setImgURL] = useState<string>("");
  const [showStockPrompt, setShowStockPrompt] = useState(false);
  const [stock, setStock] = useState<Stock[]>();
  const [newStockEntry, setNewStockEntry]= useState<Stock>({store:"", stock:0})
  const [error ,setError] = useState(false);

  const onItemNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };
  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const onImgURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImgURL(e.target.value);
  };
  const onStoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStockEntry({
      ...newStockEntry,
      store:e.target.value
    })
  }
  const onStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStockEntry({
      ...newStockEntry,
      stock:Number.parseFloat(e.target.value)
    })
  }
  const addStockEntry = () => {
    if(stock && newStockEntry){
      var data = [...stock,newStockEntry]
      console.log(data);
      if(typeof id === "string")
      {
        try{
          updateStock(id,data).then(a => setNewStockEntry({store:"", stock:0}));
        }
        catch (e){
          setError(true);
        }
      }
    }
    if(!stock||stock.length===0 && newStockEntry)
    {
      var data = [newStockEntry];
      if(typeof id === "string")
      {
        try{
          updateStock(id,data).then(a => setNewStockEntry({store:"", stock:0}));
        }
        catch (e){
          setError(true);
        }
      }
    }
    setStock(stock?.concat(newStockEntry));
  }
  useEffect(() => {
    if (typeof id === "string") {
      getItem(id).then((data) => setCurrentItem(data));
    }
  }, [id]);

  useEffect(() => {
    if (currentItem) {
      setItemName(currentItem.itemname);
      setDescription(currentItem.description);
      setPrice(currentItem.price);
      const stockArray: Stock[] = [];
      currentItem.totalstock?.forEach((item) => {
        stockArray.push(item);
      });
      setStock(stockArray);
    }
  }, [currentItem]);
  return (
    <div style={{ display: "flex" }}>
      <Container borderRadius={8} bg="white" margin={2} padding={8}>
        <FormControl isRequired>
          <FormLabel htmlFor="itemname">Name</FormLabel>
          <Input
            id="itemname"
            value={itemname}
            onChange={onItemNameChange}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            value={description}
            onChange={onDescriptionChange}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="price">Price</FormLabel>
          <Input
            id="price"
            value={price}
            onChange={onPriceChange}
            type={"number"}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="imgurl">Image URL(not required)</FormLabel>
          <Input id="imgurl" value={imgurl} onChange={onImgURLChange}></Input>
        </FormControl>
        <Button>Update</Button>
      </Container>
      <Container borderRadius={8} bg="white" margin={2} padding={8}>
        <Table variant={"simple"} colorScheme={"messenger"}>
          <Thead>
            <Tr>
              <Th>Store</Th>
              <Th>Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stock && stock.length >0 && showStockPrompt ? (
              <>
                {stock.map((item) => {
                  return (
                    <Tr key={item.store}>
                      <Td>{item.store}</Td>
                      <Td>{item.stock}</Td>
                    </Tr>
                  );
                })}
                <Tr>
                  <Td>
                    <Input value={newStockEntry.store} onChange={onStoreChange}></Input>
                  </Td>
                  <Td>
                    <Input type={"number"} value={newStockEntry.stock} onChange={onStockChange}></Input>
                  </Td>
                </Tr>
              </>
            ) : stock && stock.length>0? (
              stock.map((item) => {
                return (
                  <Tr key={item.store}>
                    <Td>{item.store}</Td>
                    <Td>{item.stock}</Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td></Td>
                <Td>No Stock</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {showStockPrompt ? (
          <Button onClick={addStockEntry}>
            Confirm Entry
          </Button>
        ) : (
          <Button onClick={() => setShowStockPrompt(true)}>Add Stock</Button>
        )}
      </Container>
    </div>
  );
};
export default ItemDetails;
