import Link from 'next/link';
import React from 'react';

const ToolsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">工具箱</h1>
      <ul>
        <li>
          <Link href="/tools/watermark" className="text-blue-500 hover:underline">
            水印生成器
          </Link>
        </li>
        {/* 可以添加其他工具链接 */}
      </ul>
    </div>
  );
};

export default ToolsPage;
