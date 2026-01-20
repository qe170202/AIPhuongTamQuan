import React from "react";

const SuggestionOptions = (props) => {
  const { suggestions, actionProvider } = props;

  return (
    <div className="suggestion-options-container grid grid-cols-1 gap-2 p-2 mt-2 border-t border-gray-200 dark:border-darkHover/40 pt-2">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Có thể bạn quan tâm:</p>
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="suggestion-option-button bg-gray-100 text-gray-800 dark:bg-darkHover/50 dark:text-white px-3 py-2 rounded-md border border-transparent hover:border-[#da7d20] hover:text-[#da7d20] transition-all duration-200 text-sm text-left"
          onClick={() => actionProvider.handleUserQuery(suggestion.item.question)}
        >
          {suggestion.item.question}
        </button>
      ))}
    </div>
  );
};

export default SuggestionOptions;