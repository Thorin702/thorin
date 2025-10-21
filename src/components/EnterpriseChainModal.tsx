import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Sankey
} from 'recharts';

interface EnterpriseChainModalProps {
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

// 企业链分析模拟数据
const enterpriseChainData = {
  chainOverview: {
    totalEnterprises: 2847,
    chainCount: 156,
    chainIntegrity: 89.2,
    collaborationEfficiency: 94.6,
    growthRate: 12.3
  },
  industryDistribution: [
    { name: '制造业', value: 35, enterprises: 996, chains: 45, color: '#3B82F6' },
    { name: '服务业', value: 28, enterprises: 797, chains: 38, color: '#10B981' },
    { name: '科技业', value: 22, enterprises: 626, chains: 32, color: '#8B5CF6' },
    { name: '金融业', value: 15, enterprises: 428, chains: 21, color: '#F59E0B' }
  ],
  chainAnalysis: [
    {
      chainName: '智能制造产业链',
      stageCount: 8,
      enterpriseCount: 156,
      integrity: 95.2,
      efficiency: 92.8,
      value: 125.6,
      trend: '+8.5%',
      stages: [
        { name: '原材料供应', enterprises: 24, efficiency: 94.2 },
        { name: '零部件制造', enterprises: 32, efficiency: 91.8 },
        { name: '组装生产', enterprises: 28, efficiency: 93.5 },
        { name: '质量控制', enterprises: 18, efficiency: 96.1 },
        { name: '物流配送', enterprises: 22, efficiency: 89.7 },
        { name: '销售服务', enterprises: 20, efficiency: 88.3 },
        { name: '售后维护', enterprises: 12, efficiency: 87.9 }
      ]
    },
    {
      chainName: '数字经济产业链',
      stageCount: 6,
      enterpriseCount: 98,
      integrity: 87.6,
      efficiency: 89.4,
      value: 89.3,
      trend: '+15.2%',
      stages: [
        { name: '数据采集', enterprises: 16, efficiency: 92.1 },
        { name: '数据处理', enterprises: 18, efficiency: 88.7 },
        { name: '算法开发', enterprises: 14, efficiency: 86.3 },
        { name: '应用开发', enterprises: 20, efficiency: 90.2 },
        { name: '平台运营', enterprises: 16, efficiency: 87.8 },
        { name: '用户服务', enterprises: 14, efficiency: 91.5 }
      ]
    },
    {
      chainName: '绿色能源产业链',
      stageCount: 7,
      enterpriseCount: 134,
      integrity: 91.8,
      efficiency: 93.7,
      value: 156.8,
      trend: '+12.7%',
      stages: [
        { name: '资源勘探', enterprises: 18, efficiency: 89.4 },
        { name: '设备制造', enterprises: 24, efficiency: 92.6 },
        { name: '工程建设', enterprises: 20, efficiency: 94.1 },
        { name: '运营维护', enterprises: 22, efficiency: 95.8 },
        { name: '电力传输', enterprises: 16, efficiency: 93.2 },
        { name: '储能技术', enterprises: 14, efficiency: 88.9 },
        { name: '环保处理', enterprises: 20, efficiency: 91.7 }
      ]
    }
  ],
  collaborationMatrix: [
    { from: '原材料供应', to: '零部件制造', value: 156, efficiency: 94.2 },
    { from: '零部件制造', to: '组装生产', value: 142, efficiency: 91.8 },
    { from: '组装生产', to: '质量控制', value: 138, efficiency: 93.5 },
    { from: '质量控制', to: '物流配送', value: 134, efficiency: 96.1 },
    { from: '物流配送', to: '销售服务', value: 128, efficiency: 89.7 },
    { from: '销售服务', to: '售后维护', value: 118, efficiency: 88.3 }
  ],
  trendAnalysis: [
    { month: '1月', chainCount: 142, enterprises: 2650, efficiency: 91.2, value: 1250.6 },
    { month: '2月', chainCount: 145, enterprises: 2680, efficiency: 92.1, value: 1280.3 },
    { month: '3月', chainCount: 150, enterprises: 2720, efficiency: 93.4, value: 1320.8 },
    { month: '4月', chainCount: 153, enterprises: 2780, efficiency: 94.2, value: 1360.5 },
    { month: '5月', chainCount: 155, enterprises: 2820, efficiency: 94.8, value: 1390.2 },
    { month: '6月', chainCount: 156, enterprises: 2847, efficiency: 94.6, value: 1410.9 }
  ]
};

export default function EnterpriseChainModal({ isOpen, onClose }: EnterpriseChainModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChain, setSelectedChain] = useState(0);

