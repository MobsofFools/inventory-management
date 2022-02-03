import { DisplayItem } from "../common/types";
import { doc, getDoc, getDocs, query, orderBy, updateDoc,deleteDoc } from "@firebase/firestore";
import { db } from "./firebase-config";
import {collection} from '@firebase/firestore'
import { displayItemConverter } from './converters';
import {Stock} from '../common/types';

export const displayItemCollectionRef = collection(db,"items").withConverter(displayItemConverter);
// export const inventoryCollectionRef = collection(db,"inventory").withConverter(inventoryConverter);


export const getItems = async () => {
    const q = query(displayItemCollectionRef, orderBy("price","desc"));
    const data = await getDocs<DisplayItem>(q);
    const dataArray = data.docs.map((doc)=> ({
        ...doc.data(),
        id:doc.id
    }));
    return dataArray;
}

// export const getInventory = async () => {
//     const q = query(inventoryCollectionRef, orderBy("stock","desc"));
//     const data = await getDocs<Inventory>(q);
//     const dataArray = data.docs.map((doc)=> ({
//         ...doc.data(),
//         id:doc.id
//     }));
//     return dataArray;
// }
export const getItem = async (id:string) => {
    const itemDocRef = doc(db,"items", id).withConverter(displayItemConverter);
    const docSnap = await getDoc(itemDocRef);
    if(docSnap.exists()){
        const item = docSnap.data();
        return item
    }
    else{
        console.log("oof")
    }
}
// export const getItemInventory = async(id:string) => {
//     const itemDocRef = doc(db,"items", id).withConverter(displayItemConverter);
//     if(itemDocRef !== undefined)
//     {
//         const q = query(inventoryCollectionRef,
//             where("itemid","==",itemDocRef));
//         const data = await getDocs<Inventory>(q);
//         const dataArray = data.docs.map((doc)=> ({
//             ...doc.data(),
//             id:doc.id
//         }));
//         return dataArray;
//     } 
// }
export const updateStock = async(id:string, stockData:Stock[]) => {
    const itemDocRef = doc(db,"items", id).withConverter(displayItemConverter);
    await updateDoc(itemDocRef, {
        totalstock:stockData
    })
}
export const updateItem = async(id:string, item:DisplayItem) => {
    const itemDocRef = doc(db,"items", id).withConverter(displayItemConverter);
    await updateDoc(itemDocRef,{
        itemname:item.itemname,
        description:item.description,
        price:item.price,
        imgurl:item.imgurl,
        totalstock:item.totalstock
    })
}
export const deleteItem = async(id:string) => {
    await deleteDoc(doc(db,"items",id).withConverter(displayItemConverter));
}