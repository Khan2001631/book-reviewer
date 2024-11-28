import axios from "axios";
import { useEffect, useState } from "react";
import AssignRole from "../../../components/secure/assign-role";

const AdminPage = () => {

    const [allUsers, setAllUsers] = useState<any>([]);
    const [totalAdmins, setTotalAdmins] = useState<number>(0);
    const [totalMembers, setTotalMembers] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>(null); // Store selected user data for modal
    const [isRefreshAPI, setIsRefreshAPI] = useState<boolean>(true);

    const fetchAllUsers = async () => {
        const getUsers = await axios('/api/v1/admin/getUsers');
        if(getUsers?.data?.success === true) {
            const allUsers = getUsers?.data?.data;
            const totalAdmins = allUsers?.filter((person: any) => (
                person.role === 'admin'
            ));
            const totalMembers = allUsers?.filter((person: any) => (
                person.role === 'member'
            ));
            setAllUsers(allUsers);
            setTotalAdmins(totalAdmins?.length);
            setTotalMembers(totalMembers?.length);
        }
        
    }
    useEffect(() => {
        if(isRefreshAPI === true) {
            fetchAllUsers();
            setIsRefreshAPI(false);
        }
    },[isRefreshAPI]);

    const openModal = (user: any) => {
        setSelectedUser(user); // Set the selected user for the modal
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedUser(null); // Clear selected user
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
    {/* Header */}
    <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Admin Panel</h1>
        <p className="text-gray-400">Manage users and assign roles effectively.</p>
    </div>

    {/* Summary Section */}
    <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 shadow p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-300">Total Users</h2>
            <p className="text-3xl font-bold text-blue-400">{allUsers?.length}</p>
        </div>
        <div className="bg-gray-800 shadow p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-300">Admins</h2>
            <p className="text-3xl font-bold text-green-400">{totalAdmins}</p>
        </div>
        <div className="bg-gray-800 shadow p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-300">Members</h2>
            <p className="text-3xl font-bold text-purple-400">{totalMembers}</p>
        </div>
    </div>

    {/* User Table */}
    <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 shadow-md rounded-lg border-collapse border border-gray-700">
            <thead>
                <tr className="bg-gray-700 text-gray-300">
                    <th className="px-4 py-3 text-left border border-gray-700">Name</th>
                    <th className="px-4 py-3 text-left border border-gray-700">Email</th>
                    <th className="px-4 py-3 text-left border border-gray-700">Role</th>
                    <th className="px-4 py-3 text-left border border-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody>
                {allUsers?.map((user: any, index: number) => (
                    <tr
                        key={user._id}
                        className={`text-gray-300 ${
                            index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                        }`}
                    >
                        <td className="px-4 py-2 text-left border border-gray-700">
                            {user?.name}
                        </td>
                        <td className="px-4 py-2 text-left border border-gray-700">
                            {user?.email}
                        </td>
                        <td className="px-4 py-2 text-left border border-gray-700">
                            {user?.role}
                        </td>
                        <td className="px-4 py-2 text-left border border-gray-700">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                onClick={() => openModal(user)}
                            >
                                Manage User
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    {isModalOpen && (
        <AssignRole selectedUser={selectedUser} onCloseModal={closeModal} setIsRefreshAPI={setIsRefreshAPI}/>
    )}
</div>

    );
};

export default AdminPage;
