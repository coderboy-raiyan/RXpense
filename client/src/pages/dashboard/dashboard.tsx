import LoadingButton from "components/Button/LoadingButton";
import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import httpTransectionService from "../../services/http.transection";
import DashboardModal from "./DashboardModal";

const transectionCategories = [
    "Salary",
    "Tip",
    "Project",
    "Movie",
    "Food",
    "Groceries",
    "Medical",
    "Petrol",
    "Gas",
    "Medicine",
    "Doctor fees",
    "Investment Profit",
    "Buy new car",
    "Bills",
    "Fees",
];

export interface IAddTransectionDataTypes {
    amount: string;
    type: string;
    category: string;
    description: string;
    reference: string;
    date: string;
}

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    const [usersData, setUsersData] = useState<IAddTransectionDataTypes>({
        amount: "",
        type: "",
        category: "",
        description: "",
        reference: "",
        date: "",
    });

    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setUsersData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handelSave(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await httpTransectionService.addTransection(usersData, {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`,
                },
            });
            if (response.success) {
                setIsOpen(false);
            }

            toast.success("Transection has been created!");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <div className="mx-auto my-4 lg:max-w-6xl">
                {/* Filters */}
                <div className="flex items-center justify-between">
                    <div>Range Filters</div>
                    <div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="rounded-lg bg-indigo-600 py-2 px-6 text-sm text-white"
                            type="button"
                        >
                            Add new
                        </button>
                    </div>
                </div>
                {/* Content */}
                <div className="content">Content</div>
            </div>
            {/* Add Transection Modal */}
            <DashboardModal title="Add Transection" isOpen={isOpen} setIsOpen={setIsOpen}>
                <form onSubmit={handelSave} className="space-y-4">
                    <label className="flex flex-col space-y-2" htmlFor="amount">
                        <span className="text-xs">Amount</span>
                        <input
                            name="amount"
                            onChange={handleInputChange}
                            value={usersData?.amount}
                            id="amount"
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            required
                            type="text"
                            placeholder="example. 250 USD"
                            autoComplete="off"
                        />
                    </label>

                    <label className="flex flex-col space-y-2" htmlFor="type">
                        <span className="text-xs">Type</span>
                        <select
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            name="type"
                            onChange={handleInputChange}
                            id="type"
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </label>

                    <label className="flex flex-col space-y-2" htmlFor="category">
                        <span className="text-xs">Category</span>
                        <select
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            name="category"
                            onChange={handleInputChange}
                            id="category"
                        >
                            {transectionCategories.map((cate, i) => (
                                <option key={i} value={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="flex flex-col space-y-2" htmlFor="date">
                        <span className="text-xs">Date</span>
                        <input
                            name="date"
                            onChange={handleInputChange}
                            id="date"
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            required
                            type="date"
                            placeholder="example. 250 USD"
                            autoComplete="off"
                        />
                    </label>
                    <label className="flex flex-col space-y-2" htmlFor="reference">
                        <span className="text-xs">Reference</span>
                        <input
                            name="reference"
                            onChange={handleInputChange}
                            value={usersData?.reference}
                            id="reference"
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            required
                            type="text"
                            autoComplete="off"
                        />
                    </label>
                    <label className="flex flex-col space-y-2" htmlFor="description">
                        <span className="text-xs">Description</span>
                        <textarea
                            id="description"
                            onChange={handleInputChange}
                            value={usersData?.description}
                            name="description"
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                        />
                    </label>

                    {/* buttons */}
                    <div>
                        {loading ? (
                            <LoadingButton
                                text="Please wait..."
                                styles="ml-auto block rounded-lg bg-gray-800 py-2 px-6 text-sm text-white"
                            />
                        ) : (
                            <button
                                disabled={loading}
                                type="submit"
                                className="ml-auto block rounded-lg bg-gray-800 py-2 px-6 text-sm text-white"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </DashboardModal>
        </section>
    );
}

export default Dashboard;
