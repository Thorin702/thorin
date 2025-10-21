import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface UnifiedAIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

const UnifiedAIAnalysisModal = ({ isOpen, onClose, title, data }: UnifiedAIAnalysisModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');

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
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-4xl max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <i className="fa-solid fa-robot text-blue-400 mr-3"></i>
                  AI智能分析 - {title}
                </h2>
                <p className="text-gray-400">基于深度学习的智能数据分析与洞察</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700/50">
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fa-solid fa-chart-line mr-2"></i>数据概览
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === 'insights' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('insights')}
              >
                <i className="fa-solid fa-lightbulb mr-2"></i>AI洞察
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === 'prediction' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('prediction')}
              >
                <i className="fa-solid fa-crystal-ball mr-2"></i>趋势预测
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === 'recommendations' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('recommendations')}
              >
                <i className="fa-solid fa-bullseye mr-2"></i>优化建议
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(95vh-140px)] overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">核心数据概览</h3>
                  
                  {/* 关键指标卡片 */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {data.keyMetrics?.map((metric: any, index: number) => (
                      <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                        <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                        <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                        <p className={`text-xs ${metric.trend?.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.trend}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 数据图表 */}
                  {data.chartData && (
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 h-80">
                      <h4 className="text-lg font-semibold text-white mb-4">数据趋势分析</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                          {data.chartLines?.map((line: any, index: number) => (
                            <Line 
                              key={index}
                              type="monotone" 
                              dataKey={line.dataKey} 
                              stroke={line.color} 
                              strokeWidth={2} 
                              dot={{ r: 4 }}
                              name={line.name}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'insights' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">AI智能洞察</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 异常检测 */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <i className="fa-solid fa-triangle-exclamation text-red-400 mr-2"></i>
                        异常检测
                      </h4>
                      <div className="space-y-3">
                        {data.anomalies?.map((anomaly: any, index: number) => (
                          <div key={index} className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                            <p className="text-sm text-red-400 font-medium">{anomaly.type}</p>
                            <p className="text-xs text-gray-300 mt-1">{anomaly.description}</p>
                            <p className="text-xs text-gray-500 mt-1">检测时间: {anomaly.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 模式识别 */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <i className="fa-solid fa-brain text-blue-400 mr-2"></i>
                        模式识别
                      </h4>
                      <div className="space-y-3">
                        {data.patterns?.map((pattern: any, index: number) => (
                          <div key={index} className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                            <p className="text-sm text-blue-400 font-medium">{pattern.name}</p>
                            <p className="text-xs text-gray-300 mt-1">{pattern.description}</p>
                            <p className="text-xs text-blue-400 mt-1">置信度: {pattern.confidence}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 关联分析 */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-project-diagram text-purple-400 mr-2"></i>
                      关联分析
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.correlations?.map((correlation: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                          <span className="text-sm text-gray-300">{correlation.factor1}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">相关系数</span>
                            <span className="text-sm font-bold text-purple-400">{correlation.coefficient}</span>
                          </div>
                          <span className="text-sm text-gray-300">{correlation.factor2}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'prediction' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">趋势预测分析</h3>
                  
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.predictionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="period" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="actual" stroke="#06B6D4" strokeWidth={2} name="实际值" />
                        <Line type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" name="预测值" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {data.predictions?.map((prediction: any, index: number) => (
                      <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                        <h4 className="text-sm font-semibold text-white mb-2">{prediction.title}</h4>
                        <p className="text-2xl font-bold text-white mb-1">{prediction.value}</p>
                        <p className="text-xs text-gray-400">{prediction.timeframe}</p>
                        <p className="text-xs text-green-400 mt-1">准确率: {prediction.accuracy}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'recommendations' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">AI优化建议</h3>
                  
                  <div className="space-y-4">
                    {data.recommendations?.map((recommendation: any, index: number) => (
                      <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                        <div className="flex items-start space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            recommendation.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            recommendation.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            <i className={`fa-solid ${
                              recommendation.priority === 'high' ? 'fa-exclamation' :
                              recommendation.priority === 'medium' ? 'fa-info' :
                              'fa-check'
                            } text-sm`}></i>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-lg font-semibold text-white mb-2">{recommendation.title}</h4>
                            <p className="text-gray-300 mb-3">{recommendation.description}</p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                recommendation.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                recommendation.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {recommendation.priority === 'high' ? '高优先级' :
                                 recommendation.priority === 'medium' ? '中优先级' : '低优先级'}
                              </span>
                              <span className="text-xs text-gray-500">预计效果: {recommendation.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnifiedAIAnalysisModal;
