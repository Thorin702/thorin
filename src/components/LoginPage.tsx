import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 模拟登录过程
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 北京经开区标志性建筑轮廓 */}
        <div className="absolute bottom-0 left-0 w-full h-96 opacity-10">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            {/* 现代化办公楼群轮廓 */}
            <rect x="100" y="200" width="80" height="150" fill="#3B82F6" opacity="0.3" />
            <rect x="200" y="150" width="100" height="200" fill="#8B5CF6" opacity="0.3" />
            <rect x="320" y="180" width="90" height="170" fill="#06B6D4" opacity="0.3" />
            <rect x="430" y="160" width="110" height="190" fill="#10B981" opacity="0.3" />
            <rect x="560" y="190" width="85" height="160" fill="#F59E0B" opacity="0.3" />
            <rect x="660" y="170" width="95" height="180" fill="#EF4444" opacity="0.3" />
            <rect x="780" y="210" width="70" height="140" fill="#EC4899" opacity="0.3" />
            <rect x="880" y="180" width="90" height="170" fill="#6366F1" opacity="0.3" />
            
            {/* 科技园区元素 */}
            <circle cx="300" cy="100" r="15" fill="#60A5FA" opacity="0.4" />
            <circle cx="500" cy="80" r="12" fill="#A78BFA" opacity="0.4" />
            <circle cx="700" cy="90" r="18" fill="#34D399" opacity="0.4" />
            <circle cx="900" cy="85" r="14" fill="#FBBF24" opacity="0.4" />
          </svg>
        </div>
        
        {/* 浮动粒子效果 */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/20 blur-sm"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* 登录卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
          {/* 头部 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-building text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">北京经开区</h1>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              "亦企办"接诉即办平台
            </h2>
            <p className="text-gray-400 text-sm mt-2">智能化 • 数字化 • 精准化</p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                用户名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="请输入用户名"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="请输入密码"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">记住我</span>
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                忘记密码？
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  登录中...
                </div>
              ) : (
                '登录系统'
              )}
            </motion.button>
          </form>

          {/* 底部信息 */}
          <div className="mt-8 pt-6 border-t border-gray-700/30 text-center">
            <p className="text-xs text-gray-500 mb-1">
              营商环境建设局
            </p>
            <p className="text-xs text-gray-500">
              接诉即办运行处
            </p>
          </div>
        </div>

        {/* 装饰性元素 */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full blur-sm"></div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500/20 rounded-full blur-sm"></div>
      </motion.div>

      {/* 侧边信息面板 */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2 w-80"
      >
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">平台特色</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-robot text-blue-400 text-sm"></i>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">AI智能分析</h4>
                <p className="text-xs text-gray-400">基于深度学习的智能数据分析与洞察</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-chart-line text-green-400 text-sm"></i>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">实时监控</h4>
                <p className="text-xs text-gray-400">7x24小时实时数据监控与预警</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-users text-purple-400 text-sm"></i>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">协同办公</h4>
                <p className="text-xs text-gray-400">跨部门协同处理，提升工作效率</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-shield-alt text-orange-400 text-sm"></i>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">安全可靠</h4>
                <p className="text-xs text-gray-400">企业级安全保障，数据安全可控</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700/30">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <i className="fa-solid fa-location-dot"></i>
              <span>北京经济技术开发区</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
