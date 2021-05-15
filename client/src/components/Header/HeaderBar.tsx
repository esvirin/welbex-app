import React, {FC, useEffect, useState} from 'react';
import {Button, Col, Input, message, Row, Select} from 'antd';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getItems, sortItems} from '../../redux/dataReducer';
import Columns from "./Columns";
import SubmitButton from './SubmitButton';

const {Option} = Select;

const HeaderBar = () => {
    const {isFetching, error} = useTypedSelector(state => state.dataReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getItems())
    }, [])

    let [columnValue, changeColumn] = useState('')
    let [conditionValue, changeCondition] = useState('')
    let [meaningValue, changeMeaning] = useState('')

    const changeColumnHandle = (value: string) => {
        changeColumn(columnValue = value)
    }
    const changeConditionHandle = (value: string) => {
        changeCondition(conditionValue = value)
    }
    const changeMeaningHandle = (event: any) => {
        changeMeaning(meaningValue = event.target.value)
    }
    const submitHandle = () => {
        dispatch(sortItems({
            column: columnValue,
            condition: conditionValue,
            meaning: meaningValue
        }))
    }
    return <Row>
        <Col span={4}><Columns isFetching={isFetching} changeColumnHandle={changeColumnHandle}/> </Col>

        {error && message.error(error)}

        {columnValue === 'distance' &&
        <Col span={20}>
            <Select
                disabled={isFetching}
                placeholder={'Выбор условия'}
                style={{maxWidth: 120}}
                onChange={changeConditionHandle}
            >
                <Option value="=">равно</Option>
                <Option value=">">больше</Option>
                <Option value="<">меньше</Option>
            </Select>
            <Input
                disabled={isFetching}
                type={"number"}
                style={{width: 120}}
                onChange={changeMeaningHandle}
            />
            <SubmitButton isFetching={isFetching} submitHandle={submitHandle}/>
        </Col>
        }

        {
            columnValue === 'quantity' &&
            <Col span={20}>
                <Select
                    disabled={isFetching}
                    placeholder={'Выбор условия'}
                    style={{maxWidth: 120}}
                    onChange={changeConditionHandle}
                >
                    <Option value="=">равно</Option>
                    <Option value=">">больше</Option>
                    <Option value="<">меньше</Option>
                </Select>
                <Input
                    disabled={isFetching}
                    type={"number"}
                    style={{width: 120}}
                    onChange={changeMeaningHandle}
                />
                <SubmitButton isFetching={isFetching} submitHandle={submitHandle}/>
            </Col>
        }

        {columnValue === 'title' &&
        <Col span={20}>
            <Select
                disabled={isFetching}
                placeholder={'Выбор условия'}
                style={{maxWidth: 120}}
                onChange={changeConditionHandle}
            >
                <Option value="like">содержит</Option>
            </Select>
            <Input
                disabled={isFetching}
                type={"text"}
                style={{width: 120}}
                onChange={changeMeaningHandle}
            />
            <SubmitButton isFetching={isFetching} submitHandle={submitHandle}/>
        </Col>}


    </Row>
}

export default HeaderBar
