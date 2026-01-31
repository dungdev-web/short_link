"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface AccordionItemProps {
  title: string;
  content: string;
  moreContent: string; // nội dung cho popup
}

export default function AccordionItem({ title, content, moreContent }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-medium text-gray-800 bg-gray-50 hover:bg-gray-100 focus:outline-none"
      >
        <span>{title}</span>
        {isOpen ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 py-3 text-sm text-gray-700 border-t bg-white">
          {content}{" "}
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Tìm hiểu thêm
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Thông tin chi tiết</h3>
            <p className="text-gray-700">{moreContent}</p>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
