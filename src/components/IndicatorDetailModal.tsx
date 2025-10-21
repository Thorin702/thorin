import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, BarChart, Bar
} from 'recharts';

interface IndicatorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  indicatorType: string;
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

// 场景数据定义
const getScenarioData = (type: string) => {
  const scenariosMap: { [key: string]: any } = {
    'policy-direct': {
      title: '政策直达',
      lifecycle: '初创期',
      icon: 'fa-rocket',
      color: 'blue',
      description: '为初创企业提供政策咨询、资金申请、证照办理等一站式服务',
      primaryIndicators: [
        {
          name: '企业诉求多样性',
          secondaryIndicators: [
            {
              name: '企业增长与资源配比率',
              value: '2.3',
              unit: '工单/万元',
              trend: '+5.2%',
              description: '通过企业营业额、产值和毛利综合衡量企业增长情况，计算单位企业增长的工单诉求数',
              calculation: '企业增长与资源配比率 = 工单诉求总数 / (企业营业额 + 产值 + 毛利)',
              formula: '156工单 / (45万营业额 + 15万产值 + 8万毛利) = 2.3工单/万元',
              data: [
                { month: '1月', tickets: 120, revenue: 35, output: 12, profit: 6, ratio: 2.3 },
                { month: '2月', tickets: 135, revenue: 40, output: 14, profit: 7, ratio: 2.2 },
                { month: '3月', tickets: 156, revenue: 45, output: 15, profit: 8, ratio: 2.3 }
              ],
              aiAnalysis: {
                anomalies: ['检测到3月15日工单量异常激增至180件，超出正常范围15%'],
                patterns: ['企业营业额与工单量呈正相关关系，相关系数0.82'],
                predictions: ['预测下月工单量将达到170件，配比率稳定在2.4'],
                recommendations: ['建议优化政策咨询流程，建立企业成长档案，提供个性化服务']
              }
            },
            {
              name: '高净值企业投诉占比',
              value: '15.6',
              unit: '%',
              trend: '-2.1%',
              description: '高净值企业投诉工单占总工单比例',
              calculation: '高净值企业投诉占比 = 高净值企业投诉工单数 / 总工单数 × 100%',
              formula: '234工单 / 1500总工单 × 100% = 15.6%',
              data: [
                { month: '1月', highValue: 280, total: 1800, ratio: 15.6 },
                { month: '2月', highValue: 265, total: 1750, ratio: 15.1 },
                { month: '3月', highValue: 234, total: 1500, ratio: 15.6 }
              ],
              aiAnalysis: {
                anomalies: ['高净值企业投诉在2月20日异常下降至180件，需关注服务变化'],
                patterns: ['高净值企业投诉与政策调整周期高度相关，滞后7-14天'],
                predictions: ['预测下月高净值企业投诉占比将降至14.2%'],
                recommendations: ['建立高净值企业专属服务通道，提升响应速度和服务质量']
              }
            },
            {
              name: '多元化需求匹配率',
              value: '78.4',
              unit: '%',
              trend: '+3.7%',
              description: '统计单个投诉中涉及事项数量，反映诉求需求复杂性',
              calculation: '多元化需求匹配率 = 涉及多事项的投诉数 / 总投诉数 × 100%',
              formula: '1176多事项投诉 / 1500总投诉 × 100% = 78.4%',
              data: [
                { month: '1月', multiIssue: 1200, total: 1800, ratio: 66.7 },
                { month: '2月', multiIssue: 1313, total: 1750, ratio: 75.0 },
                { month: '3月', multiIssue: 1176, total: 1500, ratio: 78.4 }
              ],
              aiAnalysis: {
                anomalies: ['3月10日多元化需求匹配率突增至85.2%，超出正常波动范围'],
                patterns: ['多元化需求与企业发展阶段密切相关，成长期企业需求最复杂'],
                predictions: ['预测下月多元化需求匹配率将提升至82.1%'],
                recommendations: ['建立需求分类标签体系，提升复杂诉求处理效率']
              }
            }
          ]
        },
        {
          name: '外部环境复杂性',
          secondaryIndicators: [
            {
              name: '产业政策相关诉求增长率',
              value: '12.8',
              unit: '%',
              trend: '+8.3%',
              description: '分析诉求内容文本，计算与产业政策调整相关工单数量环比',
              calculation: '产业政策相关诉求增长率 = (本月产业政策相关诉求数 - 上月诉求数) / 上月诉求数 × 100%',
              formula: '(180 - 160) / 160 × 100% = 12.8%',
              data: [
                { month: '1月', policyRelated: 140, growth: 0 },
                { month: '2月', policyRelated: 160, growth: 14.3 },
                { month: '3月', policyRelated: 180, growth: 12.8 }
              ],
              aiAnalysis: {
                anomalies: ['产业政策诉求在3月20日激增至220件，与政策发布时间高度吻合'],
                patterns: ['政策发布后7-14天内相关诉求量显著上升，平均增幅15-25%'],
                predictions: ['预测下月产业政策相关诉求将达到200件'],
                recommendations: ['建立政策发布预警机制，提前准备政策解读和咨询服务']
              }
            },
            {
              name: '财税政策相关投诉增长率',
              value: '9.2',
              unit: '%',
              trend: '+4.1%',
              description: '分析诉求内容文本，计算与财税政策调整相关工单数量环比',
              calculation: '财税政策相关投诉增长率 = (本月财税政策相关投诉数 - 上月投诉数) / 上月投诉数 × 100%',
              formula: '(120 - 110) / 110 × 100% = 9.2%',
              data: [
                { month: '1月', taxRelated: 95, growth: 0 },
                { month: '2月', taxRelated: 110, growth: 15.8 },
                { month: '3月', taxRelated: 120, growth: 9.2 }
              ],
              aiAnalysis: {
                anomalies: ['财税政策投诉在3月15日异常激增至150件，需要重点关注'],
                patterns: ['财税政策调整与投诉量变化存在2-3周滞后效应'],
                predictions: ['预测下月财税政策相关投诉将增长至135件'],
                recommendations: ['加强财税政策宣传解读，建立政策咨询快速响应机制']
              }
            },
            {
              name: '紧急公共事件相关投诉增长率',
              value: '6.5',
              unit: '%',
              trend: '+1.8%',
              description: '分析诉求内容文本，计算与紧急公共事件相关工单数量环比',
              calculation: '紧急公共事件相关投诉增长率 = (本月紧急事件相关投诉数 - 上月投诉数) / 上月投诉数 × 100%',
              formula: '(65 - 61) / 61 × 100% = 6.5%',
              data: [
                { month: '1月', emergency: 58, growth: 0 },
                { month: '2月', emergency: 61, growth: 5.2 },
                { month: '3月', emergency: 65, growth: 6.5 }
              ],
              aiAnalysis: {
                anomalies: ['紧急事件投诉在3月8日突增至85件，可能与突发事件相关'],
                patterns: ['紧急事件投诉与媒体报道热度呈正相关，滞后1-3天'],
                predictions: ['预测下月紧急事件相关投诉将稳定在68件左右'],
                recommendations: ['建立突发事件应急响应机制，提升紧急诉求处理速度']
              }
            }
          ]
        }
      ]
    },
    'industry-collaboration': {
      title: '产业协同',
      lifecycle: '成长期',
      icon: 'fa-sync-alt',
      color: 'green',
      description: '促进成长期企业跨部门协作，提升产业协同效率',
      primaryIndicators: [
        {
          name: '业务协同与效率提升',
          secondaryIndicators: [
            {
              name: '办理时长优化率',
              value: '18.7',
              unit: '%',
              trend: '+12.3%',
              description: '工单成功办结时长环比',
              calculation: '办理时长优化率 = (上月平均办理时长 - 本月平均办理时长) / 上月平均办理时长 × 100%',
              formula: '(3.2小时 - 2.6小时) / 3.2小时 × 100% = 18.7%',
              data: [
                { month: '1月', avgTime: 3.8, optimized: 0 },
                { month: '2月', avgTime: 3.2, optimized: 15.8 },
                { month: '3月', avgTime: 2.6, optimized: 18.7 }
              ],
              aiAnalysis: {
                anomalies: ['办理时长在3月20日异常延长至3.1小时，需要关注处理效率'],
                patterns: ['办理时长与工单复杂度呈正相关，复杂工单平均处理时间增加40%'],
                predictions: ['预测下月平均办理时长将进一步缩短至2.3小时'],
                recommendations: ['优化工单分配算法，提升处理人员技能培训，减少处理时间']
              }
            },
            {
              name: '流程效率提升',
              value: '92.1',
              unit: '%',
              trend: '+5.6%',
              description: '派单准确率；根据退单情况，统计各部门退单数量，分析退单内容，可视化服务堵点',
              calculation: '流程效率提升 = (1 - 退单率) × 100%',
              formula: '(1 - 7.9%) × 100% = 92.1%',
              data: [
                { month: '1月', returnRate: 12.5, efficiency: 87.5 },
                { month: '2月', returnRate: 9.8, efficiency: 90.2 },
                { month: '3月', returnRate: 7.9, efficiency: 92.1 }
              ],
              aiAnalysis: {
                anomalies: ['退单率在3月15日异常上升至12.3%，主要是政策解读类工单'],
                patterns: ['退单率与工单分类准确性高度相关，分类错误导致退单率增加60%'],
                predictions: ['预测下月流程效率将提升至94.5%'],
                recommendations: ['完善工单分类标准，建立智能派单系统，减少人工错误']
              }
            },
            {
              name: '多部门协同性',
              value: '76.8',
              unit: '%',
              trend: '+8.9%',
              description: '需多部门协同工单占比，并统计成功协同处理及总结每月一题数量',
              calculation: '多部门协同性 = 成功协同处理工单数 / 需多部门协同工单总数 × 100%',
              formula: '384成功协同 / 500需协同工单 × 100% = 76.8%',
              data: [
                { month: '1月', needCollaboration: 450, success: 315, ratio: 70.0 },
                { month: '2月', needCollaboration: 480, success: 360, ratio: 75.0 },
                { month: '3月', needCollaboration: 500, success: 384, ratio: 76.8 }
              ],
              aiAnalysis: {
                anomalies: ['多部门协同成功率在3月18日下降至68.3%，需要关注协调机制'],
                patterns: ['协同成功率与部门间沟通频率呈正相关，每日沟通增加10%成功率提升5%'],
                predictions: ['预测下月多部门协同性将提升至82.1%'],
                recommendations: ['建立跨部门协同工作台，优化信息流转和任务分配机制']
              }
            }
          ]
        },
        {
          name: '数据驱动与效果验证',
          secondaryIndicators: [
            {
              name: '业务影响数据化',
              value: '89.3',
              unit: '%',
              trend: '+6.2%',
              description: '分产业、分规模统计企业增长情况',
              calculation: '业务影响数据化 = 已数据化统计的企业数 / 总企业数 × 100%',
              formula: '2679企业 / 3000总企业 × 100% = 89.3%',
              data: [
                { month: '1月', total: 2800, digitized: 2352, ratio: 84.0 },
                { month: '2月', total: 2900, digitized: 2544, ratio: 87.7 },
                { month: '3月', total: 3000, digitized: 2679, ratio: 89.3 }
              ],
              aiAnalysis: {
                anomalies: ['数据化覆盖率在3月25日异常下降至85.1%，主要是新增企业数据缺失'],
                patterns: ['数据化覆盖率与企业规模呈正相关，大型企业数据化率接近100%'],
                predictions: ['预测下月业务影响数据化将达到92.1%'],
                recommendations: ['完善企业数据采集机制，建立数据质量监控体系']
              }
            },
            {
              name: '投诉类型调整率',
              value: '14.6',
              unit: '%',
              trend: '+2.8%',
              description: '基于投诉主题（非既有分类）进行统计，计算环比',
              calculation: '投诉类型调整率 = (本月新增投诉类型数 - 上月新增类型数) / 上月新增类型数 × 100%',
              formula: '(23 - 20) / 20 × 100% = 14.6%',
              data: [
                { month: '1月', newTypes: 15, adjustment: 0 },
                { month: '2月', newTypes: 20, adjustment: 33.3 },
                { month: '3月', newTypes: 23, adjustment: 14.6 }
              ],
              aiAnalysis: {
                anomalies: ['投诉类型在3月10日激增8个新类型，主要是新兴业态相关'],
                patterns: ['投诉类型调整与行业发展周期相关，新技术应用带来新投诉类型'],
                predictions: ['预测下月投诉类型调整率将稳定在12.1%'],
                recommendations: ['建立投诉类型动态分类机制，及时更新分类标准']
              }
            },
            {
              name: '服务堵点疏通率',
              value: '82.4',
              unit: '%',
              trend: '+7.1%',
              description: '统计同类退单事项工单环比',
              calculation: '服务堵点疏通率 = (上月同类退单数 - 本月同类退单数) / 上月同类退单数 × 100%',
              formula: '(150 - 132) / 150 × 100% = 12.0%，但实际疏通率为82.4%',
              data: [
                { month: '1月', blocked: 180, resolved: 144, ratio: 80.0 },
                { month: '2月', blocked: 150, resolved: 123, ratio: 82.0 },
                { month: '3月', blocked: 132, resolved: 109, ratio: 82.4 }
              ],
              aiAnalysis: {
                anomalies: ['服务堵点在3月15日异常增加至165个，主要是政策解读类问题'],
                patterns: ['服务堵点与政策变化周期高度相关，政策调整后堵点增加30%'],
                predictions: ['预测下月服务堵点疏通率将提升至87.2%'],
                recommendations: ['建立服务堵点预警机制，提前识别和处理潜在问题']
              }
            }
          ]
        }
      ]
    },
    'precision-service': {
      title: '精准服务',
      lifecycle: '成熟期',
      icon: 'fa-bullseye',
      color: 'purple',
      description: '为成熟期企业提供精准化、个性化服务解决方案',
      primaryIndicators: [
        {
          name: '综合业务影响评估',
          secondaryIndicators: [
            {
              name: '同类型投诉减少率',
              value: '23.5',
              unit: '%',
              trend: '+15.7%',
              description: '基于投诉事项，计算同类事项工单环比',
              calculation: '同类型投诉减少率 = (上月同类投诉数 - 本月同类投诉数) / 上月同类投诉数 × 100%',
              formula: '(450 - 344) / 450 × 100% = 23.5%',
              data: [
                { month: '1月', sameType: 520, reduced: 0 },
                { month: '2月', sameType: 450, reduced: 13.5 },
                { month: '3月', sameType: 344, reduced: 23.5 }
              ],
              aiAnalysis: {
                anomalies: ['同类型投诉在3月8日异常增加至380件，主要是政策咨询类'],
                patterns: ['同类型投诉减少率与服务质量提升呈正相关，服务改进后投诉减少40%'],
                predictions: ['预测下月同类型投诉将进一步减少至280件'],
                recommendations: ['建立投诉预防机制，针对高频投诉类型提供主动服务']
              }
            },
            {
              name: '响应速度提升率',
              value: '31.2',
              unit: '%',
              trend: '+9.8%',
              description: '响应率与响应时长综合计算',
              calculation: '响应速度提升率 = 响应率 × (1 - 平均响应时长/标准响应时长) × 100%',
              formula: '95% × (1 - 1.2小时/2小时) × 100% = 31.2%',
              data: [
                { month: '1月', responseRate: 88, avgTime: 2.5, standard: 2.0, improvement: 20.0 },
                { month: '2月', responseRate: 92, avgTime: 1.8, standard: 2.0, improvement: 27.6 },
                { month: '3月', responseRate: 95, avgTime: 1.2, standard: 2.0, improvement: 31.2 }
              ],
              aiAnalysis: {
                anomalies: ['响应时长在3月12日异常延长至2.1小时，需要关注处理能力'],
                patterns: ['响应速度与人员配置和工作负载呈负相关，负载增加20%响应时间增加15%'],
                predictions: ['预测下月响应速度提升率将达到35.8%'],
                recommendations: ['优化人员配置，建立智能调度系统，提升响应效率']
              }
            },
            {
              name: '满意度提升率',
              value: '95.8',
              unit: '%',
              trend: '+3.4%',
              description: '结合两类满意率数据：1. 线上渠道12345接诉即办满意率统计；2. 统计企业主观满意率',
              calculation: '满意度提升率 = (线上满意率 × 0.6 + 企业主观满意率 × 0.4)',
              formula: '96.5% × 0.6 + 94.5% × 0.4 = 95.8%',
              data: [
                { month: '1月', online: 92.0, subjective: 90.5, combined: 91.4 },
                { month: '2月', online: 94.2, subjective: 92.8, combined: 93.6 },
                { month: '3月', online: 96.5, subjective: 94.5, combined: 95.8 }
              ],
              aiAnalysis: {
                anomalies: ['企业主观满意度在3月20日异常下降至91.2%，需要关注服务质量'],
                patterns: ['满意度与问题解决时长呈负相关，解决时间每增加1小时满意度下降2%'],
                predictions: ['预测下月满意度提升率将达到97.2%'],
                recommendations: ['建立客户满意度实时监控机制，及时处理不满意反馈']
              }
            }
          ]
        }
      ]
    },
    'risk-governance': {
      title: '风险治理',
      lifecycle: '全周期风险',
      icon: 'fa-shield-alt',
      color: 'red',
      description: '全生命周期风险识别、预警和治理机制',
      primaryIndicators: [
        {
          name: '风险预警与防控',
          secondaryIndicators: [
            {
              name: '风险识别准确率',
              value: '94.2',
              unit: '%',
              trend: '+2.6%',
              description: 'AI识别潜在风险事件的准确率',
              calculation: '风险识别准确率 = 正确识别的风险事件数 / 实际风险事件总数 × 100%',
              formula: '471正确识别 / 500实际风险 × 100% = 94.2%',
              data: [
                { month: '1月', actual: 480, identified: 451, accuracy: 93.9 },
                { month: '2月', actual: 490, identified: 460, accuracy: 93.9 },
                { month: '3月', actual: 500, identified: 471, accuracy: 94.2 }
              ],
              aiAnalysis: {
                anomalies: ['风险识别准确率在3月15日异常下降至89.3%，主要是新型风险模式'],
                patterns: ['风险识别准确率与历史数据质量呈正相关，数据质量提升10%准确率提升3%'],
                predictions: ['预测下月风险识别准确率将提升至95.8%'],
                recommendations: ['完善AI风险识别算法，增加新型风险模式训练数据']
              }
            },
            {
              name: '预警响应及时率',
              value: '96.8',
              unit: '%',
              trend: '+4.3%',
              description: '风险预警后及时响应的比例',
              calculation: '预警响应及时率 = 及时响应的预警数 / 总预警数 × 100%',
              formula: '484及时响应 / 500总预警 × 100% = 96.8%',
              data: [
                { month: '1月', total: 480, timely: 451, rate: 93.9 },
                { month: '2月', total: 490, timely: 470, rate: 95.9 },
                { month: '3月', total: 500, timely: 484, rate: 96.8 }
              ],
              aiAnalysis: {
                anomalies: ['预警响应在3月18日异常延迟，16个预警超时响应'],
                patterns: ['预警响应及时率与预警级别呈正相关，高级别预警响应率接近100%'],
                predictions: ['预测下月预警响应及时率将达到98.1%'],
                recommendations: ['建立预警响应分级机制，优化响应流程和人员配置']
              }
            },
            {
              name: '风险化解成功率',
              value: '87.5',
              unit: '%',
              trend: '+6.9%',
              description: '已识别风险事件成功化解的比例',
              calculation: '风险化解成功率 = 成功化解的风险事件数 / 已识别风险事件总数 × 100%',
              formula: '412成功化解 / 471已识别 × 100% = 87.5%',
              data: [
                { month: '1月', identified: 451, resolved: 383, rate: 84.9 },
                { month: '2月', identified: 460, resolved: 401, rate: 87.2 },
                { month: '3月', identified: 471, resolved: 412, rate: 87.5 }
              ],
              aiAnalysis: {
                anomalies: ['风险化解成功率在3月22日异常下降至82.1%，主要是系统性风险'],
                patterns: ['风险化解成功率与风险类型相关，技术风险化解率最高达95%'],
                predictions: ['预测下月风险化解成功率将提升至89.3%'],
                recommendations: ['建立风险分类化解机制，针对不同类型风险制定专门应对策略']
              }
            }
          ]
        },
        {
          name: '全周期监控',
          secondaryIndicators: [
            {
              name: '企业生命周期覆盖率',
              value: '98.6',
              unit: '%',
              trend: '+1.2%',
              description: '覆盖企业全生命周期的监控比例',
              calculation: '企业生命周期覆盖率 = 已覆盖生命周期的企业数 / 总企业数 × 100%',
              formula: '2958已覆盖 / 3000总企业 × 100% = 98.6%',
              data: [
                { month: '1月', total: 2800, covered: 2744, rate: 98.0 },
                { month: '2月', total: 2900, covered: 2851, rate: 98.3 },
                { month: '3月', total: 3000, covered: 2958, rate: 98.6 }
              ],
              aiAnalysis: {
                anomalies: ['生命周期覆盖率在3月25日异常下降至97.1%，主要是新增企业未及时录入'],
                patterns: ['覆盖率与企业规模呈正相关，大型企业覆盖率接近100%'],
                predictions: ['预测下月企业生命周期覆盖率将达到99.1%'],
                recommendations: ['建立企业生命周期自动更新机制，确保新增企业及时纳入监控']
              }
            },
            {
              name: '跨阶段风险传导率',
              value: '12.4',
              unit: '%',
              trend: '-3.7%',
              description: '风险在不同生命周期阶段传导的比例',
              calculation: '跨阶段风险传导率 = 跨阶段传导的风险事件数 / 总风险事件数 × 100%',
              formula: '62跨阶段传导 / 500总风险 × 100% = 12.4%',
              data: [
                { month: '1月', total: 480, crossStage: 77, rate: 16.0 },
                { month: '2月', total: 490, crossStage: 69, rate: 14.1 },
                { month: '3月', total: 500, crossStage: 62, rate: 12.4 }
              ],
              aiAnalysis: {
                anomalies: ['跨阶段风险传导率在3月10日异常上升至18.5%，需要关注风险控制'],
                patterns: ['跨阶段传导率与风险管理机制强度呈负相关，机制完善后传导率下降'],
                predictions: ['预测下月跨阶段风险传导率将降至10.2%'],
                recommendations: ['加强跨阶段风险隔离机制，建立风险传导阻断系统']
              }
            },
            {
              name: '系统性风险预警率',
              value: '89.1',
              unit: '%',
              trend: '+5.8%',
              description: '系统性风险的预警准确率',
              calculation: '系统性风险预警率 = 正确预警的系统性风险数 / 实际系统性风险数 × 100%',
              formula: '49正确预警 / 55实际系统性风险 × 100% = 89.1%',
              data: [
                { month: '1月', actual: 60, warned: 51, rate: 85.0 },
                { month: '2月', actual: 58, warned: 50, rate: 86.2 },
                { month: '3月', actual: 55, warned: 49, rate: 89.1 }
              ],
              aiAnalysis: {
                anomalies: ['系统性风险预警在3月15日出现2个漏报，需要关注预警系统'],
                patterns: ['系统性风险预警率与宏观经济指标变化高度相关'],
                predictions: ['预测下月系统性风险预警率将提升至91.5%'],
                recommendations: ['完善系统性风险监测体系，建立宏观经济关联分析模型']
              }
            }
          ]
        }
      ]
    }
  };

  return scenariosMap[type] || scenariosMap['policy-direct'];
};

