import LoadingButton from "components/Button/LoadingButton";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsPlusLg } from "react-icons/bs";
import { FaChartArea, FaListUl } from "react-icons/fa";
import findMyLocation from "utils/FindMyLocation";
import Analytics from "./Analytics";

import DashboardModal from "./DashboardModal";
import DashboardTable from "./DashboardTable";

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
    "Others add in Reference",
];

export interface IAddTransectionDataTypes {
    amount: string | number | any;
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
    const { httpTransectionService } = useAxiosPrivate();
    const [transections, setTransections] = useState([]);
    const [tableHeadData, setTableHeadData] = useState({});
    const [frequency, setFrequency] = useState("7");
    const [type, setType] = useState("all");
    const [isGetTransectionLoading, setIsGetTransectionLoading] = useState(false);
    const [viewData, setViewData] = useState(localStorage.getItem("viewData") || "table");
    const [currentLocation, setCurrentLocation] = useState<any>("");

    useEffect(() => {
        localStorage.setItem("viewData", viewData);
    }, [viewData]);

    useEffect(() => {
        findMyLocation().then((data: any) => setCurrentLocation(data));
    }, []);

    const [usersData, setUsersData] = useState<IAddTransectionDataTypes>({
        amount: "",
        type: "",
        category: "",
        description: "",
        reference: "",
        date: "",
    });

    // Handel Input Change
    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setUsersData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Handel The form Submit
    async function handelSave(e: React.FormEvent) {
        e.preventDefault();
        if (isNaN(usersData.amount)) {
            toast.error("Amount must be a valid number");
            return;
        }
        if (!usersData.type) {
            toast.error("Please select a expense type");
            return;
        }
        if (!usersData.type) {
            toast.error("Please select a expense category");
            return;
        }
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
            toast.error("Failed to add Transection!!");
        } finally {
            setLoading(false);
        }
    }

    // Get Transections
    useEffect(() => {
        let isMounted = true;
        async function getAllTransections() {
            setIsGetTransectionLoading(true);
            try {
                const response = await httpTransectionService.getTransections(frequency, type, {
                    headers: {
                        Authorization: `Bearer ${auth?.accessToken}`,
                    },
                });
                isMounted && setTransections(response?.transections);
                setTableHeadData(
                    Object.keys(response?.transections[0]).filter(
                        (value) =>
                            value !== "_id" &&
                            value !== "reference" &&
                            value !== "userId" &&
                            value !== "createdAt" &&
                            value !== "updatedAt" &&
                            value !== "__v"
                    )
                );
            } catch (error) {
                toast.error(`Couldn't get the Transections`);
            } finally {
                setIsGetTransectionLoading(false);
            }
        }
        if (auth?.email) {
            getAllTransections();
        }
        return () => {
            isMounted = false;
        };
    }, [auth, loading, frequency, type]);

    return (
        <section>
            <div className="mx-auto my-4 lg:max-w-6xl">
                {/* Filters */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-20">
                        {/* Frequency Filters */}
                        <div className="space-y-2">
                            <h3 className="text-sm">Select Frequency</h3>
                            <select
                                className="rounded text-sm text-gray-500"
                                onChange={(e) => setFrequency(e.target.value)}
                            >
                                <option value="7">Last 1 week</option>
                                <option value="30">Last 1 Month</option>
                                <option value="365">Last 1 Year</option>
                                <option value="custom">custom</option>
                            </select>
                        </div>
                        {/* Type filters */}
                        <div className="space-y-2">
                            <h3 className="text-sm">Select Expense Type</h3>
                            <select
                                className="rounded text-sm text-gray-500"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>

                        {/* ViewData Filters */}
                        <div className="flex flex-col space-y-2">
                            <h3>Select your view</h3>
                            <div className="flex justify-center space-x-4 rounded-lg border border-gray-400 py-2 px-4">
                                <button
                                    onClick={() => setViewData("table")}
                                    className={`text-xl  ${
                                        viewData === "table" ? "text-gray-800" : "text-gray-400"
                                    }`}
                                    type="button"
                                >
                                    <FaListUl />
                                </button>
                                <button
                                    onClick={() => setViewData("analytics")}
                                    className={`text-xl  ${
                                        viewData === "analytics" ? "text-gray-800" : "text-gray-400"
                                    }`}
                                    type="button"
                                >
                                    <FaChartArea />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center rounded-lg border-2 border-indigo-600 bg-indigo-600 py-3 px-6 text-lg text-white shadow-lg transition-all hover:bg-white hover:text-indigo-600"
                            type="button"
                        >
                            Add new <BsPlusLg className="ml-2" />
                        </button>
                    </div>
                </div>
                <hr className="my-4" />
                {/* Content */}
                <div className="content mt-10">
                    {isGetTransectionLoading ? (
                        <LoadingButton svg="w-16 h-16 text-indigo-500" styles="mx-auto my-20" />
                    ) : (
                        <>
                            {/* <h1 className="mb-4 text-center text-2xl font-semibold text-indigo-600 drop-shadow">
                                Expenses Table
                            </h1> */}
                            {transections.length > 0 ? (
                                viewData === "table" ? (
                                    <DashboardTable
                                        currentLocation={currentLocation}
                                        tableHeadData={tableHeadData}
                                        transections={transections}
                                    />
                                ) : (
                                    <Analytics
                                        currentLocation={currentLocation}
                                        transections={transections}
                                    />
                                )
                            ) : (
                                <p className="mt-14 text-center text-3xl font-semibold text-gray-300">
                                    Add your first expense
                                </p>
                            )}
                        </>
                    )}
                </div>
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
                            placeholder={`${
                                currentLocation?.countryCode
                                    ? currentLocation?.countryCode === "BD"
                                        ? "12,000 BDT"
                                        : "5,000 USD"
                                    : "5,000 USD"
                            }`}
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
                            <option value="">Select</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
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
                            <option value="">Select</option>
                            {transectionCategories.map((cate, i) => (
                                <>
                                    <option key={i} value={cate}>
                                        {cate}
                                    </option>
                                </>
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