  const tabs = [
    { id: 'overview', name: '链式总览', icon: 'fa-link' },
    { id: 'analysis', name: '链条分析', icon: 'fa-sitemap' },
    { id: 'collaboration', name: '协同关系', icon: 'fa-handshake' },
    { id: 'trends', name: '趋势分析', icon: 'fa-chart-line' },
    { id: 'optimization', name: '优化建议', icon: 'fa-lightbulb' }
  ];

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-400';
    if (efficiency >= 90) return 'text-blue-400';
    if (efficiency >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEfficiencyBgColor = (efficiency: number) => {
    if (efficiency >= 95) return 'bg-green-500/20 border-green-500/30';
    if (efficiency >= 90) return 'bg-blue-500/20 border-blue-500/30';
    if (efficiency >= 85) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
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
                    <i className="fa-solid fa-link text-blue-400 mr-3"></i>
                    企业链画像分析
                  </h2>
                  <p className="text-gray-400">企业产业链协同关系与效率分析</p>
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
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
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
            <div className="p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* 企业链总览指标 */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {enterpriseChainData.chainOverview.totalEnterprises.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">关联企业总数</div>
                      <div className="text-xs text-green-400">+{enterpriseChainData.chainOverview.growthRate}% 环比</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {enterpriseChainData.chainOverview.chainCount}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">产业链条数量</div>
                      <div className="text-xs text-green-400">+8.7% 环比</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                      <div className="text-3xl font-bold text-purple-400 mb-2">
                        {enterpriseChainData.chainOverview.chainIntegrity}%
                      </div>
                      <div className="text-sm text-gray-400 mb-1">链条完整度</div>
                      <div className="text-xs text-blue-400">+3.5% 环比</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl p-6 border border-orange-500/20">
                      <div className="text-3xl font-bold text-orange-400 mb-2">
                        {enterpriseChainData.chainOverview.collaborationEfficiency}%
                      </div>
                      <div className="text-sm text-gray-400 mb-1">协同效率</div>
                      <div className="text-xs text-green-400">+5.2% 环比</div>
                    </div>
                  </div>

                  {/* 行业分布分析 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="data-card">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <i className="fa-solid fa-chart-pie text-blue-400 mr-2"></i>
                        行业分布分析
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={enterpriseChainData.industryDistribution}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {enterpriseChainData.industryDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="data-card">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <i className="fa-solid fa-building text-green-400 mr-2"></i>
                        行业详细数据
                      </h3>
                      <div className="space-y-4">
                        {enterpriseChainData.industryDistribution.map((industry, index) => (
                          <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-white">{industry.name}</span>
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: industry.color }}
                              ></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-lg font-bold text-white">{industry.enterprises}</div>
                                <div className="text-xs text-gray-400">企业数量</div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-white">{industry.chains}</div>
                                <div className="text-xs text-gray-400">链条数量</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analysis' && (
                <div className="space-y-6">
                  {/* 链条选择器 */}
                  <div className="flex space-x-2 mb-6">
                    {enterpriseChainData.chainAnalysis.map((chain, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedChain(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedChain === index
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {chain.chainName}
                      </button>
                    ))}
                  </div>

                  {/* 选中链条的详细信息 */}
                  <div className="data-card">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">
                        {enterpriseChainData.chainAnalysis[selectedChain].chainName}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {enterpriseChainData.chainAnalysis[selectedChain].integrity}%
                          </div>
                          <div className="text-xs text-gray-400">完整度</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">
                            {enterpriseChainData.chainAnalysis[selectedChain].efficiency}%
                          </div>
                          <div className="text-xs text-gray-400">效率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            {enterpriseChainData.chainAnalysis[selectedChain].value}亿
                          </div>
                          <div className="text-xs text-gray-400">产值</div>
                        </div>
                      </div>
                    </div>

                    {/* 链条阶段分析 */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">链条阶段分析</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {enterpriseChainData.chainAnalysis[selectedChain].stages.map((stage, index) => (
                          <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-white">{stage.name}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getEfficiencyBgColor(stage.efficiency)} ${getEfficiencyColor(stage.efficiency)}`}>
                                {stage.efficiency}%
                              </span>
                            </div>
                            <div className="text-lg font-bold text-white mb-1">{stage.enterprises}</div>
                            <div className="text-xs text-gray-400">参与企业数</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'collaboration' && (
                <div className="space-y-6">
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-handshake text-green-400 mr-2"></i>
                      企业协同关系矩阵
                    </h3>
                    <div className="space-y-4">
                      {enterpriseChainData.collaborationMatrix.map((collab, index) => (
                        <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-blue-400">{collab.from}</span>
                              <i className="fa-solid fa-arrow-right text-gray-400"></i>
                              <span className="text-sm text-green-400">{collab.to}</span>
                            </div>
                            <span className={`text-sm font-medium ${getEfficiencyColor(collab.efficiency)}`}>
                              {collab.efficiency}% 效率
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-white">{collab.value} 家</span>
                            <div className="w-32 bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                                style={{ width: `${collab.efficiency}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'trends' && (
                <div className="space-y-6">
                  <div className="data-card">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-chart-line text-purple-400 mr-2"></i>
                      企业链发展趋势
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={enterpriseChainData.trendAnalysis}>
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
                          <Line type="monotone" dataKey="chainCount" stroke="#3B82F6" strokeWidth={2} name="链条数量" />
                          <Line type="monotone" dataKey="enterprises" stroke="#10B981" strokeWidth={2} name="企业数量" />
                          <Line type="monotone" dataKey="efficiency" stroke="#8B5CF6" strokeWidth={2} name="协同效率(%)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="data-card">
                      <h4 className="text-lg font-semibold text-white mb-4">产值趋势</h4>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={enterpriseChainData.trendAnalysis}>
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
                            <Area type="monotone" dataKey="value" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="data-card">
                      <h4 className="text-lg font-semibold text-white mb-4">关键指标</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">链条增长</span>
                          <span className="text-green-400 font-bold">+9.9%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">企业增长</span>
                          <span className="text-green-400 font-bold">+7.4%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">效率提升</span>
                          <span className="text-blue-400 font-bold">+3.7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">产值增长</span>
                          <span className="text-orange-400 font-bold">+12.8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'optimization' && (
                <div className="space-y-6">
                  {[
                    {
                      title: '产业链数字化升级',
                      priority: '高',
                      impact: '产业链协同效率提升15-20%',
                      effort: '中等',
                      timeline: '6-8个月',
                      description: '通过数字化技术打通产业链各环节，提升信息流通效率'
                    },
                    {
                      title: '供应链金融优化',
                      priority: '中',
                      impact: '企业融资成本降低10-15%',
                      effort: '低',
                      timeline: '3-4个月',
                      description: '建立供应链金融服务平台，为产业链企业提供便捷融资'
                    },
                    {
                      title: '协同创新平台建设',
                      priority: '高',
                      impact: '创新成果转化率提升25%',
                      effort: '高',
                      timeline: '8-12个月',
                      description: '构建产业链协同创新平台，促进上下游企业技术合作'
                    }
                  ].map((suggestion, index) => (
                    <div key={index} className="data-card">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{suggestion.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              suggestion.priority === '高' ? 'bg-red-500/20 text-red-400' : 
                              suggestion.priority === '中' ? 'bg-yellow-500/20 text-yellow-400' : 
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {suggestion.priority}优先级
                            </span>
                          </div>
                          <p className="text-gray-400 mb-4">{suggestion.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">预期影响</div>
                          <div className="text-sm font-medium text-green-400">{suggestion.impact}</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">实施难度</div>
                          <div className="text-sm font-medium text-blue-400">{suggestion.effort}</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">预计周期</div>
                          <div className="text-sm font-medium text-purple-400">{suggestion.timeline}</div>
                        </div>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-lg py-2 px-4 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                        查看实施计划
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
