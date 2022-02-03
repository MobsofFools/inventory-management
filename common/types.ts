import { Dispatch,SetStateAction } from 'react'
import {User} from '@firebase/auth-types'
import {DocumentReference} from '@firebase/firestore-types'
export type Stock = {
    store:string;
    stock:number;
}

export type DisplayItem = {
    itemname: string,
    description:string,
    price: string,
    imgurl?:string,
    id?:string,
    totalstock?: Stock[]
}

export type Inventory = {
    itemid: DocumentReference,
    stock: number,
    id?:string
}
