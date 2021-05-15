import axios from 'axios'
import {ItemDataField, ItemType} from '../redux/dataReducer'


const create = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

const itemsApi = {
    getItems: () => {
        return create.get<Array<ItemType>>('items').then(response => response.data)
    },
    sortItems: (itemDataField:ItemDataField) => {
        return create.post<Array<ItemType>>('items', itemDataField).then(response => response.data)
    }
}
export default itemsApi