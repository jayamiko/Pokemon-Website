import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TAB, tabList } from "../../utils/constants";

function VerticalTab({ item }) {
  const [activeTab, setActiveTab] = useState(tabList[0]);

  return (
    <div className="md:flex">
      <ul className="flex items-center md:flex-column md:space-y-2 text-sm font-medium text-gray-500 md:me-4">
        {tabList.map((tab, i) => {
          return (
            <li key={i} onClick={() => setActiveTab(tab)}>
              <Link
                href={`#${tab}`}
                className={`inline-flex capitalize shadow-sm font-bold items-center px-8 py-3 rounded-sm md:rounded-lg w-full ${
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
      {(activeTab === TAB.Moves || activeTab === TAB.Abilities) && (
        <div
          style={{
            display:
              activeTab === TAB.Moves || activeTab === TAB.Abilities
                ? "grid"
                : "hidden",
          }}
          className="p-6 bg-gray-50 rounded-sm md:rounded-lg w-full gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          {item[activeTab].map((name) => {
            return (
              <div className="bg-slate-500 rounded-xl w-52 h-40 text-black text-2xl font-bold flex items-center justify-center">
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VerticalTab;
