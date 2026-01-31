export default function ChangePassWord() {
    return (
        <main className="flex-1 px-6 py-8">
            <div className="text-sm text-gray-500 mb-5 space-x-1">
                <a href="#" className="text-gray-700 hover:underline">Trang chủ</a>
                <span>{'>'}</span>
                <a href="#" className="text-gray-700 hover:underline">Tài khoản</a>
                <span>{'>'}</span>
                <span className="text-gray-900 font-medium">Đổi mật khẩu</span>
            </div>

            <h1 className="text-2xl font-bold mb-6">Đổi mật khẩu</h1>

            <form className="max-w-md">
                <div className="mb-5">
                    <label htmlFor="current-password" className="block font-semibold mb-2">Mật khẩu hiện tại</label>
                    <input
                        type="password"
                        id="current-password"
                        name="current-password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="new-password" className="block font-semibold mb-2">Mật khẩu mới</label>
                    <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirm-password" className="block font-semibold mb-2">Nhập lại mật khẩu mới</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </main>
    );
}
