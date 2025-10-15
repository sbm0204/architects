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
      <div style={{display: 'flex', maxWidth: '1400px', width: '100%'}}>
        <MainChart />
        <MainMap />
      </div>
    </>
  )
}

export default Main