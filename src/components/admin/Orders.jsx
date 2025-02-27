import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './Sidebar';

const orders = [
  { id: "1", userId: "U001", artistId: "A001", date: "2023-06-01", price: 1299.99 },
  { id: "2", userId: "U002", artistId: "A002", date: "2023-06-02", price: 799.99 },
  { id: "3", userId: "U003", artistId: "A003", date: "2023-06-03", price: 449.99 },
  { id: "4", userId: "U004", artistId: "A005", date: "2023-06-10", price: 1099.99 },
];

export default function Orders() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <h1 className="fw-bold mb-4">Orders</h1>

        <div className="container">
          <div className="table-responsive border rounded border-warning p-3 shadow">
            <table className="table table-striped table-bordered">
              <thead className="table-secondary">
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Artist ID</th>
                  <th>Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.artistId}</td>
                    <td>{order.date}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
