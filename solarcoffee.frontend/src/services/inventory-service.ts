import { IProduct } from '@/types/Product';
import axios from 'axios';
import {IProductInventory} from "@/types/Product";
import { IShipment } from '@/types/Shipment';
import IInventoryTimeline from '@/types/InventoryGraph';

/**
 * Inventory Service
 * Provides UI business logic associated with product inventory
 */

export class InventoryService{
    API_URL = process.env.VUE_APP_API_URL;

    public async getInventory(): Promise<IProductInventory[]>{
        console.log('getInventory', this.API_URL)
        let result: IProductInventory[] =  await axios.get(`${this.API_URL}/inventory/`);
        return result;
    }

    public async updateInventoryQuantity(shipment: IShipment){
        let result = await axios.patch(`${this.API_URL}/inventory/`, shipment);
        return result.data;
    }

    public async getSnapshotHistory(): Promise<IInventoryTimeline>{
        let result: any = await axios.get(`${this.API_URL}/inventory/snapshot`);
        return result.data;
    }

}