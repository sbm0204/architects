import { useEffect } from "react";
import MainChart from "./mainChart/MainChart"
import MainMap from "./mainMap/MainMap"
import { useDispatch } from "react-redux";
import { getMapList } from "../store/thunks/mapAxioThunk";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapList())
  }, [])
  
  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: '9fr 5fr',maxWidth: '1400px' ,margin: '20px auto'}}>
      {/* <div style={{display: 'flex', maxWidth: '1400px', width: '100%', margin: '20px'}}> */}
        <div>
        <MainChart />
        </div>
        <MainMap />
      </div>
    </>
  )
}

export default Main