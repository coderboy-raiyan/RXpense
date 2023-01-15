import { useState } from "react";
import DashboardModal from "./DashboardModal";

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
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
            <DashboardModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent you an email with
                        all of the details of your order.
                    </p>
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Got it, thanks!
                    </button>
                </div>
            </DashboardModal>
        </section>
    );
}

export default Dashboard;
