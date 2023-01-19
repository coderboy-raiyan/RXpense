/* eslint-disable no-nested-ternary */
import Currency from "react-currency-formatter";
import Moment from "react-moment";

function DashboardTable({
    tableHeadData,
    transections,
    currentLocation,
}: {
    tableHeadData: any;
    transections: any;
    currentLocation: any;
}) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto ">
                <div className="py-2sm:px-6 inline-block min-w-full lg:px-8">
                    <div className="overflow-hidden drop-shadow-md">
                        <table className="min-w-full border">
                            <thead className="border-b bg-white">
                                <tr>
                                    {tableHeadData.length > 0 &&
                                        tableHeadData?.map((head: any, i: any) => (
                                            <th
                                                key={i}
                                                scope="col"
                                                className="px-6 py-4 text-left text-sm font-medium capitalize text-gray-900"
                                            >
                                                {head}
                                            </th>
                                        ))}
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-sm font-medium capitalize text-gray-900"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            {/* Table Body */}

                            <tbody>
                                {transections?.map((val: any, i: any) => (
                                    <tr key={i} className="border-b bg-gray-100">
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            <span
                                                className={`${
                                                    val.type === "expense"
                                                        ? "text-[#B74749]"
                                                        : "text-[#2E6115]"
                                                }`}
                                            >
                                                {val.type === "expense" ? "-" : "+"}
                                                <Currency
                                                    quantity={+val?.amount}
                                                    currency={
                                                        currentLocation?.countryCode
                                                            ? currentLocation.countryCode === "BD"
                                                                ? "BDT"
                                                                : "USD"
                                                            : "USD"
                                                    }
                                                />
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            <span
                                                className={`rounded-full py-1 px-2 text-white ${
                                                    val.type === "expense"
                                                        ? "bg-[#B74749]"
                                                        : "bg-[#2E6115]"
                                                }`}
                                            >
                                                {val?.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            {val?.category}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            {val?.description}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            <Moment format="D MMM YYYY" withTitle>
                                                {new Date(val?.date)}
                                            </Moment>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            Button
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardTable;
