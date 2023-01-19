import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Currency from "react-currency-formatter";

function Analytics({ transections, currentLocation }: { transections: any; currentLocation: any }) {
    // Transection Calculation
    const totalTransections = transections?.length;
    const totalIncomeTransections = transections?.filter((trans: any) => trans.type === "income");
    const totalExpenseTransections = transections?.filter((trans: any) => trans.type === "expense");
    const totalIncomePercent = (totalIncomeTransections.length / totalTransections) * 100;
    const totalExpensePercent = (totalExpenseTransections.length / totalTransections) * 100;

    // Turnover calculation
    const totalTurnover = transections.reduce(
        (acc: any, curr: any) => acc + Number(curr.amount),
        0
    );
    const totalIncomeTurnover = totalIncomeTransections.reduce(
        (acc: any, curr: any) => acc + Number(curr.amount),
        0
    );
    const totalExpenseTurnover = totalExpenseTransections.reduce(
        (acc: any, curr: any) => acc + Number(curr.amount),
        0
    );

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

    return (
        <div>
            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-2">
                {/* card Data */}
                <div className="mx-auto w-full rounded-lg border border-gray-300 bg-gray-100 p-4 text-gray-500 drop-shadow-lg md:w-[70%] lg:w-[80%]">
                    <h3 className="text-center text-lg font-semibold text-cyan-600">
                        Total transection : {totalTransections}
                    </h3>

                    {/* Content */}
                    <div className="mt-4 flex justify-around">
                        <div className="w-2/5 space-y-2">
                            <h4 className="text-center text-[#398812]">
                                Income : {totalIncomeTransections.length}
                            </h4>

                            <CircularProgressbar
                                value={Math.floor(totalIncomePercent)}
                                text={`${Math.floor(totalIncomePercent)}%`}
                                styles={buildStyles({
                                    strokeLinecap: "round",
                                    textSize: "16px",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `#4dbe14`,
                                    textColor: "#398812",
                                })}
                            />
                        </div>
                        <div className="w-2/5 space-y-2">
                            <h4 className="text-center text-[#B74749]">
                                Expense : {totalIncomeTransections.length}
                            </h4>
                            <CircularProgressbar
                                value={Math.floor(totalExpensePercent)}
                                text={`${Math.floor(totalExpensePercent)}%`}
                                styles={buildStyles({
                                    strokeLinecap: "round",
                                    textSize: "16px",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `#B74749`,
                                    textColor: "#B74749",
                                })}
                            />
                        </div>
                    </div>
                </div>
                {/* card Data */}
                <div className="mx-auto w-full rounded-lg border border-gray-300 bg-gray-100 p-4 text-gray-500 drop-shadow-lg md:w-[70%] lg:w-[80%]">
                    <h3 className="text-center text-lg font-semibold text-cyan-600">
                        Total Turnover :{" "}
                        <Currency
                            quantity={totalTurnover}
                            currency={
                                currentLocation?.countryCode
                                    ? currentLocation.countryCode === "BD"
                                        ? "BDT"
                                        : "USD"
                                    : "USD"
                            }
                        />
                    </h3>

                    {/* Content */}
                    <div className="mt-4 flex justify-around">
                        <div className="w-2/5 space-y-2">
                            <h4 className="text-center  text-[#398812]">
                                Income turnover
                                <br />
                                <Currency
                                    quantity={totalIncomeTurnover}
                                    currency={
                                        currentLocation?.countryCode
                                            ? currentLocation.countryCode === "BD"
                                                ? "BDT"
                                                : "USD"
                                            : "USD"
                                    }
                                />
                            </h4>

                            <CircularProgressbar
                                value={Math.floor(totalIncomeTurnoverPercent)}
                                text={`${Math.floor(totalIncomeTurnoverPercent)}%`}
                                styles={buildStyles({
                                    strokeLinecap: "round",
                                    textSize: "16px",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `#4dbe14`,
                                    textColor: "#398812",
                                })}
                            />
                        </div>
                        <div className="w-2/5 space-y-2">
                            <h4 className="text-center text-[#B74749]">
                                Expense turnover <br />
                                <Currency
                                    quantity={totalExpenseTurnover}
                                    currency={
                                        currentLocation?.countryCode
                                            ? currentLocation.countryCode === "BD"
                                                ? "BDT"
                                                : "USD"
                                            : "USD"
                                    }
                                />
                            </h4>
                            <CircularProgressbar
                                value={Math.floor(totalExpenseTurnoverPercent)}
                                text={`${Math.floor(totalExpenseTurnoverPercent)}%`}
                                styles={buildStyles({
                                    strokeLinecap: "round",
                                    textSize: "16px",
                                    pathTransitionDuration: 0.5,
                                    pathColor: `#B74749`,
                                    textColor: "#B74749",
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
