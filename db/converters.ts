import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "@firebase/firestore";
import { DisplayItem, Inventory } from "../common/types";

export const displayItemConverter: FirestoreDataConverter<DisplayItem> = {
  toFirestore(item: WithFieldValue<DisplayItem>): DocumentData {
    return {
      itemname: item.itemname,
      description: item.description,
      price: item.price,
      imgurl: item.imgurl,
      totalstock:item.totalstock
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): DisplayItem {
    const data = snapshot.data(options)!;
    return {
      itemname: data.itemname,
      description: data.description,
      price: data.price,
      imgurl:data.imgurl,
      totalstock:data.totalstock
    };
  },
};
  
  // export const inventoryConverter: FirestoreDataConverter<Inventory> = {
  //   toFirestore(item: WithFieldValue<Inventory>): DocumentData {
  //     return {
  //       itemid:item.itemid,
  //       stock:item.stock
  //     };
  //   },
  //   fromFirestore(
  //     snapshot: QueryDocumentSnapshot,
  //     options: SnapshotOptions
  //   ): Inventory {
  //     const data = snapshot.data(options)!;
  //     return {
  //       itemid:data.itemid,
  //       stock:data.stock
  //     };
  //   },
  // };