import { motion } from 'framer-motion';
import { useState } from 'react';

interface PushManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPush?: (pushData: any) => void;
}

export default function PushManagementModal({ isOpen, onClose, onPush }: PushManagementModalProps) {
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [pushFrequency, setPushFrequency] = useState('daily');

  if (!isOpen) return null;

  // 基层单位列表
  const units = [
    { id: '1', name: '亦企服务港', category: '服务平台', pendingIssues: 23, description: '企业服务综合平台' },
    { id: '2', name: '产业社区', category: '社区单位', pendingIssues: 18, description: '产业园区社区服务' },
    { id: '3', name: '服务管家', category: '服务团队', pendingIssues: 31, description: '企业专属服务团队' },
    { id: '4', name: '荣华街道', category: '街道办', pendingIssues: 15, description: '荣华街道办事处' },
    { id: '5', name: '博兴街道', category: '街道办', pendingIssues: 12, description: '博兴街道办事处' },
  ];

  // 可推送的报告类型
  const reportTypes = [
    { id: 'daily', name: '每日诉求概览', description: '包含当日新增诉求、处理进度、待办事项' },
    { id: 'weekly', name: '周度分析报告', description: '本周诉求趋势、热点问题、处理效率分析' },
    { id: 'monthly', name: '月度综合报告', description: '月度数据总结、问题分类、改进建议' },
    { id: 'alert', name: '风险预警通知', description: '异常诉求、高频问题、紧急事项预警' },
    { id: 'enterprise', name: '企业画像分析', description: '重点企业动态、产业链分析、协同机会' },
  ];

  const handleSelectUnit = (unitId: string) => {
    setSelectedUnits(prev => 
      prev.includes(unitId) 
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const handleSelectReport = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handlePushNow = () => {
    if (selectedUnits.length === 0 || selectedReports.length === 0) {
      return;
    }

    // 生成推送的真实数据
    const pushData = {
      timestamp: new Date().toISOString(),
      units: selectedUnits.map(unitId => {
        const unit = units.find(u => u.id === unitId);
        return unit;
      }),
      reports: selectedReports.map(reportId => {
        const report = reportTypes.find(r => r.id === reportId);
        return report;
      }),
      frequency: pushFrequency,
      totalIssues: selectedUnits.reduce((acc, id) => {
        const unit = units.find(u => u.id === id);
        return acc + (unit?.pendingIssues || 0);
      }, 0),
    };

    // 调用父组件传入的回调函数
    if (onPush) {
      onPush(pushData);
    }

    alert(`✅ 督办成功！\n已向 ${selectedUnits.length} 个单位发起柔性督办\n督办内容：${selectedReports.length} 类数据报告\n涉及事项：${pushData.totalIssues} 个\n\n基层单位可在"自主治理工作台"中查看督办详情！`);
  };

  const handleSchedulePush = () => {
    if (selectedUnits.length === 0 || selectedReports.length === 0) {
      return;
    }

    const frequencyText = 
      pushFrequency === 'realtime' ? '实时督办' :
      pushFrequency === 'daily' ? '每日 09:00' :
      pushFrequency === 'weekly' ? '每周一 09:00' :
      '每月1号 09:00';

    alert(`✅ 定时督办已设置！\n督办频率：${frequencyText}\n督办单位：${selectedUnits.length} 个\n督办内容：${selectedReports.length} 类报告`);
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
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <i className="fa-solid fa-tasks mr-3"></i>
              柔性督办管理平台
            </h2>
            <p className="text-sm text-green-100 mt-1">通过数据分析精准督办，以服务促治理，推动基层单位主动作为</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：选择推送单位 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <i className="fa-solid fa-building text-blue-600 mr-2"></i>
                  选择督办单位
                </h3>
                <span className="text-sm text-gray-600">已选择 {selectedUnits.length} 个</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <i className="fa-solid fa-info-circle text-blue-600 mt-0.5"></i>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">柔性督办说明</p>
                    <p className="text-xs">选择需要督办的基层单位，系统将通过数据分析精准推送督办事项，以数据为依据、以服务为导向，推动基层单位主动发现问题、及时解决问题。</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {units.map(unit => (
                  <div
                    key={unit.id}
                    onClick={() => handleSelectUnit(unit.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedUnits.includes(unit.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          selectedUnits.includes(unit.id)
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedUnits.includes(unit.id) && (
                            <i className="fa-solid fa-check text-white text-xs"></i>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 mb-1">{unit.name}</div>
                          <div className="text-xs text-gray-500 mb-1">{unit.category}</div>
                          <div className="text-xs text-gray-600">{unit.description}</div>
                        </div>
                      </div>
                      <div className="text-right ml-3 flex-shrink-0">
                        <div className="text-sm font-semibold text-orange-600">{unit.pendingIssues}</div>
                        <div className="text-xs text-gray-500">待办</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  if (selectedUnits.length === units.length) {
                    setSelectedUnits([]);
                  } else {
                    setSelectedUnits(units.map(u => u.id));
                  }
                }}
                className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {selectedUnits.length === units.length ? '取消全选' : '全选'}
              </button>
            </div>

            {/* 右侧：选择报告类型和推送设置 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <i className="fa-solid fa-file-chart-line text-purple-600 mr-2"></i>
                  选择督办内容
                </h3>
                <span className="text-sm text-gray-600">已选择 {selectedReports.length} 类</span>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {reportTypes.map(report => (
                  <div
                    key={report.id}
                    onClick={() => handleSelectReport(report.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedReports.includes(report.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        selectedReports.includes(report.id)
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedReports.includes(report.id) && (
                          <i className="fa-solid fa-check text-white text-xs"></i>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{report.name}</div>
                        <div className="text-xs text-gray-600 mt-1">{report.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 督办频率设置 */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">督办频率设置</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'realtime', label: '实时督办', icon: 'fa-bolt' },
                    { value: 'daily', label: '每日督办', icon: 'fa-calendar-day' },
                    { value: 'weekly', label: '每周督办', icon: 'fa-calendar-week' },
                    { value: 'monthly', label: '每月督办', icon: 'fa-calendar' },
                  ].map(freq => (
                    <button
                      key={freq.value}
                      onClick={() => setPushFrequency(freq.value)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        pushFrequency === freq.value
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                      }`}
                    >
                      <i className={`fa-solid ${freq.icon} mr-2`}></i>
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 督办预览 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <i className="fa-solid fa-eye text-amber-600 mr-2"></i>
                  督办预览
                </h4>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• 督办单位：{selectedUnits.length} 个基层单位</p>
                  <p>• 督办内容：{selectedReports.length} 类数据报告</p>
                  <p>• 督办频率：{
                    pushFrequency === 'realtime' ? '实时督办' :
                    pushFrequency === 'daily' ? '每日 09:00' :
                    pushFrequency === 'weekly' ? '每周一 09:00' :
                    '每月1号 09:00'
                  }</p>
                  <p className="text-amber-700 font-medium mt-2">
                    预计督办 {selectedUnits.reduce((acc, id) => {
                      const unit = units.find(u => u.id === id);
                      return acc + (unit?.pendingIssues || 0);
                    }, 0)} 个待办事项
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 底部操作按钮 */}
          <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">
              <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>
              提示：柔性督办强调服务与督导并重，基层单位可在自主治理工作台实时查看督办内容
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSchedulePush}
                disabled={selectedUnits.length === 0 || selectedReports.length === 0}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <i className="fa-solid fa-clock"></i>
                <span>设置定时督办</span>
              </button>
              <button
                onClick={handlePushNow}
                disabled={selectedUnits.length === 0 || selectedReports.length === 0}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg font-medium transition-all flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <i className="fa-solid fa-tasks"></i>
                <span>立即督办</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


