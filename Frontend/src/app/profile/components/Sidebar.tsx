"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBullhorn,
  faQrcode,
  faLink,
  faAddressCard,
  faChartLine,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed top-20 left-0 z-50 w-64 h-screen bg-white p-4 hidden md:block overflow-y-auto border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Quản lý sản phẩm</h2>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2">
          <Link href={"/profile/control"}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Bảng điều khiển
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Link href="/profile/my-qr-code">
            <FontAwesomeIcon icon={faQrcode} /> Quản lý mã QR
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Link href="/profile/my-shortlink">
            {" "}
            <FontAwesomeIcon icon={faLink} /> Quản lý rút gọn link
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Link href="/profile/campaigns">
            <FontAwesomeIcon icon={faBullhorn} /> Quản lý chiến dịch
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Link href="/profile/posts">
            <FontAwesomeIcon icon={faPenToSquare} /> Quản lý bài viết
          </Link>
        </li>
         <li className="flex items-center gap-2">
          <Link href="/profile/analytics" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
            Analytics
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Link href="/profile">
            <FontAwesomeIcon icon={faAddressCard} className="w-4 h-4" /> Hồ sơ
          </Link>
        </li>
       
        <li className="flex items-center gap-2"></li>
      </ul>
    </aside>
  );
}
