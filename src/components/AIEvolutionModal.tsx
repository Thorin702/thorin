import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIEvolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeedbackItem {
  id: string;
  type: 'positive' | 'negative' | 'suggestion';
  content: string;
  timestamp: Date;
  status: 'pending' | 'processed' | 'implemented';
}

export default function AIEvolutionModal({ isOpen, onClose }: AIEvolutionModalProps) {
  const [activeTab, setActiveTab] = useState('feedback');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'suggestion'>('suggestion');
  const [evolutionProgress, setEvolutionProgress] = useState(78.5);

  // 模拟反馈数据
  const [feedbacks] = useState<FeedbackItem[]>([
    {
      id: '1',
      type: 'positive',
      content: 'AI分析准确度很高，帮助我快速理解了政策要点',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'implemented'
    },
    {
      id: '2',
      type: 'suggestion',
      content: '建议增加更多行业特定的分析模板',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'processed'
    },
    {
      id: '3',
      type: 'negative',
      content: '某些复杂场景下的响应速度需要优化',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'implemented'
    },
    {
      id: '4',
      type: 'positive',
      content: '文件上传功能很实用，分析结果详细准确',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'implemented'
    }
  ]);

  // 模拟AI进化数据
  const evolutionData = {
    totalFeedbacks: 1247,
    positiveRate: 89.3,
    implementedSuggestions: 156,
    pendingOptimizations: 23,
    accuracyImprovement: 15.7,
    responseTimeReduction: 28.3,
    userSatisfaction: 94.2,
    recentUpdates: [
      '优化了政策解读算法，准确率提升12%',
      '新增了5个行业分析模板',
      '改进了文件处理速度，提升35%',
      '增强了异常检测能力',
      '优化了用户界面交互体验'
    ]
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) return;
    
    // 模拟提交反馈
    console.log('提交反馈:', { type: feedbackType, content: feedbackText });
    setFeedbackText('');
    
    // 模拟AI进化进度更新
    setEvolutionProgress(prev => Math.min(prev + 0.5, 100));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'text-green-400';
      case 'processed': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return 'fas fa-check-circle';
      case 'processed': return 'fas fa-clock';
      case 'pending': return 'fas fa-hourglass-half';
      default: return 'fas fa-circle';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'negative': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'suggestion': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const tabs = [
    { id: 'feedback', name: '用户反馈', icon: 'fa-comments' },
    { id: 'evolution', name: 'AI进化', icon: 'fa-brain' },
    { id: 'analytics', name: '进化分析', icon: 'fa-chart-line' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-6xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-dna text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">AI进化引擎</h2>
                    <p className="text-purple-100 text-sm">用户反馈驱动 · 智能自我优化 · 持续进化</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* 标签页 */}
            <div className="border-b border-gray-700/50">
              <div className="flex space-x-1 p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    <i className={`fas ${tab.icon}`}></i>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 内容区域 */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {activeTab === 'feedback' && (
                <div className="space-y-6">
                  {/* 提交反馈 */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">提交反馈</h3>
                    <div className="space-y-4">
                      <div className="flex space-x-3">
                        {[
                          { type: 'positive', label: '正面反馈', icon: 'fa-thumbs-up' },
                          { type: 'negative', label: '问题反馈', icon: 'fa-exclamation-triangle' },
                          { type: 'suggestion', label: '建议改进', icon: 'fa-lightbulb' }
                        ].map((item) => (
                          <button
                            key={item.type}
                            onClick={() => setFeedbackType(item.type as any)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                              feedbackType === item.type
                                ? getTypeColor(item.type)
                                : 'border-gray-600 text-gray-400 hover:border-gray-500'
                            }`}
                          >
                            <i className={`fas ${item.icon}`}></i>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="请详细描述您的反馈或建议..."
                        className="w-full h-32 bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                      />
                      <button
                        onClick={handleSubmitFeedback}
                        disabled={!feedbackText.trim()}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="fas fa-paper-plane mr-2"></i>
                        提交反馈
                      </button>
                    </div>
                  </div>

                  {/* 反馈历史 */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">反馈历史</h3>
                    <div className="space-y-4">
                      {feedbacks.map((feedback) => (
                        <div key={feedback.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className={`px-2 py-1 rounded text-xs ${getTypeColor(feedback.type)}`}>
                                  {feedback.type === 'positive' ? '正面反馈' : 
                                   feedback.type === 'negative' ? '问题反馈' : '建议改进'}
                                </span>
                                <span className={`text-xs flex items-center space-x-1 ${getStatusColor(feedback.status)}`}>
                                  <i className={`fas ${getStatusIcon(feedback.status)}`}></i>
                                  <span>
                                    {feedback.status === 'implemented' ? '已实施' :
                                     feedback.status === 'processed' ? '处理中' : '待处理'}
                                  </span>
                                </span>
                              </div>
                              <p className="text-gray-200 text-sm">{feedback.content}</p>
                              <p className="text-gray-400 text-xs mt-2">
                                {feedback.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'evolution' && (
                <div className="space-y-6">
                  {/* AI进化进度 */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">AI进化进度</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">整体进化度</span>
                        <span className="text-purple-400 font-semibold">{evolutionProgress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${evolutionProgress}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{evolutionData.totalFeedbacks}</div>
                          <div className="text-gray-400 text-sm">总反馈数</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{evolutionData.positiveRate}%</div>
                          <div className="text-gray-400 text-sm">正面反馈率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{evolutionData.implementedSuggestions}</div>
                          <div className="text-gray-400 text-sm">已实施建议</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{evolutionData.pendingOptimizations}</div>
                          <div className="text-gray-400 text-sm">待优化项目</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 最近更新 */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">最近更新</h3>
                    <div className="space-y-3">
                      {evolutionData.recentUpdates.map((update, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                          <p className="text-gray-300 text-sm">{update}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  {/* 进化分析 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-4">性能提升</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">准确率提升</span>
                          <span className="text-green-400 font-semibold">+{evolutionData.accuracyImprovement}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">响应时间减少</span>
                          <span className="text-blue-400 font-semibold">-{evolutionData.responseTimeReduction}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">用户满意度</span>
                          <span className="text-purple-400 font-semibold">{evolutionData.userSatisfaction}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-4">进化趋势</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">学习能力</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i key={star} className="fas fa-star text-yellow-400"></i>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">适应能力</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i key={star} className="fas fa-star text-yellow-400"></i>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">创新能力</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4].map((star) => (
                              <i key={star} className="fas fa-star text-yellow-400"></i>
                            ))}
                            <i className="fas fa-star text-gray-600"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 