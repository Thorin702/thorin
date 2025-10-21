import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisType: string;
  data?: any;
}

export default function AIAnalysisModal({ isOpen, onClose, analysisType }: AIAnalysisModalProps) {
  const [analysisText, setAnalysisText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  // 模拟AI分析数据
  const analysisData = {
    'complaint-trend': {
      title: '诉求趋势AI分析',
      icon: 'fa-chart-line',
      color: 'blue',
      insights: [
        '检测到政策咨询类诉求呈上升趋势，建议加强政策宣传',
        '行政审批类诉求处理效率提升15%，表现良好',
        '资金申请类诉求增长较快，可能与新政策发布有关',
        'AI预测下月诉求量将增长8-12%'
      ],
      recommendations: [
        '优化政策咨询流程，增加智能问答功能',
        '加强部门协同，提升行政审批效率',
        '建立资金申请快速通道',
        '增加人员配置应对预期增长'
      ],
      riskLevel: '低风险',
      confidence: 92.5
    },
    'efficiency-analysis': {
      title: '效率分析AI洞察',
      icon: 'fa-tachometer-alt',
      color: 'green',
      insights: [
        '平均处理时长从3.2小时降至2.3小时，提升28%',
        '部门协同效率显著提升，响应时间缩短40%',
        'AI检测到流程瓶颈，主要在审批环节',
        '预测下月效率可再提升12%'
      ],
      recommendations: [
        '优化审批流程，减少重复环节',
        '加强部门间信息共享',
        '引入自动化审批工具',
        '建立效率监控机制'
      ],
      riskLevel: '中风险',
      confidence: 88.7
    },
    'satisfaction-trend': {
      title: '满意度AI分析',
      icon: 'fa-smile',
      color: 'yellow',
      insights: [
        '整体满意度达到95.3%，较上月提升2.1%',
        '证照办理满意度最高，达到97.8%',
        '行政审批环节满意度有待提升',
        'AI预测满意度将继续稳步提升'
      ],
      recommendations: [
        '重点优化行政审批流程',
        '加强服务人员培训',
        '建立满意度实时监控',
        '定期收集用户反馈'
      ],
      riskLevel: '低风险',
      confidence: 94.2
    },
    'risk-assessment': {
      title: '风险评估AI分析',
      icon: 'fa-shield-alt',
      color: 'red',
      insights: [
        '当前系统风险等级：低风险',
        '检测到3个潜在风险点',
        '资金申请类诉求集中度异常',
        'AI建议加强风险监控'
      ],
      recommendations: [
        '建立风险预警机制',
        '加强异常模式检测',
        '优化资源配置策略',
        '定期进行风险评估'
      ],
      riskLevel: '低风险',
      confidence: 89.1
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnalyzing(true);
      setAnalysisText('AI正在分析数据...');
      
      // 模拟AI分析过程
      const analysisSteps = [
        '正在收集历史数据...',
        '进行模式识别分析...',
        '计算趋势预测模型...',
        '生成智能建议...',
        '完成风险评估...'
      ];

      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < analysisSteps.length) {
          setAnalysisText(analysisSteps[stepIndex]);
          stepIndex++;
        } else {
          setIsAnalyzing(false);
          setAnalysisResults(analysisData[analysisType as keyof typeof analysisData] || analysisData['complaint-trend']);
          clearInterval(interval);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isOpen, analysisType]);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'yellow': return 'from-yellow-500 to-yellow-600';
      case 'red': return 'from-red-500 to-red-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case '低风险': return 'text-green-400';
      case '中风险': return 'text-yellow-400';
      case '高风险': return 'text-red-400';
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-5xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className={`bg-gradient-to-r ${getColorClass(analysisResults?.color || 'blue')} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className={`fas ${analysisResults?.icon || 'fa-brain'} text-2xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{analysisResults?.title || 'AI智能分析'}</h2>
                    <p className="text-blue-100 text-sm">实时数据分析 · 智能洞察 · 预测建议</p>
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

            {/* 内容区域 */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-300 text-lg">{analysisText}</p>
                  <div className="mt-4 flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 分析概览 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <i className="fas fa-shield-alt text-blue-400"></i>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">风险等级</p>
                          <p className={`text-lg font-semibold ${getRiskColor(analysisResults?.riskLevel || '低风险')}`}>
                            {analysisResults?.riskLevel || '低风险'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <i className="fas fa-chart-line text-green-400"></i>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">置信度</p>
                          <p className="text-lg font-semibold text-green-400">
                            {analysisResults?.confidence || 0}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <i className="fas fa-clock text-purple-400"></i>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">分析时间</p>
                          <p className="text-lg font-semibold text-purple-400">
                            {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI洞察 */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fas fa-lightbulb text-yellow-400 mr-2"></i>
                      AI智能洞察
                    </h3>
                    <div className="space-y-3">
                      {analysisResults?.insights?.map((insight: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 text-sm leading-relaxed">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 智能建议 */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fas fa-robot text-purple-400 mr-2"></i>
                      智能建议
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResults?.recommendations?.map((recommendation: string, index: number) => (
                        <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-purple-400 text-xs font-bold">{index + 1}</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 趋势图表 */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fas fa-chart-area text-green-400 mr-2"></i>
                      趋势分析
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { month: '1月', value: 65 },
                          { month: '2月', value: 72 },
                          { month: '3月', value: 68 },
                          { month: '4月', value: 85 },
                          { month: '5月', value: 78 },
                          { month: '6月', value: 92 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="month" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3B82F6" 
                            strokeWidth={3}
                            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
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