const IndicatorDetailModal = ({ isOpen, onClose, indicatorType }: IndicatorDetailModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPrimaryIndicator, setSelectedPrimaryIndicator] = useState<string | null>(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  const scenarioData = getScenarioData(indicatorType);

  const getStatusColor = (trend: string) => {
    if (trend.startsWith('+')) return 'text-green-400';
    if (trend.startsWith('-')) return 'text-red-400';
    return 'text-gray-400';
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
            {/* Header */}
            <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-${scenarioData.color}-500/20 flex items-center justify-center`}>
                  <i className={`fa-solid ${scenarioData.icon} text-${scenarioData.color}-400 text-xl`}></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{scenarioData.title}</h2>
                  <p className="text-gray-400">{scenarioData.description}</p>
                  <p className="text-sm text-gray-500">生命周期：{scenarioData.lifecycle}</p>
                </div>
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
                <i className="fa-solid fa-chart-pie mr-2"></i>概览
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === 'indicators' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('indicators')}
              >
                <i className="fa-solid fa-list mr-2"></i>指标详情
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${activeTab === 'analysis' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('analysis')}
              >
                <i className="fa-solid fa-brain mr-2"></i>AI分析
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(95vh-140px)] overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">场景概览</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {scenarioData.primaryIndicators.map((primaryIndicator: any, index: number) => (
                      <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                        <h4 className="text-lg font-semibold text-white mb-4">{primaryIndicator.name}</h4>
                        <div className="space-y-3">
                          {primaryIndicator.secondaryIndicators.map((secondary: any, sIndex: number) => (
                            <div key={sIndex} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-medium text-white">{secondary.name}</h5>
                                <span className={`text-xs px-2 py-1 rounded-full bg-gray-600/50 ${getStatusColor(secondary.trend)}`}>
                                  {secondary.trend}
                                </span>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl font-bold text-white">{secondary.value}</span>
                                <span className="text-sm text-gray-400">{secondary.unit}</span>
                              </div>
                              <p className="text-xs text-gray-300">{secondary.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'indicators' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">指标详细信息</h3>
                  
                  {scenarioData.primaryIndicators.map((primaryIndicator: any, index: number) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                        {primaryIndicator.name}
                        <button
                          onClick={() => setSelectedPrimaryIndicator(selectedPrimaryIndicator === primaryIndicator.name ? null : primaryIndicator.name)}
                          className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                        >
                          {selectedPrimaryIndicator === primaryIndicator.name ? '收起' : '展开'}
                        </button>
                      </h4>
                      
                      {selectedPrimaryIndicator === primaryIndicator.name && (
                        <div className="space-y-4">
                          {primaryIndicator.secondaryIndicators.map((secondary: any, sIndex: number) => (
                            <div key={sIndex} className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* 基本信息 */}
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h5 className="text-lg font-semibold text-white">{secondary.name}</h5>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-2xl font-bold text-white">{secondary.value}</span>
                                      <span className="text-sm text-gray-400">{secondary.unit}</span>
                                      <span className={`text-xs px-2 py-1 rounded-full bg-gray-600/50 ${getStatusColor(secondary.trend)}`}>
                                        {secondary.trend}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div>
                                      <h6 className="text-sm font-medium text-gray-300 mb-1">指标描述</h6>
                                      <p className="text-sm text-gray-400">{secondary.description}</p>
                                    </div>
                                    
                                    <div>
                                      <h6 className="text-sm font-medium text-gray-300 mb-1">计算公式</h6>
                                      <p className="text-sm text-gray-400 font-mono bg-gray-800/50 p-2 rounded">{secondary.calculation}</p>
                                    </div>
                                    
                                    <div>
                                      <h6 className="text-sm font-medium text-gray-300 mb-1">计算示例</h6>
                                      <p className="text-sm text-gray-400 font-mono bg-gray-800/50 p-2 rounded">{secondary.formula}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* 数据图表 */}
                                <div>
                                  <h6 className="text-sm font-medium text-gray-300 mb-3">趋势变化</h6>
                                  <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <LineChart data={secondary.data}>
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
                                          dataKey={Object.keys(secondary.data[0]).find(key => key !== 'month')} 
                                          stroke={COLORS.primary} 
                                          strokeWidth={2} 
                                          dot={{ r: 4 }}
                                        />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'analysis' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">AI智能分析</h3>
                  
                  {scenarioData.primaryIndicators.map((primaryIndicator: any, index: number) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                      <h4 className="text-lg font-semibold text-white mb-4">{primaryIndicator.name} - AI分析</h4>
                      
                      <div className="space-y-4">
                        {primaryIndicator.secondaryIndicators.map((secondary: any, sIndex: number) => (
                          <div key={sIndex} className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
                            <h5 className="text-md font-semibold text-white mb-4 flex items-center">
                              {secondary.name}
                              <button
                                onClick={() => setShowAIAnalysis(true)}
                                className="ml-auto flex items-center space-x-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                              >
                                <i className="fa-solid fa-robot"></i>
                                <span className="text-sm">获取实时AI分析</span>
                              </button>
                            </h5>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* 异常检测 */}
                              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                                <h6 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
                                  <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                                  异常检测
                                </h6>
                                {secondary.aiAnalysis.anomalies.map((anomaly: string, aIndex: number) => (
                                  <p key={aIndex} className="text-xs text-gray-300 mb-1">{anomaly}</p>
                                ))}
                              </div>

                              {/* 模式识别 */}
                              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                                <h6 className="text-sm font-semibold text-blue-400 mb-2 flex items-center">
                                  <i className="fa-solid fa-brain mr-2"></i>
                                  模式识别
                                </h6>
                                {secondary.aiAnalysis.patterns.map((pattern: string, pIndex: number) => (
                                  <p key={pIndex} className="text-xs text-gray-300 mb-1">{pattern}</p>
                                ))}
                              </div>

                              {/* 趋势预测 */}
                              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                                <h6 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                                  <i className="fa-solid fa-crystal-ball mr-2"></i>
                                  趋势预测
                                </h6>
                                {secondary.aiAnalysis.predictions.map((prediction: string, prIndex: number) => (
                                  <p key={prIndex} className="text-xs text-gray-300 mb-1">{prediction}</p>
                                ))}
                              </div>

                              {/* 优化建议 */}
                              <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                                <h6 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center">
                                  <i className="fa-solid fa-lightbulb mr-2"></i>
                                  优化建议
                                </h6>
                                {secondary.aiAnalysis.recommendations.map((recommendation: string, rIndex: number) => (
                                  <p key={rIndex} className="text-xs text-gray-300 mb-1">{recommendation}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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
};

export default IndicatorDetailModal;