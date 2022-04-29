import React from "react";
import { useState, useEffect } from 'react';
import nonAccentVietnamese from "./vietnamese";
import CountUp from "react-countup";

export default function Table(props) {

    const data = props.data.locations
    const [tableData, setTableData] = useState([])
    const [order, setOrder] = useState('ASC')
    useEffect(() => {
        setTableData(data)
    }, [data])

    function sorting(col) {
        if (order === 'ASC') {
            const sorted = [...tableData].sort((a, b) => {
                if (typeof a[col] === 'string')
                    return a[col].toLowerCase().replace(/đ/g, "d") > b[col].toLowerCase().replace(/đ/g, "d") ? 1 : -1
                if (typeof a[col] === 'number')
                    return a[col] - b[col]
            })
            setTableData(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...tableData].sort((a, b) => {
                if (typeof a[col] === 'string')
                    return a[col].toLowerCase().replace(/đ/g, "d") < b[col].toLowerCase().replace(/đ/g, "d") ? 1 : -1
                if (typeof a[col] === 'number')
                    return b[col] - a[col]
            })
            setTableData(sorted)
            setOrder('ASC')
        }
    }

    function handleChange(e) {
        const input = e.target.value
        setTableData(data.filter(province => {
            return nonAccentVietnamese(province.name)
                .includes(nonAccentVietnamese(input))
        }))
    }

    return (
        <div className="container-xl">
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Tìm kiếm</span>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Tỉnh/Thành phố"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th
                            onClick={() => sorting('name')}
                            scope="col"
                            className="align-middle"
                        >
                            <div>Tỉnh/TP <i className="fa-solid fa-sort"></i></div>
                        </th>
                        <th
                            onClick={() => sorting('cases')}
                            scope="col"
                            className="align-middle"
                        >
                            <div>Ca nhiễm <i className="fa-solid fa-sort"></i></div>
                        </th>
                        <th
                            onClick={() => sorting('casesToday')}
                            scope="col"
                            className="align-middle"
                        >
                            <div>Nhiễm mới <i className="fa-solid fa-sort"></i></div>
                        </th>
                        <th
                            onClick={() => sorting('death')}
                            scope="col"
                            className="align-middle"
                        >
                            <div>Tử vong <i className="fa-solid fa-sort"></i></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (tableData) &&
                        tableData.map(province => {
                            return (
                                <tr key={province.name}>
                                    <td className="align-middle">{province.name}</td>
                                    <td className="align-middle">
                                        <CountUp
                                            end={province.cases}
                                            duration={0}
                                            separator='.'
                                        />
                                    </td>
                                    <td className="align-middle">
                                        <CountUp
                                            end={province.casesToday}
                                            duration={0}
                                            separator='.'
                                        />
                                    </td>
                                    <td className="align-middle">
                                        <CountUp
                                            end={province.death}
                                            duration={0}
                                            separator='.'
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}