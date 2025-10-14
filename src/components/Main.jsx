import { useEffect, useState } from "react";
import MainChart from "./mainChart/MainChart"
import MainMap from "./mainMap/MainMap"
import { useDispatch } from "react-redux";
import { getMapList } from "../store/thunks/mapAxioThunk";

function Main() {
  const dispatch = useDispatch();
  const [selectedRegion] = useState('서울');

  useEffect(() => {
    dispatch(getMapList())
  }, [dispatch])


  return (
    <>
      {/* <div>
        <select onChange={e => setSelectedRegion(e.target.value)} value={selectedRegion}>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div> */}
      <div style={{display: 'flex', maxWidth: '1400px', width: '100%'}}>
        <MainChart selectedRegion={selectedRegion} />
        <MainMap selectedRegion={selectedRegion} />
      </div>
    </>
  )
}

export default Main