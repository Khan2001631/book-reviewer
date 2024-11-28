import axios from "axios";
import { useState } from "react";

interface AssignRoleProps {
    selectedUser: any;
    onCloseModal: () => void;
    setIsRefreshAPI: React.Dispatch<React.SetStateAction<boolean>>
}

const AssignRole: React.FC<AssignRoleProps> = ({ selectedUser, onCloseModal, setIsRefreshAPI }) => {
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [displayMessage, setDisplayMessage] = useState<string>('');

    const handleAssignRole = async() => {
        if(selectedRole === '') {
            setDisplayMessage('Please select a role.');
            return;
        }
        const payload = {
            userId: selectedUser?._id,
            newRole: selectedRole
        }
        console.log(payload);
        const response = await axios.patch('/api/v1/admin/update-role', payload);
        console.log(response);
        
        onCloseModal();  // Close the modal after assigning the role
        setIsRefreshAPI(true);
    };

    const handleRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
        if(event.target.value === '') {
            setDisplayMessage('Please select a role.');
        }
        else {
            setDisplayMessage('');
        }
    }

    const resetValues = () => {
        setSelectedRole('');
        setDisplayMessage('');
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Manage User: {selectedUser?.name}</h2>
                <p className="text-gray-700 mb-4">Email: {selectedUser?.email}</p>
                <p className="text-gray-700 mb-4">Role: {selectedUser?.role}</p>

                {/* Role Assignment Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Role</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                            value={selectedRole}
                            onChange={(e) => handleRole(e)}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                        </select>
                    </div>
                </div>
                <div>
                    {displayMessage.length > 0 && <p className="text-red-500">{displayMessage}</p>}
                </div>

                {/* Buttons for actions */}
                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                        onClick={onCloseModal}
                    >
                        Close
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                        onClick={handleAssignRole}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignRole;
