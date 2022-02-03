import { NextPage } from "next"
import { useState,useEffect } from "react";
import { DisplayItem } from "../../common/types";
import ItemCard from "../../components/ItemCard/ItemCard";
import { getItems } from "../../db/calls";

const Items: NextPage = () => {
  const [itemArray, setItemArray] = useState<DisplayItem[]>()
  useEffect(()=>{
      getItems().then(data => setItemArray(data));
  },[])
  
  useEffect(()=>{
      console.log(itemArray)
  },[itemArray])    

  return(
    <div style={{overflowY:"scroll", maxHeight:"85vh"}}>
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
        {itemArray?.map((item)=> {
          var s = 0;
          item.totalstock?.forEach((val)=> { 
            s+=val.stock;
          })
          if(s === 0)
          {
            return <ItemCard {...item} key={item.id } outofstock={true}/>
          }
          else
          {
            return <ItemCard {...item} key={item.id} />
          }
        })}
    </div>
    </div>
);
};
export default Items;
