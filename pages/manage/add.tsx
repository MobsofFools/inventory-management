import { Container, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState, ChangeEvent } from "react";
import { displayItemCollectionRef } from "../../db/calls";
import { addDoc } from "@firebase/firestore";
import { DisplayItem } from "../../common/types";
const AddItems: NextPage = () => {
  const [itemname, setItemName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imgurl, setImgURL] = useState<string>("");
  
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
  const newItem:DisplayItem = {
    itemname:itemname,
    description:description,
    price:price,
    imgurl:imgurl,
  }
  const clearFields = () => {
      setItemName("");
      setDescription("");
      setPrice("");
      setImgURL("");
  }
  const submitForm = async() => {
    await addDoc(displayItemCollectionRef, newItem).then(a => {clearFields(); console.log("added")})
  }
  return (
    <Container>
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
        <Input id="price" value={price} onChange={onPriceChange} type={"number"}></Input>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="imgurl">Image URL(not required)</FormLabel>
        <Input id="imgurl" value={imgurl} onChange={onImgURLChange}></Input>
      </FormControl>
      <Button onClick={submitForm}>
          Add
      </Button>
    </Container>
  );
};
export default AddItems;
