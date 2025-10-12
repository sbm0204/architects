import MainChart from "./mainChart/MainChart"
import MainMap from "./mainMap/MainMap"

function Main() {

  return (
    <>
      <div style={{display: 'flex'}}>
      <MainChart />
      <MainMap />
      </div>

    </>
  )
}

export default Main