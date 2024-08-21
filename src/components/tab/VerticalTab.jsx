import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tabList } from "../../utils/constants";
import ItemBox from "../card/ItemBox";

function VerticalTab({ item }) {
  const [activeTab, setActiveTab] = useState(tabList[0]);

  return (
    <div className="">
      <ul className="flex items-center md:flex-column text-xs md:text-sm font-medium text-gray-500">
        {tabList?.map((tab, i) => {
          return (
            <li key={i} onClick={() => setActiveTab(tab)}>
              <Link
                href={`#${tab}`}
                className={`inline-flex capitalize rounded-t-lg shadow-sm font-bold justify-center items-center py-2 md:py-3 w-28 md:w-32 xl:w-40 ${
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
      <div className="p-3 sm:p-4 xl:p-6 bg-gray-50 w-full gap-2 sm:gap-3 lg:gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {item[activeTab]?.map((name) => {
          return <ItemBox name={name} />;
        })}
      </div>
    </div>
  );
}

export default VerticalTab;
