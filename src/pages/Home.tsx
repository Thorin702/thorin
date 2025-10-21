import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import ComplaintForm from '@/components/ComplaintForm';
import NotificationCenter from '@/components/NotificationCenter';
import ChatSupport from '@/components/ChatSupport';
import IndicatorDetailModal from '@/components/IndicatorDetailModal';
import AIReportModal from '@/components/AIReportModal';
import EnhancedAIAssistantModal from '@/components/EnhancedAIAssistantModal';
import PredictionModelModal from '@/components/PredictionModelModal';
import EnterpriseChainModal from '@/components/EnterpriseChainModal';
import AIEvolutionModal from '@/components/AIEvolutionModal';
import AIAnalysisModal from '@/components/AIAnalysisModal';
import UnifiedAIAnalysisModal from '@/components/UnifiedAIAnalysisModal';
import PushManagementModal from '@/components/PushManagementModal';
import BusinessWorkbenchModal from '@/components/BusinessWorkbenchModal';




export default function Dashboard() {
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showChatSupport, setShowChatSupport] = useState(false);
  const [showIndicatorDetail, setShowIndicatorDetail] = useState(false);
  const [showAIReport, setShowAIReport] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showAIEvolution, setShowAIEvolution] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [showPredictionModel, setShowPredictionModel] = useState(false);
  const [showEnterpriseChain, setShowEnterpriseChain] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [aiAssistantExpanded, setAiAssistantExpanded] = useState(false);
  const [showUnifiedAI, setShowUnifiedAI] = useState(false);
  const [aiAnalysisData, setAiAnalysisData] = useState<any>(null);
  const [showPushManagement, setShowPushManagement] = useState(false);
  const [showWorkbench, setShowWorkbench] = useState(false);
  const [pushedDataList, setPushedDataList] = useState<any[]>([]);

  const sphereRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // 更新时间

  // 3D球体效果
  useEffect(() => {
    if (!sphereRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    
    sphereRef.current.appendChild(renderer.domElement);
    
    // 创建粒子系统
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      if (sphereRef.current && renderer.domElement) {
        sphereRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // 处理场景点击
  const handleRegionClick = (scenario: string) => {
    // 映射场景到对应的指标类型
    const scenarioMap: { [key: string]: string } = {
      '政策直达': 'policy-direct',
      '产业协同': 'industry-collaboration', 
      '精准服务': 'precision-service',
      '风险治理': 'risk-governance'
    };
    const indicatorType = scenarioMap[scenario] || 'policy-direct';
    setSelectedIndicator(indicatorType);
    setShowIndicatorDetail(true);
  };

  // 统一的AI分析处理函数
  const handleAIAnalysis = (moduleType: string, _title: string) => {
    const analysisDataMap: { [key: string]: any } = {
      'scenario': {
        keyMetrics: [
          { label: '政策直达响应率', value: '94.2%', trend: '+3.5%' },
          { label: '产业协同效率', value: '92.1%', trend: '+5.6%' },
          { label: '精准服务满意度', value: '95.8%', trend: '+3.4%' },
          { label: '风险治理准确率', value: '94.2%', trend: '+2.6%' }
        ],
        chartData: [
          { name: '1月', 企业诉求多样性: 2.1, 外部环境复杂性: 4.5, 业务协同效率: 86.5, 数据驱动效果: 83.1, 综合业务影响: 92.4 },
          { name: '2月', 企业诉求多样性: 2.2, 外部环境复杂性: 5.1, 业务协同效率: 89.2, 数据驱动效果: 85.7, 综合业务影响: 93.8 },
          { name: '3月', 企业诉求多样性: 2.3, 外部环境复杂性: 6.5, 业务协同效率: 92.1, 数据驱动效果: 89.3, 综合业务影响: 95.8 }
        ],
        chartLines: [
          { dataKey: '企业诉求多样性', color: '#3B82F6', name: '企业诉求多样性' },
          { dataKey: '外部环境复杂性', color: '#10B981', name: '外部环境复杂性' },
          { dataKey: '业务协同效率', color: '#8B5CF6', name: '业务协同效率' },
          { dataKey: '数据驱动效果', color: '#F59E0B', name: '数据驱动效果' },
          { dataKey: '综合业务影响', color: '#EF4444', name: '综合业务影响' }
        ],
        anomalies: [
          { type: '高净值企业投诉异常', description: '检测到高净值企业投诉占比在3月15日激增至18.5%，超出正常范围', time: '2024-03-15 14:30' },
          { type: '产业政策诉求激增', description: '产业政策相关诉求增长率在3月20日达到峰值15.2%', time: '2024-03-20 09:15' },
          { type: '多部门协同性下降', description: '多部门协同性指标在3月18日下降至68.3%，需要关注', time: '2024-03-18 16:45' }
        ],
        patterns: [
          { name: '政策发布周期效应', description: '发现政策发布后7-14天内相关诉求量显著上升', confidence: 94 },
          { name: '企业生命周期关联', description: '初创期企业诉求多样性与企业增长呈正相关', confidence: 89 },
          { name: '季节性协同效率变化', description: '春季多部门协同效率普遍提升15-20%', confidence: 87 }
        ],
        correlations: [
          { factor1: '企业增长与资源配比', coefficient: '0.82', factor2: '多元化需求匹配' },
          { factor1: '产业政策诉求', coefficient: '0.76', factor2: '外部环境复杂性' },
          { factor1: '办理时长优化', coefficient: '-0.68', factor2: '满意度提升' }
        ],
        predictionData: [
          { period: '1月', actual: 1200, predicted: 1250 },
          { period: '2月', actual: 1350, predicted: 1380 },
          { period: '3月', actual: 1500, predicted: 1520 },
          { period: '4月', actual: null, predicted: 1680 },
          { period: '5月', actual: null, predicted: 1850 }
        ],
        predictions: [
          { title: '下月诉求总量', value: '1,680', timeframe: '4月', accuracy: 94 },
          { title: '企业诉求多样性', value: '2.5', timeframe: '4月', accuracy: 91 },
          { title: '产业协同效率', value: '94.2%', timeframe: '4月', accuracy: 89 },
          { title: '风险识别准确率', value: '95.8%', timeframe: '4月', accuracy: 92 }
        ],
        recommendations: [
          {
            title: '优化高净值企业服务',
            description: '针对高净值企业投诉占比异常，建议建立专属服务通道，提升响应速度和服务质量。',
            priority: 'high',
            impact: '降低高净值企业投诉占比至12%'
          },
          {
            title: '加强产业政策宣传',
            description: '建立产业政策发布预警机制，提前做好政策解读和咨询服务准备。',
            priority: 'high',
            impact: '提升政策诉求处理效率25%'
          },
          {
            title: '完善多部门协同机制',
            description: '建立跨部门协同工作台，优化信息流转和任务分配机制，提升协同效率。',
            priority: 'medium',
            impact: '提升多部门协同性至85%'
          },
          {
            title: '强化风险预警系统',
            description: '完善AI风险识别算法，提升风险预警的准确性和及时性。',
            priority: 'medium',
            impact: '提升风险识别准确率至96%'
          }
        ]
      },
      'enterprise-chain': {
        keyMetrics: [
          { label: '关联企业', value: '2,847', trend: '+12.3%' },
          { label: '产业链条', value: '156', trend: '+8.7%' },
          { label: '完整度', value: '89.2%', trend: '+3.5%' },
          { label: '协同效率', value: '94.6%', trend: '+5.2%' }
        ],
        chartData: [
          { name: '1月', 制造业: 35, 服务业: 28, 科技业: 22, 金融业: 15 },
          { name: '2月', 制造业: 37, 服务业: 30, 科技业: 24, 金融业: 16 },
          { name: '3月', 制造业: 39, 服务业: 32, 科技业: 26, 金融业: 18 }
        ],
        chartLines: [
          { dataKey: '制造业', color: '#3B82F6', name: '制造业' },
          { dataKey: '服务业', color: '#10B981', name: '服务业' },
          { dataKey: '科技业', color: '#8B5CF6', name: '科技业' },
          { dataKey: '金融业', color: '#F59E0B', name: '金融业' }
        ],
        anomalies: [
          { type: '链条断裂风险', description: '检测到新能源产业链上游供应环节存在断裂风险', time: '2024-03-18 10:20' }
        ],
        patterns: [
          { name: '产业集群效应', description: '制造业与服务业呈现强正相关关系', confidence: 95 },
          { name: '技术创新驱动', description: '科技业发展带动整体产业链升级', confidence: 88 }
        ],
        correlations: [
          { factor1: '技术创新', coefficient: '0.78', factor2: '产业链完整度' },
          { factor1: '政策支持', coefficient: '0.82', factor2: '企业协同度' }
        ],
        predictionData: [
          { period: '1月', actual: 2847, predicted: 2900 },
          { period: '2月', actual: 2950, predicted: 2980 },
          { period: '3月', actual: 3100, predicted: 3120 },
          { period: '4月', actual: null, predicted: 3250 },
          { period: '5月', actual: null, predicted: 3400 }
        ],
        predictions: [
          { title: '企业增长', value: '3,250', timeframe: '4月', accuracy: 96 },
          { title: '链条完整度', value: '91.5%', timeframe: '4月', accuracy: 93 },
          { title: '协同效率', value: '96.2%', timeframe: '4月', accuracy: 90 }
        ],
        recommendations: [
          {
            title: '加强产业链协同',
            description: '建立产业链协同平台，促进上下游企业信息共享和资源整合。',
            priority: 'high',
            impact: '提升25%协同效率'
          },
          {
            title: '优化产业布局',
            description: '根据AI分析结果，调整产业园区布局，增强产业集群效应。',
            priority: 'medium',
            impact: '提升18%整体效率'
          }
        ]
      },
      'innovation': {
        keyMetrics: [
          { label: '创新指数', value: '87.3', trend: '+5.8%' },
          { label: '政策响应', value: '92.1%', trend: '+2.3%' },
          { label: '满意度', value: '4.8/5', trend: '+0.2' },
          { label: '整体效率', value: '92.3%', trend: '+3.1%' }
        ],
        chartData: [
          { name: '1月', 技术创新: 85, 管理创新: 82, 模式创新: 78, 服务创新: 88 },
          { name: '2月', 技术创新: 87, 管理创新: 84, 模式创新: 80, 服务创新: 90 },
          { name: '3月', 技术创新: 89, 管理创新: 86, 模式创新: 82, 服务创新: 92 }
        ],
        chartLines: [
          { dataKey: '技术创新', color: '#3B82F6', name: '技术创新' },
          { dataKey: '管理创新', color: '#10B981', name: '管理创新' },
          { dataKey: '模式创新', color: '#8B5CF6', name: '模式创新' },
          { dataKey: '服务创新', color: '#F59E0B', name: '服务创新' }
        ],
        anomalies: [
          { type: '创新瓶颈', description: '模式创新领域存在明显瓶颈，需要重点关注', time: '2024-03-17 16:45' }
        ],
        patterns: [
          { name: '服务创新领先', description: '服务创新指数持续领先其他维度', confidence: 94 },
          { name: '技术创新驱动', description: '技术创新与整体创新指数高度相关', confidence: 91 }
        ],
        correlations: [
          { factor1: '政策支持', coefficient: '0.76', factor2: '创新指数' },
          { factor1: '人才投入', coefficient: '0.83', factor2: '技术创新' }
        ],
        predictionData: [
          { period: '1月', actual: 87.3, predicted: 88.5 },
          { period: '2月', actual: 89.1, predicted: 90.2 },
          { period: '3月', actual: 91.8, predicted: 92.5 },
          { period: '4月', actual: null, predicted: 94.2 },
          { period: '5月', actual: null, predicted: 95.8 }
        ],
        predictions: [
          { title: '创新指数', value: '94.2', timeframe: '4月', accuracy: 93 },
          { title: '政策响应', value: '94.5%', timeframe: '4月', accuracy: 91 },
          { title: '满意度', value: '4.9/5', timeframe: '4月', accuracy: 88 }
        ],
        recommendations: [
          {
            title: '加强模式创新',
            description: '针对模式创新瓶颈，建立创新孵化平台，提供更多政策支持。',
            priority: 'high',
            impact: '提升30%模式创新指数'
          },
          {
            title: '优化人才政策',
            description: '完善人才引进和培养机制，提升技术创新能力。',
            priority: 'medium',
            impact: '提升20%技术创新水平'
          }
        ]
      }
    };

    const data = analysisDataMap[moduleType] || analysisDataMap['scenario'];
    setAiAnalysisData(data);
    setShowUnifiedAI(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800 overflow-hidden relative">
      {/* 轻量背景纹理 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05)_0%,transparent_50%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.03)_0%,transparent_50%)]"></div>
      </div>
      
      {/* 轻量装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400/10 blur-xl"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>


      {/* 顶部导航 - 明亮清爽风格 */}
      <header className="py-4 px-6 flex justify-between items-center relative z-10 border-b border-blue-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-400 transition-colors">
              <option>全部</option>
              <option>今年</option>
              <option>去年</option>
              <option>近三年</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-400 transition-colors">
              <option>12345政务热线</option>
              <option>12345企业热线</option>
              <option>迎商中心热线</option>
              <option>经开区政府官网</option>
              <option>亦企服务港</option>
              <option>产业社区</option>
              <option>产业部门</option>
              <option>服务管家</option>
            </select>
          </div>
        </div>
        
        {/* 中央标题 */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                "亦企办"接诉即办服务平台
              </span>
            </h1>
            <p className="text-sm text-gray-600 mt-2 flex items-center justify-center">
              <i className="fa-solid fa-robot text-blue-500 mr-2"></i>
              智能化 • 数字化 • 精准化
              <i className="fa-solid fa-brain text-purple-500 ml-2"></i>
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* 柔性督办按钮 */}
          <button 
            onClick={() => setShowPushManagement(true)}
            className="relative group"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm hover:shadow-md">
              <i className="fa-solid fa-tasks text-sm"></i>
              <span className="text-sm font-medium">柔性督办</span>
            </div>
          </button>

          {/* 自主治理工作台按钮 */}
          <button 
            onClick={() => setShowWorkbench(true)}
            className="relative group"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm hover:shadow-md">
              <i className="fa-solid fa-house-laptop text-sm"></i>
              <span className="text-sm font-medium">自主治理工作台</span>
            </div>
          </button>
          
          {/* 通知图标 */}
          <button 
            onClick={() => setShowNotificationCenter(true)}
            className="relative p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          >
            <i className="fa-solid fa-bell text-blue-600 text-lg"></i>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-medium">3</span>
          </button>
          
          {/* AI报告按钮 */}
          <button 
            onClick={() => setShowAIReport(true)}
            className="relative group"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm hover:shadow-md">
              <i className="fa-solid fa-brain text-sm"></i>
              <span className="text-sm font-medium">AI报告</span>
            </div>
          </button>
          
          {/* 退出登录 */}
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300">
            <i className="fa-solid fa-sign-out-alt text-gray-600 hover:text-gray-800 text-lg"></i>
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="relative z-10 px-8 py-6">


        {/* 场景定位模块 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: '政策直达', 
              lifecycle: '初创期',
              icon: 'fa-rocket', 
              color: 'blue',
              description: '为初创企业提供政策咨询、资金申请、证照办理等一站式服务',
              primaryIndicators: [
                {
                  name: '企业诉求多样性',
                  secondaryIndicators: [
                    { name: '企业增长与资源配比率', value: '2.3', unit: '工单/万元', trend: '+5.2%', description: '通过企业营业额、产值和毛利综合衡量企业增长情况，计算单位企业增长的工单诉求数', calculation: '企业增长与资源配比率 = 工单诉求总数 / (企业营业额 + 产值 + 毛利)', data: { current: 2.3, previous: 2.1, target: 2.5 } },
                    { name: '高净值企业投诉占比', value: '15.6', unit: '%', trend: '-2.1%', description: '高净值企业投诉工单占总工单比例', calculation: '高净值企业投诉占比 = 高净值企业投诉工单数 / 总工单数 × 100%', data: { current: 15.6, previous: 17.7, target: 12.0 } },
                    { name: '多元化需求匹配率', value: '78.4', unit: '%', trend: '+3.7%', description: '统计单个投诉中涉及事项数量，反映诉求需求复杂性', calculation: '多元化需求匹配率 = 涉及多事项的投诉数 / 总投诉数 × 100%', data: { current: 78.4, previous: 74.7, target: 85.0 } }
                  ]
                },
                {
                  name: '外部环境复杂性',
                  secondaryIndicators: [
                    { name: '产业政策相关诉求增长率', value: '12.8', unit: '%', trend: '+8.3%', description: '分析诉求内容文本，计算与产业政策调整相关工单数量环比', calculation: '产业政策相关诉求增长率 = (本月产业政策相关诉求数 - 上月诉求数) / 上月诉求数 × 100%', data: { current: 12.8, previous: 4.5, target: 15.0 } },
                    { name: '财税政策相关投诉增长率', value: '9.2', unit: '%', trend: '+4.1%', description: '分析诉求内容文本，计算与财税政策调整相关工单数量环比', calculation: '财税政策相关投诉增长率 = (本月财税政策相关投诉数 - 上月投诉数) / 上月投诉数 × 100%', data: { current: 9.2, previous: 5.1, target: 12.0 } },
                    { name: '紧急公共事件相关投诉增长率', value: '6.5', unit: '%', trend: '+1.8%', description: '分析诉求内容文本，计算与紧急公共事件相关工单数量环比', calculation: '紧急公共事件相关投诉增长率 = (本月紧急事件相关投诉数 - 上月投诉数) / 上月投诉数 × 100%', data: { current: 6.5, previous: 4.7, target: 8.0 } }
                  ]
                }
              ]
            },
            { 
              title: '产业协同', 
              lifecycle: '成长期',
              icon: 'fa-sync-alt', 
              color: 'green',
              description: '促进成长期企业跨部门协作，提升产业协同效率',
              primaryIndicators: [
                {
                  name: '业务协同与效率提升',
                  secondaryIndicators: [
                    { name: '办理时长优化率', value: '18.7', unit: '%', trend: '+12.3%', description: '工单成功办结时长环比', calculation: '办理时长优化率 = (上月平均办理时长 - 本月平均办理时长) / 上月平均办理时长 × 100%', data: { current: 18.7, previous: 6.4, target: 25.0 } },
                    { name: '流程效率提升', value: '92.1', unit: '%', trend: '+5.6%', description: '派单准确率；根据退单情况，统计各部门退单数量，分析退单内容，可视化服务堵点', calculation: '流程效率提升 = (1 - 退单率) × 100%', data: { current: 92.1, previous: 86.5, target: 95.0 } },
                    { name: '多部门协同性', value: '76.8', unit: '%', trend: '+8.9%', description: '需多部门协同工单占比，并统计成功协同处理及总结每月一题数量', calculation: '多部门协同性 = 成功协同处理工单数 / 需多部门协同工单总数 × 100%', data: { current: 76.8, previous: 67.9, target: 85.0 } }
                  ]
                },
                {
                  name: '数据驱动与效果验证',
                  secondaryIndicators: [
                    { name: '业务影响数据化', value: '89.3', unit: '%', trend: '+6.2%', description: '分产业、分规模统计企业增长情况', calculation: '业务影响数据化 = 已数据化统计的企业数 / 总企业数 × 100%', data: { current: 89.3, previous: 83.1, target: 95.0 } },
                    { name: '投诉类型调整率', value: '14.6', unit: '%', trend: '+2.8%', description: '基于投诉主题（非既有分类）进行统计，计算环比', calculation: '投诉类型调整率 = (本月新增投诉类型数 - 上月新增类型数) / 上月新增类型数 × 100%', data: { current: 14.6, previous: 11.8, target: 20.0 } },
                    { name: '服务堵点疏通率', value: '82.4', unit: '%', trend: '+7.1%', description: '统计同类退单事项工单环比', calculation: '服务堵点疏通率 = (上月同类退单数 - 本月同类退单数) / 上月同类退单数 × 100%', data: { current: 82.4, previous: 75.3, target: 90.0 } }
                  ]
                }
              ]
            },
            { 
              title: '精准服务', 
              lifecycle: '成熟期',
              icon: 'fa-bullseye', 
              color: 'purple',
              description: '为成熟期企业提供精准化、个性化服务解决方案',
              primaryIndicators: [
                {
                  name: '综合业务影响评估',
                  secondaryIndicators: [
                    { name: '同类型投诉减少率', value: '23.5', unit: '%', trend: '+15.7%', description: '基于投诉事项，计算同类事项工单环比', calculation: '同类型投诉减少率 = (上月同类投诉数 - 本月同类投诉数) / 上月同类投诉数 × 100%', data: { current: 23.5, previous: 7.8, target: 30.0 } },
                    { name: '响应速度提升率', value: '31.2', unit: '%', trend: '+9.8%', description: '响应率与响应时长综合计算', calculation: '响应速度提升率 = 响应率 × (1 - 平均响应时长/标准响应时长) × 100%', data: { current: 31.2, previous: 21.4, target: 40.0 } },
                    { name: '满意度提升率', value: '95.8', unit: '%', trend: '+3.4%', description: '结合两类满意率数据：1. 线上渠道12345接诉即办满意率统计；2. 统计企业主观满意率', calculation: '满意度提升率 = (线上满意率 × 0.6 + 企业主观满意率 × 0.4)', data: { current: 95.8, previous: 92.4, target: 98.0 } }
                  ]
                }
              ]
            },
            { 
              title: '风险治理', 
              lifecycle: '全周期风险',
              icon: 'fa-shield-alt', 
              color: 'red',
              description: '全生命周期风险识别、预警和治理机制',
              primaryIndicators: [
                {
                  name: '风险预警与防控',
                  secondaryIndicators: [
                    { name: '风险识别准确率', value: '94.2', unit: '%', trend: '+2.6%', description: 'AI识别潜在风险事件的准确率', calculation: '风险识别准确率 = 正确识别的风险事件数 / 实际风险事件总数 × 100%', data: { current: 94.2, previous: 91.6, target: 96.0 } },
                    { name: '预警响应及时率', value: '96.8', unit: '%', trend: '+4.3%', description: '风险预警后及时响应的比例', calculation: '预警响应及时率 = 及时响应的预警数 / 总预警数 × 100%', data: { current: 96.8, previous: 92.5, target: 98.0 } },
                    { name: '风险化解成功率', value: '87.5', unit: '%', trend: '+6.9%', description: '已识别风险事件成功化解的比例', calculation: '风险化解成功率 = 成功化解的风险事件数 / 已识别风险事件总数 × 100%', data: { current: 87.5, previous: 80.6, target: 92.0 } }
                  ]
                },
                {
                  name: '全周期监控',
                  secondaryIndicators: [
                    { name: '企业生命周期覆盖率', value: '98.6', unit: '%', trend: '+1.2%', description: '覆盖企业全生命周期的监控比例', calculation: '企业生命周期覆盖率 = 已覆盖生命周期的企业数 / 总企业数 × 100%', data: { current: 98.6, previous: 97.4, target: 99.5 } },
                    { name: '跨阶段风险传导率', value: '12.4', unit: '%', trend: '-3.7%', description: '风险在不同生命周期阶段传导的比例', calculation: '跨阶段风险传导率 = 跨阶段传导的风险事件数 / 总风险事件数 × 100%', data: { current: 12.4, previous: 16.1, target: 8.0 } },
                    { name: '系统性风险预警率', value: '89.1', unit: '%', trend: '+5.8%', description: '系统性风险的预警准确率', calculation: '系统性风险预警率 = 正确预警的系统性风险数 / 实际系统性风险数 × 100%', data: { current: 89.1, previous: 83.3, target: 93.0 } }
                  ]
                }
              ]
            }
          ].map((scenario, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRegionClick(scenario.title)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${scenario.color}-100 flex items-center justify-center`}>
                  <i className={`fa-solid ${scenario.icon} text-${scenario.color}-600 text-xl`}></i>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">生命周期</div>
                  <div className="text-sm font-medium text-gray-800">{scenario.lifecycle}</div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{scenario.title}</h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">{scenario.description}</p>
              
              <div className="space-y-3">
                {scenario.primaryIndicators.slice(0, 1).map((indicator, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">{indicator.name}</div>
                    {indicator.secondaryIndicators.slice(0, 2).map((secondary, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center text-xs">
                        <span className="text-gray-600 truncate">{secondary.name}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-800 font-semibold">{secondary.value}{secondary.unit}</span>
                          <span className={secondary.trend.startsWith('+') ? 'text-green-600' : secondary.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}>
                            {secondary.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">点击查看详细分析</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAIAnalysis('scenario', scenario.title);
                    }}
                    className="text-xs text-purple-600 hover:text-purple-700 transition-colors flex items-center font-medium"
                  >
                    <i className="fa-solid fa-robot mr-1"></i>
                    AI分析
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* 智能预测模型区域 */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <i className="fa-solid fa-crystal-ball text-purple-600 mr-2"></i>
              智能预测模型
            </h3>
            <button
              onClick={() => setShowPredictionModel(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
            >
              <i className="fas fa-chart-line"></i>
              <span className="text-sm">详细分析</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-blue-700 mb-2 font-medium">下月诉求预测</div>
              <div className="text-2xl font-bold text-blue-900 mb-1">2,150</div>
              <div className="text-sm text-green-600 font-medium">+8.5% 增长</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-700 mb-2 font-medium">处理效率预测</div>
              <div className="text-2xl font-bold text-green-900 mb-1">94.2%</div>
              <div className="text-sm text-blue-600 font-medium">+2.1% 提升</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="text-sm text-purple-700 mb-2 font-medium">满意度预测</div>
              <div className="text-2xl font-bold text-purple-900 mb-1">96.8%</div>
              <div className="text-sm text-purple-600 font-medium">+1.3% 提升</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
              <div className="text-sm text-emerald-700 mb-2 font-medium">风险预警</div>
              <div className="text-2xl font-bold text-emerald-900 mb-1">低风险</div>
              <div className="text-sm text-green-600 font-medium">系统稳定</div>
            </div>
          </div>
          
          {/* 预测趋势图 */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { month: '1月', actual: 1800, predicted: 1850 },
                { month: '2月', actual: 1950, predicted: 1920 },
                { month: '3月', actual: 2100, predicted: 2050 },
                { month: '4月', actual: 2200, predicted: 2180 },
                { month: '5月', actual: 2350, predicted: 2300 },
                { month: '6月', actual: 2450, predicted: 2400 }
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
                <Line type="monotone" dataKey="actual" stroke="#06B6D4" strokeWidth={2} name="实际值" />
                <Line type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" name="预测值" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 企业链画像分析区域 - 精简看板 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {/* 企业链画像总览 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                <i className="fa-solid fa-link text-blue-600 mr-2"></i>
                企业链画像
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAIAnalysis('enterprise-chain', '企业链画像');
                  }}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                  title="AI分析"
                >
                  <i className="fa-solid fa-robot text-sm"></i>
                </button>
                <button
                  onClick={() => setShowEnterpriseChain(true)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  title="详细分析"
                >
                  <i className="fas fa-external-link-alt text-sm"></i>
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">关联企业</span>
                <span className="text-lg font-bold text-blue-600">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">产业链条</span>
                <span className="text-lg font-bold text-green-600">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">完整度</span>
                <span className="text-lg font-bold text-purple-600">89.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">协同效率</span>
                <span className="text-lg font-bold text-orange-600">94.6%</span>
              </div>
            </div>
          </div>

          {/* 企业生命周期分析 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fa-solid fa-sitemap text-green-600 mr-2"></i>
              生命周期
            </h3>
            
            <div className="space-y-2">
              {[
                { stage: '初创期', count: 456, percentage: 16.0, color: 'blue' },
                { stage: '成长期', count: 892, percentage: 31.3, color: 'green' },
                { stage: '成熟期', count: 1247, percentage: 43.8, color: 'purple' },
                { stage: '转型期', count: 252, percentage: 8.9, color: 'orange' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{item.stage}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-800">{item.count}</span>
                    <div className="w-12 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`bg-${item.color}-500 h-1.5 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 行业分布 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fa-solid fa-chart-pie text-purple-600 mr-2"></i>
              行业分布
            </h3>
            
            <div className="space-y-2">
              {[
                { name: '制造业', value: 35, color: '#3B82F6' },
                { name: '服务业', value: 28, color: '#10B981' },
                { name: '科技业', value: 22, color: '#8B5CF6' },
                { name: '金融业', value: 15, color: '#F59E0B' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 协同关系 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fa-solid fa-handshake text-orange-600 mr-2"></i>
              协同关系
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">协同企业</span>
                <span className="text-lg font-bold text-orange-600">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">合作项目</span>
                <span className="text-lg font-bold text-blue-600">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">成功率</span>
                <span className="text-lg font-bold text-green-600">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">活跃度</span>
                <span className="text-lg font-bold text-purple-600">87.6%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 企业创新分析区域 - 精简看板 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {/* 创新指数分析 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>
                创新指数
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAIAnalysis('innovation', '企业创新分析');
                }}
                className="text-purple-600 hover:text-purple-700 transition-colors"
                title="AI分析"
              >
                <i className="fa-solid fa-robot text-sm"></i>
              </button>
            </div>
            
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-yellow-600 mb-1">87.3</div>
              <div className="text-xs text-green-600 font-medium">+5.8% 较上月</div>
            </div>
            
            <div className="space-y-2">
              {[
                { name: '技术创新', value: 89.2, color: 'blue' },
                { name: '管理创新', value: 85.6, color: 'green' },
                { name: '模式创新', value: 82.4, color: 'purple' },
                { name: '服务创新', value: 91.8, color: 'orange' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`bg-${item.color}-500 h-1.5 rounded-full`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 政策响应度分析 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fa-solid fa-file-contract text-green-600 mr-2"></i>
              政策响应
            </h3>
            
            <div className="space-y-2">
              {[
                { policy: '税收优惠', response: 94.2, implementation: 89.6 },
                { policy: '产业扶持', response: 87.8, implementation: 82.3 },
                { policy: '人才引进', response: 91.5, implementation: 86.7 },
                { policy: '科技创新', response: 88.9, implementation: 84.1 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{item.policy}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-green-600">{item.response}%</span>
                    <span className="text-xs font-bold text-blue-600">{item.implementation}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 服务满意度分析 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fa-solid fa-star text-purple-600 mr-2"></i>
              服务满意度
            </h3>
            
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-purple-600 mb-1">4.8</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-yellow-500 text-xs"></i>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              {[
                { service: '政策咨询', rating: 4.9, feedback: 156 },
                { service: '证照办理', rating: 4.7, feedback: 234 },
                { service: '投诉处理', rating: 4.8, feedback: 189 },
                { service: '资金申请', rating: 4.6, feedback: 98 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{item.service}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({item.feedback})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 综合评估 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fa-solid fa-chart-line text-cyan-600 mr-2"></i>
              综合评估
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">整体效率</span>
                <span className="text-lg font-bold text-green-600">92.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">响应速度</span>
                <span className="text-lg font-bold text-blue-600">1.8h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">问题解决率</span>
                <span className="text-lg font-bold text-purple-600">96.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">用户增长</span>
                <span className="text-lg font-bold text-orange-600">+12.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI数据分析助手浮标 - 优化为明亮风格 */}
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20">
          <div className="relative">
            <button
              onClick={() => setAiAssistantExpanded(!aiAssistantExpanded)}
              className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <i className="fa-solid fa-robot text-white text-lg"></i>
            </button>
            
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              <div className="text-sm text-gray-800 font-medium">AI数据分析助手</div>
              <div className="text-xs text-gray-500">点击查看详细分析</div>
            </div>
            
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          
          <AnimatePresence>
            {aiAssistantExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute left-16 top-0 w-72 bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-800">AI助手预览</h3>
                  <button
                    onClick={() => setAiAssistantExpanded(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <i className="fa-solid fa-times text-xs"></i>
                  </button>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-800 font-medium">实时分析</span>
                    </div>
                    <p className="text-xs text-green-700">检测到异常诉求模式</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-800 font-medium">智能预测</span>
                    </div>
                    <p className="text-xs text-blue-700">下月诉求量预计增长8-12%</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-purple-800 font-medium">优化建议</span>
                    </div>
                    <p className="text-xs text-purple-700">建议增加智能问答功能</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setAiAssistantExpanded(false);
                    setShowAIAssistant(true);
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg py-2 px-3 text-xs font-medium transition-all duration-300 shadow-sm"
                >
                  <i className="fa-solid fa-expand mr-1"></i>
                  展开完整界面
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 弹窗组件 */}
      <AnimatePresence>
        {showComplaintForm && (
          <ComplaintForm onClose={() => setShowComplaintForm(false)} />
        )}
        
        {showNotificationCenter && (
          <NotificationCenter 
            isOpen={showNotificationCenter}
            onClose={() => setShowNotificationCenter(false)} 
          />
        )}
        
        {showChatSupport && (
          <ChatSupport 
            isOpen={showChatSupport}
            onClose={() => setShowChatSupport(false)} 
          />
        )}
        
        {showIndicatorDetail && (
          <IndicatorDetailModal 
            isOpen={showIndicatorDetail} 
            onClose={() => setShowIndicatorDetail(false)} 
            indicatorType={selectedIndicator}
          />
        )}
        
        {showAIReport && (
          <AIReportModal 
            isOpen={showAIReport} 
            onClose={() => setShowAIReport(false)} 
          />
        )}

        {showAIAssistant && (
          <EnhancedAIAssistantModal 
            isOpen={showAIAssistant} 
            onClose={() => setShowAIAssistant(false)} 
          />
        )}

        {showAIEvolution && (
          <AIEvolutionModal 
            isOpen={showAIEvolution} 
            onClose={() => setShowAIEvolution(false)} 
          />
        )}

        {showAIAnalysis && (
          <AIAnalysisModal 
            isOpen={showAIAnalysis} 
            onClose={() => setShowAIAnalysis(false)} 
            analysisType="complaint-trend"
          />
        )}

        {showPredictionModel && (
          <PredictionModelModal 
            isOpen={showPredictionModel} 
            onClose={() => setShowPredictionModel(false)} 
          />
        )}

        {showEnterpriseChain && (
          <EnterpriseChainModal 
            isOpen={showEnterpriseChain} 
            onClose={() => setShowEnterpriseChain(false)} 
          />
        )}

        {showUnifiedAI && aiAnalysisData && (
          <UnifiedAIAnalysisModal 
            isOpen={showUnifiedAI} 
            onClose={() => setShowUnifiedAI(false)} 
            title="智能分析报告"
            data={aiAnalysisData}
          />
        )}

        {showPushManagement && (
          <PushManagementModal 
            isOpen={showPushManagement} 
            onClose={() => setShowPushManagement(false)}
            onPush={(pushData) => {
              setPushedDataList(prev => [pushData, ...prev]);
              setShowPushManagement(false);
            }}
          />
        )}

        {showWorkbench && (
          <BusinessWorkbenchModal 
            isOpen={showWorkbench} 
            onClose={() => setShowWorkbench(false)}
            pushedData={pushedDataList}
          />
        )}
      </AnimatePresence>
    </div>
  );
}