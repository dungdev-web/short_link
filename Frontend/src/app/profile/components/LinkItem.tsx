import {
  FaLink,
  FaCopy,
  FaExternalLinkAlt,
  FaEye,
  FaCalendarAlt,
} from "react-icons/fa";
import { ILinkWithEmail } from "@/types/ILinkWithEmail";
import { Campaign } from "@/types/Campaign";
import { MdCampaign, MdClose,  } from "react-icons/md";

interface LinkItemProps {
 link: ILinkWithEmail & { campaigns?: Campaign[] };
  onCopy: (shortUrl: string) => void;
  onAttach: () => void;
  onDetach: (campaignId: number) => void;
}

const LinkItem = ({ link, onCopy, onAttach, onDetach }: LinkItemProps) => {
  // campaigns are part of link.campaigns
  console.log("LinkItem campaigns: ", link.campaigns);

  const { campaigns } = link;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="border-2 border-blue-500 text-blue-500 p-3 rounded-full">
          <FaLink />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">
            {link.email || "Không có email"}
          </p>
          <p className="mt-1 font-semibold text-blue-700 truncate">
            {link.short_url}
          </p>
          <a
            href={link.original_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-sm hover:underline break-all"
          >
            {link.original_url}
          </a>
          <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-4">
            <span className="flex items-center gap-1">
              <FaEye className="text-blue-500" />
              {link.click_count} lượt
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-blue-500" />
              {new Date(link.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>

           {/* Hiển thị danh sách chiến dịch đã gắn */}
      <div className="mt-4 text-sm text-gray-700 w-full">
        <strong className="block mb-1">Chiến dịch:</strong>
        {campaigns && campaigns.length > 0 ? (
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
            {campaigns.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                <MdCampaign className="text-blue-500 w-4 h-4" />
                {c.name}
                {/* Nút × để tháo */}
                <button
                  type="button"
                  onClick={() => onDetach(c.id)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <MdClose className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="ml-2 text-gray-400 italic">Chưa có chiến dịch nào</span>
        )}
      </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onCopy(link.short_url)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm inline-flex items-center gap-2"
        >
          <FaCopy />
          Sao chép
        </button>
        <a
          href={link.short_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm inline-flex items-center gap-2"
        >
          <FaExternalLinkAlt />
          Truy cập
        </a>
        <button
          onClick={onAttach}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm inline-flex items-center gap-2"
        >
          Gắn vào chiến dịch
        </button>
      </div>
    </div>
  );
};

export default LinkItem;
