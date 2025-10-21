import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import TaskDetailModal from './TaskDetailModal';

interface BusinessWorkbenchModalProps {
  isOpen: boolean;
  onClose: () => void;
  pushedData?: any[];
}

export default function BusinessWorkbenchModal({ isOpen, onClose, pushedData = [] }: BusinessWorkbenchModalProps) {
  const [activeTab, setActiveTab] = useState('智能辅助');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  if (!isOpen) return null;
  
  // 从推送数据生成更真实的任务
  const generateTasksFromPush = () => {
    if (!pushedData || pushedData.length === 0) return [];
    
    const tasks: any[] = [];
    pushedData.forEach((push, index) => {
      push.units?.forEach((unit: any) => {
        if (!unit) return;
        push.reports?.forEach((report: any) => {
          if (!report) return;
          tasks.push({
            id: `push-${index}-${unit.id}-${report.id}`,
            title: `【${unit.name}】${report.name}`,
            priority: unit.pendingIssues > 20 ? 'high' : unit.pendingIssues > 10 ? 'medium' : 'low',
            category: '柔性督办',
            description: `来自柔性督办的数据：${report.description}`,
            actions: ['查看详情', '生成报告', '标记已读'],
            deadline: '今天 18:00',
            impact: `${unit.name} - ${unit.pendingIssues}个待办事项`,
            timestamp: push.timestamp,
          });
        });
      });
    });
    return tasks;
  };
  
  const pushedTasks = generateTasksFromPush();

  // 智能推荐任务 - 更真实的数据
  const recommendedTasks = [
    {
      id: 1,
      title: '亦企服务港反馈：政策咨询激增',
      priority: 'high',
      category: '异常预警',
      description: '亦企服务港今日政策咨询量激增67%，主要集中在《中小企业数字化转型补贴政策》相关内容，建议尽快准备标准化解答模板',
      actions: ['制作FAQ', '准备政策解读', '通知窗口人员'],
      deadline: '今天 17:00',
      impact: '涉及服务港38个咨询',
    },
    {
      id: 2,
      title: '荣华街道：企业年报办理高峰',
      priority: 'high',
      category: '趋势预警',
      description: '荣华街道本周企业年报办理量达156件，较上周增长89%，需增派人手协助办理',
      actions: ['调配人员', '开通绿色通道', '延长服务时间'],
      deadline: '明天 10:00',
      impact: '156家企业待办理',
    },
    {
      id: 3,
      title: '博兴街道：重点企业跟进',
      priority: 'medium',
      category: '服务提醒',
      description: '博兴街道辖区内亦庄生物医药园3家重点企业连续2周未回访，建议服务管家主动联系了解需求',
      actions: ['联系企业', '记录需求', '制定服务方案'],
      deadline: '本周五',
      impact: '3家重点企业',
    },
    {
      id: 4,
      title: '产业社区：创新券申请集中期',
      priority: 'medium',
      category: '业务高峰',
      description: '产业社区本月创新券申请已达45件，预计月底将突破60件，建议提前审核以免积压',
      actions: ['加快审核', '预约专家', '通知财政部门'],
      deadline: '本月底',
      impact: '45家企业申请中',
    },
  ];

  // 智能知识库 - 更真实的数据
  const knowledgeBase = [
    { category: '政策解读', count: 156, recent: '《亦庄新区企业数字化转型专项补贴实施细则》解读' },
    { category: '常见问题', count: 234, recent: '企业年报办理、税收减免、创新券申请常见问题汇总' },
    { category: '案例库', count: 89, recent: '亦庄生物医药产业园区企业一站式服务成功案例' },
    { category: '操作指南', count: 67, recent: '服务管家制度实施指南及企业对接流程' },
  ];

  // 我的待办 - 更真实的数据
  const myTasks = [
    { id: 1, title: '【亦企服务港】审批京东方科技公司研发补贴申请', status: '待审批', urgency: 'high', time: '2小时前', unit: '亦企服务港' },
    { id: 2, title: '【荣华街道】回复小米生态链企业税收优惠政策咨询', status: '待处理', urgency: 'high', time: '3小时前', unit: '荣华街道' },
    { id: 3, title: '【产业社区】协调施耐德电气跨部门证照办理', status: '进行中', urgency: 'medium', time: '5小时前', unit: '产业社区' },
    { id: 4, title: '【博兴街道】跟进中芯国际人才引进政策落实', status: '进行中', urgency: 'medium', time: '1天前', unit: '博兴街道' },
    { id: 5, title: '【服务管家】整理本周亦庄经开区企业诉求统计报告', status: '待完成', urgency: 'low', time: '1天前', unit: '服务管家' },
    { id: 6, title: '【亦企服务港】处理字节跳动园区配套设施投诉', status: '待处理', urgency: 'medium', time: '2天前', unit: '亦企服务港' },
  ];

  // 效率数据 - 更真实的数据
  const efficiencyData = [
    { name: '周一', 处理量: 18, 平均时长: 2.4 },
    { name: '周二', 处理量: 23, 平均时长: 2.1 },
    { name: '周三', 处理量: 26, 平均时长: 1.9 },
    { name: '周四', 处理量: 21, 平均时长: 2.2 },
    { name: '周五', 处理量: 19, 平均时长: 2.3 },
  ];

  // 诉求类型分布 - 更真实的数据
  const complaintTypes = [
    { name: '政策咨询', value: 38, color: '#3B82F6' },
    { name: '证照办理', value: 26, color: '#10B981' },
    { name: '补贴申请', value: 21, color: '#8B5CF6' },
    { name: '投诉反馈', value: 15, color: '#F59E0B' },
  ];

  // AI辅助建议 - 更真实的数据
  const aiSuggestions = [
    {
      type: '效率提升',
      icon: 'fa-chart-line',
      color: 'blue',
      title: '优化创新券审批流程',
      description: 'AI分析发现，创新券申请中73%的企业在财务资料环节出现问题，建议提供标准化模板可减少42%的补充材料次数',
      action: '查看优化方案',
    },
    {
      type: '风险预警',
      icon: 'fa-exclamation-triangle',
      color: 'red',
      title: '关注亦庄生物医药园企业服务质量',
      description: '亦庄生物医药园区内3家企业本月连续反馈同类问题（研发用地审批慢），建议服务管家主动对接，可能存在系统性问题',
      action: '安排专项走访',
    },
    {
      type: '知识推荐',
      icon: 'fa-lightbulb',
      color: 'yellow',
      title: '新政策学习提醒',
      description: '《北京经开区促进集成电路产业发展若干措施》刚发布，与您负责的荣华街道12家芯片企业高度相关，建议尽快学习并主动推送',
      action: '学习新政策',
    },
    {
      type: '服务建议',
      icon: 'fa-users',
      color: 'green',
      title: '企业走访计划',
      description: '根据数据分析，服务港本季度重点企业走访覆盖率仅62%，建议本月重点走访京东方、小米、施耐德等15家核心企业',
      action: '制定走访计划',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
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
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <i className="fa-solid fa-house-laptop mr-3"></i>
              自主治理工作台
            </h2>
            <p className="text-sm text-blue-100 mt-1">以数据为支撑、以服务为导向，推动基层单位主动作为、自主治理</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* 标签页 */}
          <div className="flex space-x-2 mb-6 bg-white rounded-lg p-1 shadow-sm">
            {['智能辅助', '我的待办', '知识库', '效率分析'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 智能辅助标签页 */}
          {activeTab === '智能辅助' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI推荐任务 */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fa-solid fa-robot text-purple-600 mr-2"></i>
                    AI智能推荐任务
                    <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">实时更新</span>
                  </div>
                  {pushedTasks.length > 0 && (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      <i className="fa-solid fa-bell mr-1"></i>
                      {pushedTasks.length} 条督办事项
                    </span>
                  )}
                </h3>

                {/* 显示督办的任务 */}
                {pushedTasks.map(task => (
                  <div key={task.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <i className="fa-solid fa-tasks text-green-600"></i>
                          <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                            {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-300">{task.category}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span><i className="fa-solid fa-clock mr-1"></i>{task.deadline}</span>
                          <span><i className="fa-solid fa-chart-bar mr-1"></i>{task.impact}</span>
                          <span className="text-green-600"><i className="fa-solid fa-check-circle mr-1"></i>刚刚督办</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {task.actions.map((action: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (action === '查看详情') {
                              setSelectedTask(task);
                              setShowTaskDetail(true);
                            }
                          }}
                          className="px-3 py-1.5 bg-white hover:bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-medium transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* 显示AI推荐任务 */}
                {recommendedTasks.map(task => (
                  <div key={task.id} className="bg-white rounded-xl p-5 shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                            {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{task.category}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span><i className="fa-solid fa-clock mr-1"></i>{task.deadline}</span>
                          <span><i className="fa-solid fa-chart-bar mr-1"></i>{task.impact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {task.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (action === '查看详情') {
                              setSelectedTask(task);
                              setShowTaskDetail(true);
                            }
                          }}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI辅助建议 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>
                  AI辅助建议
                </h3>

                {aiSuggestions.map((suggestion, idx) => (
                  <div key={idx} className={`bg-${suggestion.color}-50 rounded-xl p-4 border border-${suggestion.color}-200 hover:shadow-md transition-all`}>
                    <div className="flex items-start space-x-3 mb-3">
                      <div className={`w-10 h-10 bg-${suggestion.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <i className={`fa-solid ${suggestion.icon} text-${suggestion.color}-600 text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">{suggestion.type}</div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">{suggestion.title}</h4>
                        <p className="text-xs text-gray-600">{suggestion.description}</p>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium transition-colors border border-gray-200">
                      {suggestion.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 我的待办标签页 */}
          {activeTab === '我的待办' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">待办事项列表</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                    <i className="fa-solid fa-plus mr-2"></i>新建任务
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {myTasks.map(task => (
                  <div key={task.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded hover:border-blue-500 cursor-pointer"></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-base font-medium text-gray-800">{task.title}</h4>
                            <span className={`text-xs font-semibold ${getUrgencyColor(task.urgency)}`}>
                              {task.urgency === 'high' ? '紧急' : task.urgency === 'medium' ? '一般' : '不急'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{task.status}</span>
                            <span><i className="fa-solid fa-clock mr-1"></i>{task.time}</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors">
                        处理
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 知识库标签页 */}
          {activeTab === '知识库' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeBase.map((kb, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">{kb.category}</h4>
                    <span className="text-2xl font-bold text-blue-600">{kb.count}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    <i className="fa-solid fa-file-alt text-blue-500 mr-2"></i>
                    最新：{kb.recent}
                  </p>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors">
                      浏览
                    </button>
                    <button className="flex-1 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg text-sm font-medium transition-colors">
                      搜索
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 效率分析标签页 */}
          {activeTab === '效率分析' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="text-sm text-blue-700 mb-2 font-medium">本周处理量</div>
                  <div className="text-3xl font-bold text-blue-900">107</div>
                  <div className="text-xs text-green-600 mt-1 font-medium">↑ 18% 较上周</div>
                  <div className="text-xs text-gray-500 mt-1">亦企服务港 38 | 街道 69</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                  <div className="text-sm text-green-700 mb-2 font-medium">平均处理时长</div>
                  <div className="text-3xl font-bold text-green-900">2.2h</div>
                  <div className="text-xs text-green-600 mt-1 font-medium">↓ 11% 较上周</div>
                  <div className="text-xs text-gray-500 mt-1">目标：&lt;2.0小时</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                  <div className="text-sm text-purple-700 mb-2 font-medium">企业满意度</div>
                  <div className="text-3xl font-bold text-purple-900">94.8%</div>
                  <div className="text-xs text-green-600 mt-1 font-medium">↑ 2.3% 较上周</div>
                  <div className="text-xs text-gray-500 mt-1">好评 101 | 中评 5 | 差评 1</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <div className="text-sm text-orange-700 mb-2 font-medium">部门排名</div>
                  <div className="text-3xl font-bold text-orange-900">第3名</div>
                  <div className="text-xs text-green-600 mt-1 font-medium">↑ 2名 较上周</div>
                  <div className="text-xs text-gray-500 mt-1">全区12个服务单位</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">本周处理趋势</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Line type="monotone" dataKey="处理量" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">诉求类型分布</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={complaintTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {complaintTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 任务详情模态框 */}
        <AnimatePresence>
          {showTaskDetail && (
            <TaskDetailModal
              isOpen={showTaskDetail}
              onClose={() => setShowTaskDetail(false)}
              task={selectedTask}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}


