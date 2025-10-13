import { useEffect } from "react";
import MainChart from "./mainChart/MainChart"
import MainMap from "./mainMap/MainMap"
import { useDispatch, useSelector } from "react-redux";
import { getMapList } from "../store/thunks/mapAxioThunk";

function Main() {
  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getMapList())
  }, [])
  const mapList = useSelector(state => state.mapAxio.mapList);
  console.log(mapList); // TODO 삭제해야 함

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