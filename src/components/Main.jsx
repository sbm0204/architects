import MainChart from "./mainChart/MainChart"
import MainMap from "./mainMap/MainMap"

function Main() {

  return (
    <>
      <div className="display-flex">
        <MainChart />
        <MainMap />
      </div>

    </>
  )
}

export default Main