function DashboardTable({
    tableHeadData,
    transections,
}: {
    tableHeadData: any;
    transections: any;
}) {
    console.log(transections);
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                            {val?.amount}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            {val?.type}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            {val?.category}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            {val?.description}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">
                                            {val?.date}
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
