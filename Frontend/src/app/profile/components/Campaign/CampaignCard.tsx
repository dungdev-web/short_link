import { FaCalendarAlt, FaMoneyBillWave, FaThumbtack, FaEdit, FaTrash } from "react-icons/fa";
import { Campaign } from "@/types/Campaign";

interface Props {
  campaign: Campaign;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CampaignCard({ campaign, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded p-5 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-blue-700">{campaign.name}</h3>
        <p className="text-sm text-gray-600">{campaign.description}</p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Từ {campaign.start_date} đến {campaign.end_date}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-600" />
          Ngân sách: {campaign.budget?.toLocaleString()}₫
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FaThumbtack className="text-red-500" />
          Trạng thái: {campaign.status}
        </p>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800"><FaTrash /></button>
      </div>
    </div>
  );
}
