import React from "react";
import { useState, useEffect } from "react";
import CountUp from "react-countup";

export default function Tab(props) {
    const [tab, setTab] = useState('vn')
    const data = props.data
    const [worldData, setWorldData] = useState([])
    function handleChange(str) {
        setTab(str)
    }

    useEffect(() => {
        const covidWorld = async () => {
            const response = await fetch('https://api.apify.com/v2/key-value-stores/SmuuI0oebnTWjRTUh/records/LATEST?disableRedirect=true')
            const data = await response.json()
            setWorldData(data.regionData[0])
        }
        covidWorld()
    }, [])

    return (
        <div className="p-2 pb-3 tab-section">
            <ul className="nav nav-pills mb-3 justify-content-center gap-2" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        onClick={() => handleChange('vn')}
                        className={tab === 'vn' ? 'nav-link active' : 'nav-link'}
                        id="pills-vn-tab"
                        data-bs-toggle="pill" data-bs-target="#pills-vn" type="button" role="tab" aria-controls="pills-vn" aria-selected="true">VIỆT NAM</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        onClick={() => handleChange('world')}
                        className={tab === 'world' ? 'nav-link active' : 'nav-link'}
                        id="pills-world-tab"
                        data-bs-toggle="pill" data-bs-target="#pills-world" type="button" role="tab" aria-controls="pills-world" aria-selected="false">THẾ GIỚI</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane tab-display fade show active d-flex flex-column gap-2 justify-content-center align-items-center" id="pills-vn" role="tabpanel" aria-labelledby="pills-vn-tab">
                    <div className='cases'>
                        <h6>CA NHIỄM</h6>
                        <h2>{
                            tab === 'vn' ?
                                <CountUp
                                    end={data.infected}
                                    duration={3}
                                    separator='.'
                                /> :
                                <CountUp
                                    end={worldData.totalCases}
                                    duration={3}
                                    separator='.'
                                />
                        }</h2>
                        <p>hôm nay +{
                            tab === 'vn' ?
                                <CountUp
                                    end={data.infectedToday}
                                    duration={3}
                                    separator='.'
                                />
                                :
                                <CountUp
                                    end={worldData.newCases}
                                    duration={3}
                                    separator='.'
                                />

                        }</p>
                    </div>
                    <div className='recovery'>
                        <h6>HỒI PHỤC</h6>
                        <h2>{
                            tab === 'vn' ?
                                <CountUp
                                    end={data.recovered}
                                    duration={3}
                                    separator='.'
                                />
                                :
                                <CountUp
                                    end={worldData.totalRecovered}
                                    duration={3}
                                    separator='.'
                                />
                        }</h2>
                        <p>hôm nay +{
                            tab === 'vn' ?
                                <CountUp
                                    end={data.recoveredToday}
                                    duration={3}
                                    separator='.'
                                />
                                :
                                <CountUp
                                    end={worldData.newRecovered}
                                    duration={3}
                                    separator='.'
                                />
                        }</p>
                    </div>
                    <div className='death'>
                        <h6>TỬ VONG</h6>
                        <h2>{
                            tab === 'vn' ?
                                <CountUp
                                    end={data.died}
                                    duration={3}
                                    separator='.'
                                />
                                :
                                <CountUp
                                    end={worldData.totalDeaths}
                                    duration={3}
                                    separator='.'
                                />
                        }</h2>
                        <p>hôm nay +{
                            tab === 'vn' ?
                                <CountUp
                                    end={data.diedToday}
                                    duration={3}
                                    separator='.'
                                />
                                :
                                <CountUp
                                    end={worldData.newDeaths}
                                    duration={3}
                                    separator='.'
                                />

                        }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}