import React, {FC} from 'react';
import {Space, Tag, Table} from "antd";
import columns from './tableColumns'
import {useSelector} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ItemType} from '../../redux/dataReducer';

const TableOut: FC = () => {
    const items = useTypedSelector<Array<ItemType>>(state => state.dataReducer.items)
    const data = items.map(item => {
        return {
            key: item.id,
            date: item.date,
            title: item.title,
            quantity: item.quantity,
            distance: item.distance,
        }
    });
    return <div className="site-layout-background" style={{maxHeight: '100%', overflowY: "scroll"}}>
        <Table
            columns={columns}
            dataSource={data}
            pagination={{position: ['bottomRight', 'topRight']}}
        />
    </div>
};

export default TableOut;