import { ICustomer } from '@/types/Customer';
import Axios from 'axios';
import { IServiceResponse } from '@/types/ServiceResponse';


/**
 * Customer Service
 * Provides UI business logic associated with Customers
 */
export default class CustomerService{
    API_URL = process.env.VUE_APP_API_URL;

    public async getCustomers(): Promise<ICustomer[]>{
        let result: any = await Axios.get(`${this.API_URL}/customer/`);
        return result.data;
    };

    public async addCustomer(newCustomer: ICustomer): Promise<IServiceResponse<ICustomer>>{
        let result: any = await Axios.post(`${this.API_URL}/customer/`, newCustomer);
        return result.data;
    };

    public async deleteCustomer(customerId: number): Promise<boolean>{
        let result: any = await Axios.delete(`${this.API_URL}/customer/${customerId}`);
        return result.data;
    };
}