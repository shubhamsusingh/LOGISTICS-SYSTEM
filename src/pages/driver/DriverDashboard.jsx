import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../styles/dashboard.css";

function DriverDashboard(){

  const deliveries = [
    {location:"Anganwadi 1", demand:"200kg"},
    {location:"Dairy Center", demand:"150kg"},
    {location:"Village Store", demand:"300kg"}
  ];

  return(

    <div className="dashboard">

      <Sidebar/>

      <div className="main">

        <Navbar/>

        <h2>Today's Delivery List</h2>

        <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>Delivery Point</th>
              <th>Demand</th>
            </tr>

          </thead>

          <tbody>

            {deliveries.map((d,i)=>(
              <tr key={i}>
                <td>{d.location}</td>
                <td>{d.demand}</td>
              </tr>
            ))}

          </tbody>

        </table>

        </div>

      </div>

    </div>

  )

}

export default DriverDashboard;