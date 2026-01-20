import React from "react";

const LearningOptions = (props) => {
  const options = [
    { text: "Danh sách các đơn vị bầu cử tại Phường Tam?", handler: () => props.actionProvider.handleUserQuery("Danh sách các đơn vị bầu cử tại Phường Tam?") },
    { text: "Các mốc thời gian quan trọng?", handler: () => props.actionProvider.handleUserQuery("Các mốc thời gian quan trọng?") },
    { text: "Bầu cử là gì?", handler: () => props.actionProvider.handleUserQuery("Bầu cử là gì?") },
    { text: "Quốc hội có những chức năng, nhiệm vụ, quyền hạn gì?", handler: () => props.actionProvider.handleUserQuery("Quốc hội có những chức năng, nhiệm vụ, quyền hạn gì?") },
  ];

  return (
    <div className="learning-options-container grid grid-cols-1 gap-2 p-2">
      {options.map((option, index) => (
        <button
          key={index}
          className="learning-option-button bg-gray-200 text-gray-800 dark:bg-darkHover/60 dark:text-white px-3 py-2 rounded-md border border-transparent hover:border-[#b820e6] hover:text-[#b820e6] transition-all duration-200 text-sm text-left"
          onClick={option.handler}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default LearningOptions;