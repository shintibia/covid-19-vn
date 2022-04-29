import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function Chart(props) {
    const data = props.data.overview
    const [overview, setOverview] = useState('')

    useEffect(() => {
        if (data) {
            setOverview({
                labels: data.map(data => data.date),
                datasets: [
                    {
                        stack: 'stack 0',
                        label: 'Tử vong',
                        data: data.map(data => data.death),
                        backgroundColor: ['#FC6042'],
                    },
                    {
                        stack: 'stack 1',
                        label: 'Hồi phục',
                        data: data.map(data => data.recovered),
                        backgroundColor: ['#2CC990'],
                    },
                    {
                        stack: 'stack 2',
                        label: 'Nhiễm mới',
                        data: data.map(data => data.cases),
                        backgroundColor: ['#FCB941'],
                    },
                ]
            })
        }
    }, [data])

    return (
        <div className="mb-2 mt-2 container-xl">
            {overview &&
                <Bar
                    data={overview}
                />
            }
            <h6>Tình hình dịch 7 ngày qua tại Việt Nam</h6>
            <hr></hr>
        </div>
    )
}