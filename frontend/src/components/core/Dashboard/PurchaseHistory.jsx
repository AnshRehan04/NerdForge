import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { apiConnector } from '../../../services/apiConnector'

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const [history, setHistory] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await apiConnector(
          "GET",
          import.meta.env.VITE_APP_BASE_URL
            ? `${import.meta.env.VITE_APP_BASE_URL}/payment/history`
            : "/api/v1/payment/history",
          null,
          { Authorization: `Bearer ${token}` }
        )
        console.log("Purchase history API response:", res)
        setHistory(res.data.payments || [])
      } catch (err) {
        setError(err.message || "Failed to fetch purchase history")
        setHistory([])
      }
    }
    fetchHistory()
  }, [token])

  if (error) return <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
  if (!history) return <div className="text-xl font-semibold text-center">Loading...</div>
  if (history.length === 0) return <div className="text-2xl text-center mt-10 font-semibold">No purchases yet.</div>

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Purchase History</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-4 px-6 text-gray-700 font-semibold border-b border-gray-200">Course Name</th>
              <th className="py-4 px-6 text-gray-700 font-semibold border-b border-gray-200">Payment ID</th>
              <th className="py-4 px-6 text-gray-700 font-semibold border-b border-gray-200">Order ID</th>
              <th className="py-4 px-6 text-gray-700 font-semibold border-b border-gray-200">Amount</th>
              <th className="py-4 px-6 text-gray-700 font-semibold border-b border-gray-200">Payment Date</th>
              <th className="py-4 px-6 text-gray-700 font-semibold border-b border-gray-200">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr 
                key={item._id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-200`}
              >
                <td className="py-4 px-6 text-gray-800 border-b border-gray-200">{item.course?.courseName || 'N/A'}</td>
                <td className="py-4 px-6 text-gray-800 font-mono border-b border-gray-200">{item.paymentId}</td>
                <td className="py-4 px-6 text-gray-800 font-mono border-b border-gray-200">{item.orderId}</td>
                <td className="py-4 px-6 text-gray-800 font-semibold border-b border-gray-200">₹{item.amount / 100}</td>
                <td className="py-4 px-6 text-gray-800 border-b border-gray-200">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="py-4 px-6 text-gray-800 border-b border-gray-200 capitalize">{item.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 