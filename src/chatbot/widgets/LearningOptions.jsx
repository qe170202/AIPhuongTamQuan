import React from "react";

const LearningOptions = (props) => {
  const options = [
    { text: "Danh sách các đơn vị bầu cử tại Phường Tam Quan?", handler: () => props.actionProvider.handleUserQuery("Danh sách các đơn vị bầu cử tại Phường Tam?") },
    { text: "Danh sách, số lượng đơn vị bầu cử đại biểu Quốc Hội tại Tỉnh Gia Lai?", handler: () => props.actionProvider.handleUserQuery("Danh sách, số lượng đơn vị bầu cử đại biểu Quốc Hội tại Tỉnh Gia Lai?") },
    { text: "Các mốc thời gian quan trọng?", handler: () => props.actionProvider.handleUserQuery("Các mốc thời gian quan trọng?") },
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