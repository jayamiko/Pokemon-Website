import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tabList } from "../../utils/constants";

function VerticalTab({ item }) {
  const [activeTab, setActiveTab] = useState(tabList[0]);

  return (
    <div className="">
      <ul className="flex items-center md:flex-column text-sm font-medium text-gray-500">
        {tabList?.map((tab, i) => {
          return (
            <li key={i} onClick={() => setActiveTab(tab)}>
              <Link
                href={`#${tab}`}
                className={`inline-flex capitalize rounded-t-lg shadow-sm font-bold justify-center items-center py-3 w-40 ${
                  activeTab === tab
                    ? "bg-sky-700 text-white"
                    : "bg-gray-50 text-black"
                }`}
                aria-current={activeTab === tab ? "page" : ""}
              >
                {tab}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="p-6 bg-gray-50 w-full gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {item[activeTab]?.map((name) => {
          return (
            <div className="bg-slate-500 rounded-xl w-48 h-20 text-black sm:text-lg lg:text-xl font-bold flex items-center justify-center">
              <span>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VerticalTab;
