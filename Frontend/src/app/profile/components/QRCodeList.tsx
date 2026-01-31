import { QRCodeCanvas } from "qrcode.react";
import { ILinkWithEmail } from "@/types/ILinkWithEmail";

interface QRCodeListProps {
  links: ILinkWithEmail[];
  handleCopy: (shortUrl: string) => void;
  loading: boolean;
  error: string;
  isMobile: boolean;
}

export const QRCodeList = ({ links, handleCopy, loading, error, isMobile }: QRCodeListProps) => {
  return (
    <div>
      {loading && (
        <div className="text-center py-4">Đang tải...</div>
      )}
      {error && !loading && (
        <div className="text-center py-4 text-red-600">{error}</div>
      )}
      {!loading && !error && links.length === 0 && (
        <div className="text-center py-4">Không có liên kết nào.</div>
      )}
      {!loading && !error && links.length > 0 && (
        <>
          {isMobile ? (
            // Mobile view: Display QR Codes as Cards
            <div className="md:hidden space-y-4">
              {links.map(link => (
                <div key={link.short_code} className="bg-white rounded-lg shadow p-4 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <QRCodeCanvas value={link.short_url} size={80} />
                    <div className="flex-1">
                      <h2 className="font-semibold truncate">{link.email}</h2>
                      <p className="text-gray-600 truncate">{link.short_url}</p>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <i className="fas fa-calendar-alt"></i> {new Date(link.created_at).toLocaleDateString("vi-VN")}
                      </p>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <i className="fas fa-eye"></i> {link.click_count} lượt truy cập
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(link.short_url)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-download"></i> Tải mã QR
                  </button>
                </div>
              ))}
            </div>
          ) : (
            // Desktop view: Display QR Codes in Table
            <div className="overflow-x-auto hidden md:block">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm text-gray-700">
                    <th className="px-4 py-3">Original URL</th>
                    <th className="px-4 py-3">Short URL</th>
                    <th className="px-4 py-3 text-center">Clicks</th>
                    <th className="px-4 py-3 text-center">Ngày tạo</th>
                    <th className="px-4 py-3 text-center">QR Code</th>
                    <th className="px-4 py-3 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map(link => (
                    <tr key={link.short_code} className="border-b text-sm">
                      <td className="px-4 py-3 break-all">
                        <a href={link.original_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {link.original_url}
                        </a>
                      </td>
                      <td className="px-4 py-3 break-all">
                        <a href={link.short_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {link.short_url}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-center">{link.click_count}</td>
                      <td className="px-4 py-3 text-center">{new Date(link.created_at).toLocaleDateString("vi-VN")}</td>
                      <td className="px-4 py-3 text-center">
                        <QRCodeCanvas value={link.short_url} size={80} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleCopy(link.short_url)}
                          className="inline-flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          <i className="fas fa-copy mr-1"></i>Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
