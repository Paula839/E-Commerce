import { ObjectId } from "mongodb";
export interface cart {
  item: ObjectId;
  name: string;
  quantity: number;
}
