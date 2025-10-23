import { useEffect } from "react";
import MainChart from "./mainChart/MainChart"
import MainMap from "./mainMap/MainMap"
import { useDispatch } from "react-redux";
import { getMapList } from "../store/thunks/mapAxioThunk";
import './Main.css'

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapList());
  }, []);

  return (
    <>
      <div className="main-display">
        <MainChart />
        <MainMap />
      </div>
    </>
  )
}

export default Main