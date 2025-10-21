import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

interface EnhancedAIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  gold: '#F59E0B',
  cyan: '#06B6D4',
  pink: '#EC4899'
};

// 模拟数据
const aiAnalysisData = {
  realTimeAnalysis: {
    currentTrends: [
      { metric: '政策咨询诉求', value: 234, trend: '+12.3%', status: '上升', color: '#3B82F6' },
      { metric: '证照办理诉求', value: 189, trend: '+8.7%', status: '上升', color: '#10B981' },
      { metric: '投诉处理诉求', value: 156, trend: '-5.2%', status: '下降', color: '#F59E0B' },
      { metric: '资金申请诉求', value: 98, trend: '+15.8%', status: '上升', color: '#8B5CF6' }
    ],
    predictions: [
      { period: '1月', predicted: 1200, actual: 1180, confidence: 94.2 },
      { period: '2月', predicted: 1350, actual: 1320, confidence: 95.8 },
      { period: '3月', predicted: 1500, actual: 1480, confidence: 96.1 },
      { period: '4月', predicted: 1650, actual: 1620, confidence: 95.5 },
      { period: '5月', predicted: 1800, actual: 1780, confidence: 96.3 },
      { period: '6月', predicted: 1950, actual: 1920, confidence: 97.1 }
    ],
    efficiencyMetrics: [
      { name: '响应速度', value: 2.3, unit: '小时', improvement: '+18.5%', color: '#10B981' },
      { name: '处理准确率', value: 96.8, unit: '%', improvement: '+3.2%', color: '#3B82F6' },
      { name: '满意度', value: 94.5, unit: '%', improvement: '+5.7%', color: '#8B5CF6' },
      { name: '重复诉求率', value: 8.2, unit: '%', improvement: '-12.3%', color: '#F59E0B' }
    ]
  },
  intelligentRecommendations: [
    {
      id: 1,
      category: '政策优化',
      title: '政策解读智能化',
      description: '基于历史数据，建议增加政策解读的AI智能问答功能',
      impact: '高',
      effort: '中',
      priority: 'urgent',
      metrics: {
        expectedImprovement: '25%',
        affectedUsers: '1200+',
        implementationTime: '4-6周'
      }
    },
    {
      id: 2,
      category: '流程优化',
      title: '证照办理流程简化',
      description: '通过AI分析发现证照办理环节存在重复提交问题',
      impact: '中',
      effort: '低',
      priority: 'high',
      metrics: {
        expectedImprovement: '18%',
        affectedUsers: '800+',
        implementationTime: '2-3周'
      }
    },
    {
      id: 3,
      category: '服务提升',
      title: '投诉分类自动化',
      description: '利用AI自动分类投诉类型，提高处理效率',
      impact: '高',
      effort: '高',
      priority: 'medium',
      metrics: {
        expectedImprovement: '35%',
        affectedUsers: '2000+',
        implementationTime: '8-10周'
      }
    }
  ],
  conversationHistory: [
    { id: 1, type: 'user', content: '请分析一下最近的诉求趋势', timestamp: '2024-01-15 14:30' },
    { id: 2, type: 'ai', content: '根据数据分析，政策咨询诉求增长12.3%，建议加强政策解读服务。', timestamp: '2024-01-15 14:31' },
    { id: 3, type: 'user', content: '有什么优化建议吗？', timestamp: '2024-01-15 14:35' },
    { id: 4, type: 'ai', content: '建议实施政策解读智能化，预计可提升25%的处理效率。', timestamp: '2024-01-15 14:36' }
  ]
};

