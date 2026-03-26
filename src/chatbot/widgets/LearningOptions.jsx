import React from "react";

const LearningOptions = (props) => {
  const options = [
    { text: "Phường Tam Quan có tổng cộng bao nhiêu khu vực bỏ phiếu và tổng số cử tri là bao nhiêu?", handler: () => props.actionProvider.handleUserQuery("Phường Tam Quan có tổng cộng bao nhiêu khu vực bỏ phiếu và tổng số cử tri là bao nhiêu?") },
    { text: "Thế nào là bầu cử dân chủ, đúng pháp luật?", handler: () => props.actionProvider.handleUserQuery("Thế nào là bầu cử dân chủ, đúng pháp luật?") },
    { text: "Phường Tam Quan có bao nhiêu người trúng cử đại biểu HĐND nhiệm kỳ 2026 – 2031 và danh sách cụ thể là gì?", handler: () => props.actionProvider.handleUserQuery("Phường Tam Quan có bao nhiêu người trúng cử đại biểu HĐND nhiệm kỳ 2026 – 2031 và danh sách cụ thể là gì?") },
    { text: "Phường Tam Quan có bao nhiêu người ứng cử đại biểu HĐND nhiệm kỳ 2026 – 2031 và danh sách cụ thể là gì?", handler: () => props.actionProvider.handleUserQuery("Phường Tam Quan có bao nhiêu người ứng cử đại biểu HĐND nhiệm kỳ 2026 – 2031 và danh sách cụ thể là gì?") },
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