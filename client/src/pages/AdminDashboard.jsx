function AdminDashboard() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#faf7f5] px-4">
      <div className="bg-white p-10 rounded-3xl text-center shadow-lg">
        <h1 className="text-[#4a1625] text-4xl font-bold mb-4">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Manage users, owners, venues, and platform activities.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;