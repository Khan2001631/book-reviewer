import axios from "axios";
import { useEffect, useState } from "react";
import AssignRole from "../../../components/secure/assign-role";

const AdminPage = () => {

    const [allUsers, setAllUsers] = useState<any>([]);
    const [totalAdmins, setTotalAdmins] = useState<number>(0);
    const [totalMembers, setTotalMembers] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>(null); // Store selected user data for modal
    const [isRefreshAPI, setIsRefreshAPI] = useState<boolean>(false);

    const fetchAllUsers = async () => {
        const getUsers = await axios('/api/v1/admin/getUsers');
        console.log(getUsers?.data);
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
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                <p className="text-gray-600">Manage users and assign roles effectively.</p>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow p-4 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                    <p className="text-3xl font-bold text-blue-500">{allUsers?.length}</p>
                </div>
                <div className="bg-white shadow p-4 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700">Admins</h2>
                    <p className="text-3xl font-bold text-green-500">{totalAdmins}</p>
                </div>
                <div className="bg-white shadow p-4 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700">Members</h2>
                    <p className="text-3xl font-bold text-purple-500">{totalMembers}</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map user data here */}
                        {allUsers?.map((user: any) => (
                            <tr key={user._id} className="text-gray-700">
                                <td className="px-4 py-2">{user?.name}</td>
                                <td className="px-4 py-2">{user?.email}</td>
                                <td className="px-4 py-2">{user?.role}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
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
