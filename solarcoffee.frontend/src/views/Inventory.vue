<template>
    <div class="inventory-container">
        <h1 class="inventoryTitle">
            Inventory Dashboard
        </h1>
        <hr>
        <div class="inventoryActions">
            <solar-button @click.native="showNewProductModal" id="addNewBtn">
                Add New Item
            </solar-button>
            <solar-button @click.native="showShipmentModal" id="receiveShipmentBtn">
                Receive Shipment
            </solar-button>
        </div>

        <table id="inventory-table" class="table">
            <tr>
                <th>Item</th>
                <th>Quantity On-hand</th>
                <th>Unit Price</th>
                <th>Taxable</th>
                <th>Delete</th>
            </tr>

            <tr v-for="item in inventory" :key="item.id">
                <td>
                    {{item.product.name}}
                </td>
                <td>
                    {{item.quantityOnHand}}
                </td>
                <td>
                    {{item.product.price | price }}
                </td>
                <td>
                    <span v-if="item.product.isTaxable">
                        Yes
                    </span>
                    <span v-else>
                        No
                    </span>
                </td>
                <td>
                    <div>
                        X
                    </div>
                </td>
            </tr>
        </table>

        <new-product-modal 
            v-if="isNewProductVisible"
            @save:product="saveNewProduct"
            @close="closeModals" 
        />
        <shipment-modal 
            v-if="isShipmentVisible" 
            :inventory="inventory"
            @save:shipment="saveNewShipment"
            @close="closeModals"
        />

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IProduct, IProductInventory } from "../types/Product";
import SolarButton from "@/components/SolarButton.vue";
import NewProductModal from "@/components/modals/NewProductModal.vue";
import ShipmentModal from "@/components/modals/ShipmentModal.vue";
import { IShipment } from '../types/Shipment';

@Component({
    name: 'Inventory',
    components: { SolarButton, NewProductModal, ShipmentModal }
})

export default class Inventory extends Vue {
    isNewProductVisible: boolean= false;
    isShipmentVisible: boolean= false;

    
    inventory: IProductInventory[] = [

        {
            id:1,
            product: { 
                id: 1, 
                name: 'Some product', 
                description: 'Good Stuff', 
                price: 100, 
                createdOn: new Date(), 
                updatedOn: new Date(),
                isTaxable: false,
                isArchived: false,
            },
            idealQuantity: 100,
            quantityOnHand: 100,
        },
        {
            id:2,
            product: { 
                id: 2, 
                name: 'Another product', 
                description: 'Good Stuff', 
                price: 100, 
                createdOn: new Date(), 
                updatedOn: new Date(),
                isTaxable: true,
                isArchived: false,
            },
            idealQuantity: 20,
            quantityOnHand: 40,
        }
    ];

    closeModals(){
        this.isShipmentVisible = false;
        this.isNewProductVisible = false;
    }

    showNewProductModal(){
        this.isNewProductVisible = true;
    };
    showShipmentModal(){
        this.isShipmentVisible = true;
        
    }

    saveNewProduct(newProduct: IProduct){
        console.log('saveNewProduct');
        console.log(newProduct);

    }

    saveNewShipment(shipment: IShipment){
        console.log('saveNewShipment');
        console.log(shipment);
    }
    
}
</script>

<style scoped lang="sass">

</style>