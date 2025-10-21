import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

interface PredictionModelModalProps {
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

// 预测模型模拟数据
const predictionData = {
  demandForecast: [
    { period: '1月', actual: 1800, predicted: 1850, confidence: 94.2 },
    { period: '2月', actual: 1950, predicted: 1920, confidence: 95.8 },
    { period: '3月', actual: 2100, predicted: 2050, confidence: 96.1 },
    { period: '4月', actual: 2200, predicted: 2180, confidence: 95.5 },
    { period: '5月', actual: 2350, predicted: 2300, confidence: 96.3 },
    { period: '6月', actual: 2450, predicted: 2400, confidence: 97.1 },
    { period: '7月', actual: null, predicted: 2550, confidence: 96.8 },
    { period: '8月', actual: null, predicted: 2680, confidence: 96.5 },
    { period: '9月', actual: null, predicted: 2750, confidence: 96.2 }
  ],
  efficiencyPrediction: [
    { period: '1月', processingTime: 3.2, satisfaction: 89.5, accuracy: 92.3 },
    { period: '2月', processingTime: 2.9, satisfaction: 91.2, accuracy: 93.8 },
    { period: '3月', processingTime: 2.6, satisfaction: 92.8, accuracy: 94.5 },
    { period: '4月', processingTime: 2.4, satisfaction: 94.1, accuracy: 95.2 },
    { period: '5月', processingTime: 2.2, satisfaction: 95.3, accuracy: 95.8 },
    { period: '6月', processingTime: 2.1, satisfaction: 96.1, accuracy: 96.3 },
    { period: '7月', processingTime: 2.0, satisfaction: 96.8, accuracy: 96.7 },
    { period: '8月', processingTime: 1.9, satisfaction: 97.2, accuracy: 97.0 },
    { period: '9月', processingTime: 1.8, satisfaction: 97.5, accuracy: 97.3 }
  ],
  riskAnalysis: [
    { category: '政策风险', level: '低', probability: 15, impact: 30, score: 4.5 },
    { category: '技术风险', level: '中', probability: 25, impact: 40, score: 10.0 },
    { category: '运营风险', level: '低', probability: 20, impact: 35, score: 7.0 },
    { category: '市场风险', level: '高', probability: 35, impact: 60, score: 21.0 },
    { category: '合规风险', level: '低', probability: 10, impact: 50, score: 5.0 }
  ],
  scenarioAnalysis: [
    {
      scenario: '乐观情况',
      probability: 30,
      demandGrowth: '+15%',
      efficiencyImprovement: '+12%',
      satisfactionTarget: '98%',
      description: '政策环境良好，企业诉求增长稳定'
    },
    {
      scenario: '基准情况',
      probability: 50,
      demandGrowth: '+8%',
      efficiencyImprovement: '+6%',
      satisfactionTarget: '96%',
      description: '正常发展轨迹，各项指标稳步提升'
    },
    {
      scenario: '悲观情况',
      probability: 20,
      demandGrowth: '+2%',
      efficiencyImprovement: '+2%',
      satisfactionTarget: '94%',
      description: '外部环境变化，需要加强风险管控'
    }
  ],
  modelMetrics: {
    accuracy: 96.8,
    precision: 94.2,
    recall: 97.5,
    f1Score: 95.8,
    mape: 3.2,
    rmse: 45.6
  }
};

export default function PredictionModelModal({ isOpen, onClose }: PredictionModelModalProps) {
  const [activeTab, setActiveTab] = useState('forecast');
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');

  const tabs = [
    { id: 'forecast', name: '需求预测', icon: 'fa-chart-line' },
    { id: 'efficiency', name: '效率预测', icon: 'fa-gauge' },
    { id: 'risk', name: '风险评估', icon: 'fa-shield-alt' },
    { id: 'scenarios', name: '情景分析', icon: 'fa-crystal-ball' },
    { id: 'model', name: '模型性能', icon: 'fa-cogs' }
  ];

  const timeframes = [
    { id: '1month', name: '1个月', months: 1 },
    { id: '3months', name: '3个月', months: 3 },
    { id: '6months', name: '6个月', months: 6 },
    { id: '1year', name: '1年', months: 12 }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case '低': return 'text-green-400 bg-green-500/20';
      case '中': return 'text-yellow-400 bg-yellow-500/20';
      case '高': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getScenarioColor = (scenario: string) => {
    switch (scenario) {
      case '乐观情况': return 'text-green-400 bg-green-500/20';
      case '基准情况': return 'text-blue-400 bg-blue-500/20';
      case '悲观情况': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-7xl max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                    <i className="fa-solid fa-crystal-ball text-purple-400 mr-3"></i>
                    智能预测模型分析
                  </h2>
                  <p className="text-gray-400">基于AI的诉求预测、效率分析与风险评估</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
              
              {/* 时间范围选择 */}
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-sm text-gray-400">预测时间范围：</span>
                <div className="flex space-x-2">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe.id}
                      onClick={() => setSelectedTimeframe(timeframe.id)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                        selectedTimeframe === timeframe.id
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      {timeframe.name}
                    </button>
                  ))}
                </div>
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
              {activeTab === 'forecast' && (
                <div className="space-y-6">
                  {/* 需求预测图表 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-chart-line text-blue-400 mr-2"></i>
                      诉求量预测分析
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={predictionData.demandForecast}>
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
                            dataKey="actual" 
                            stroke="#06B6D4" 
                            fill="#06B6D4" 
                            fillOpacity={0.3}
                            name="实际值"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="#8B5CF6" 
                            fill="#8B5CF6" 
                            fillOpacity={0.3}
                            name="预测值"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 预测准确率 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="data-card">
                      <h4 className="text-md font-semibold text-white mb-3">预测准确率</h4>
                      <div className="space-y-3">
                        {predictionData.demandForecast.slice(0, 6).map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">{item.period}</span>
                            <span className="text-sm text-green-400">{item.confidence}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="data-card">
                      <h4 className="text-md font-semibold text-white mb-3">预测趋势</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">下月预测</span>
                          <span className="text-sm text-purple-400">2,550</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">增长趋势</span>
                          <span className="text-sm text-green-400">+8.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">置信度</span>
                          <span className="text-sm text-blue-400">96.8%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="data-card">
                      <h4 className="text-md font-semibold text-white mb-3">关键指标</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">MAPE</span>
                          <span className="text-sm text-yellow-400">3.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">RMSE</span>
                          <span className="text-sm text-red-400">45.6</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">R²</span>
                          <span className="text-sm text-green-400">0.968</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'efficiency' && (
                <div className="space-y-6">
                  {/* 效率预测图表 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-gauge text-green-400 mr-2"></i>
                      处理效率预测
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={predictionData.efficiencyPrediction}>
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
                          <Line type="monotone" dataKey="processingTime" stroke="#EF4444" strokeWidth={2} name="处理时长(小时)" />
                          <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} name="满意度(%)" />
                          <Line type="monotone" dataKey="accuracy" stroke="#3B82F6" strokeWidth={2} name="准确率(%)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 效率指标卡片 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="data-card">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">1.8h</div>
                        <div className="text-sm text-gray-400 mb-2">预测处理时长</div>
                        <div className="text-xs text-green-400">-14.3% 改善</div>
                      </div>
                    </div>
                    
                    <div className="data-card">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">97.5%</div>
                        <div className="text-sm text-gray-400 mb-2">预测满意度</div>
                        <div className="text-xs text-blue-400">+1.4% 提升</div>
                      </div>
                    </div>
                    
                    <div className="data-card">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">97.3%</div>
                        <div className="text-sm text-gray-400 mb-2">预测准确率</div>
                        <div className="text-xs text-purple-400">+1.0% 提升</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'risk' && (
                <div className="space-y-6">
                  {/* 风险评估雷达图 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-shield-alt text-red-400 mr-2"></i>
                      风险评估矩阵
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {predictionData.riskAnalysis.map((risk, index) => (
                          <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-white font-medium">{risk.category}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(risk.level)}`}>
                                {risk.level}风险
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">发生概率</span>
                                <span className="text-white">{risk.probability}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">影响程度</span>
                                <span className="text-white">{risk.impact}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">风险评分</span>
                                <span className="text-red-400 font-bold">{risk.score}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                          <h4 className="text-white font-medium mb-3">风险等级分布</h4>
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: '低风险', value: 3, color: '#10B981' },
                                    { name: '中风险', value: 1, color: '#F59E0B' },
                                    { name: '高风险', value: 1, color: '#EF4444' }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={60}
                                  dataKey="value"
                                >
                                  {predictionData.riskAnalysis.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.level === '高' ? '#EF4444' : entry.level === '中' ? '#F59E0B' : '#10B981'} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'scenarios' && (
                <div className="space-y-6">
                  {predictionData.scenarioAnalysis.map((scenario, index) => (
                    <div key={index} className="data-card">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScenarioColor(scenario.scenario)}`}>
                              {scenario.scenario}
                            </span>
                            <span className="text-sm text-gray-400">概率: {scenario.probability}%</span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{scenario.scenario}</h3>
                          <p className="text-gray-400 mb-4">{scenario.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="text-sm text-gray-400 mb-1">需求增长</div>
                          <div className="text-xl font-bold text-green-400">{scenario.demandGrowth}</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="text-sm text-gray-400 mb-1">效率提升</div>
                          <div className="text-xl font-bold text-blue-400">{scenario.efficiencyImprovement}</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="text-sm text-gray-400 mb-1">满意度目标</div>
                          <div className="text-xl font-bold text-purple-400">{scenario.satisfactionTarget}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'model' && (
                <div className="space-y-6">
                  {/* 模型性能指标 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-cogs text-cyan-400 mr-2"></i>
                      模型性能指标
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                        <div className="text-sm text-gray-400 mb-2">准确率 (Accuracy)</div>
                        <div className="text-2xl font-bold text-green-400">{predictionData.modelMetrics.accuracy}%</div>
                        <div className="text-xs text-gray-400 mt-1">整体预测准确程度</div>
                      </div>
                      
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                        <div className="text-sm text-gray-400 mb-2">精确率 (Precision)</div>
                        <div className="text-2xl font-bold text-blue-400">{predictionData.modelMetrics.precision}%</div>
                        <div className="text-xs text-gray-400 mt-1">预测正确的比例</div>
                      </div>
                      
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                        <div className="text-sm text-gray-400 mb-2">召回率 (Recall)</div>
                        <div className="text-2xl font-bold text-purple-400">{predictionData.modelMetrics.recall}%</div>
                        <div className="text-xs text-gray-400 mt-1">实际正确的识别率</div>
                      </div>
                      
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                        <div className="text-sm text-gray-400 mb-2">F1分数</div>
                        <div className="text-2xl font-bold text-yellow-400">{predictionData.modelMetrics.f1Score}%</div>
                        <div className="text-xs text-gray-400 mt-1">精确率和召回率调和平均</div>
                      </div>
                      
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                        <div className="text-sm text-gray-400 mb-2">MAPE</div>
                        <div className="text-2xl font-bold text-red-400">{predictionData.modelMetrics.mape}%</div>
                        <div className="text-xs text-gray-400 mt-1">平均绝对百分比误差</div>
                      </div>
                      
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                        <div className="text-sm text-gray-400 mb-2">RMSE</div>
                        <div className="text-2xl font-bold text-orange-400">{predictionData.modelMetrics.rmse}</div>
                        <div className="text-xs text-gray-400 mt-1">均方根误差</div>
                      </div>
                    </div>
                  </div>

                  {/* 模型训练信息 */}
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-brain text-purple-400 mr-2"></i>
                      模型训练信息
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">训练数据量</span>
                          <span className="text-white font-medium">50,000+ 条记录</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">特征维度</span>
                          <span className="text-white font-medium">128 个特征</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">训练时长</span>
                          <span className="text-white font-medium">4.5 小时</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">模型版本</span>
                          <span className="text-white font-medium">v2.1.3</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">最后更新</span>
                          <span className="text-white font-medium">2024-01-15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">模型类型</span>
                          <span className="text-white font-medium">LSTM + Transformer</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">验证集准确率</span>
                          <span className="text-green-400 font-medium">95.8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">模型状态</span>
                          <span className="text-green-400 font-medium">运行中</span>
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