export default function EnhancedAIAssistantModal({ isOpen, onClose }: EnhancedAIAssistantModalProps) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversationHistory, setConversationHistory] = useState(aiAnalysisData.conversationHistory);

  const tabs = [
    { id: 'analysis', name: '实时分析', icon: 'fa-chart-line' },
    { id: 'predictions', name: '智能预测', icon: 'fa-crystal-ball' },
    { id: 'recommendations', name: '优化建议', icon: 'fa-lightbulb' },
    { id: 'chat', name: 'AI对话', icon: 'fa-comments' }
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newUserMessage = {
      id: conversationHistory.length + 1,
      type: 'user' as const,
      content: currentMessage,
      timestamp: new Date().toLocaleString()
    };
    
    const newAIMessage = {
      id: conversationHistory.length + 2,
      type: 'ai' as const,
      content: '感谢您的提问！基于当前数据分析，我建议关注政策咨询诉求的增长趋势，并考虑实施智能化处理方案。',
      timestamp: new Date().toLocaleString()
    };
    
    setConversationHistory([...conversationHistory, newUserMessage, newAIMessage]);
    setCurrentMessage('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case '高': return 'text-red-400';
      case '中': return 'text-yellow-400';
      case '低': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-6xl max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                    <i className="fa-solid fa-robot text-purple-400 mr-3"></i>
                    AI数据分析助手
                  </h2>
                  <p className="text-gray-400">智能分析、预测与优化建议</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
              
              {/* 标签页 */}
              <div className="flex space-x-1 mt-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <i className={`fa-solid ${tab.icon} mr-2`}></i>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 内容区域 */}
            <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
              {activeTab === 'analysis' && (
                <div className="space-y-6">
                  {/* 实时趋势分析 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-chart-line text-blue-400 mr-2"></i>
                      实时趋势分析
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {aiAnalysisData.realTimeAnalysis.currentTrends.map((trend, index) => (
                        <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-400">{trend.metric}</div>
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: trend.color }}
                            ></div>
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{trend.value}</div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${trend.status === '上升' ? 'text-green-400' : 'text-red-400'}`}>
                              {trend.trend}
                            </span>
                            <span className="text-xs text-gray-400">{trend.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 效率指标 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-gauge text-green-400 mr-2"></i>
                      效率指标
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {aiAnalysisData.realTimeAnalysis.efficiencyMetrics.map((metric, index) => (
                        <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                          <div className="text-sm text-gray-400 mb-2">{metric.name}</div>
                          <div className="text-2xl font-bold text-white mb-1">
                            {metric.value}{metric.unit}
                          </div>
                          <div className={`text-sm ${metric.improvement.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {metric.improvement}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'predictions' && (
                <div className="space-y-6">
                  {/* 预测准确率图表 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-crystal-ball text-purple-400 mr-2"></i>
                      预测准确率分析
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={aiAnalysisData.realTimeAnalysis.predictions}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="period" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="#8B5CF6" 
                            fill="#8B5CF6" 
                            fillOpacity={0.3}
                            name="预测值"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="actual" 
                            stroke="#06B6D4" 
                            fill="#06B6D4" 
                            fillOpacity={0.3}
                            name="实际值"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 置信度分析 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-chart-bar text-cyan-400 mr-2"></i>
                      预测置信度分析
                    </h3>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={aiAnalysisData.realTimeAnalysis.predictions}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="period" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="confidence" fill="#06B6D4" name="置信度 (%)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'recommendations' && (
                <div className="space-y-6">
                  {aiAnalysisData.intelligentRecommendations.map((recommendation, index) => (
                    <div key={index} className="data-card">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                              {recommendation.category}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(recommendation.priority)}`}>
                              {recommendation.priority === 'urgent' ? '紧急' : 
                               recommendation.priority === 'high' ? '高优先级' :
                               recommendation.priority === 'medium' ? '中优先级' : '低优先级'}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{recommendation.title}</h3>
                          <p className="text-gray-400 mb-4">{recommendation.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">预期改善</div>
                          <div className="text-lg font-bold text-green-400">{recommendation.metrics.expectedImprovement}</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">影响用户</div>
                          <div className="text-lg font-bold text-blue-400">{recommendation.metrics.affectedUsers}</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">实施周期</div>
                          <div className="text-lg font-bold text-purple-400">{recommendation.metrics.implementationTime}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-400">影响程度:</span>
                            <span className={`text-sm font-medium ${getImpactColor(recommendation.impact)}`}>
                              {recommendation.impact}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-400">实施难度:</span>
                            <span className={`text-sm font-medium ${getImpactColor(recommendation.effort)}`}>
                              {recommendation.effort}
                            </span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                          查看详情
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="space-y-4">
                  {/* 对话历史 */}
                  <div className="data-card h-96 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-comments text-blue-400 mr-2"></i>
                      AI对话记录
                    </h3>
                    <div className="space-y-4">
                      {conversationHistory.map((message) => (
                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 输入框 */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="请输入您的问题..."
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
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
