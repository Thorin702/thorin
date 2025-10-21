import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReportSection {
  title: string;
  content: string;
  type: 'summary' | 'analysis' | 'recommendation' | 'trend';
  icon: string;
  color: string;
}

export default function AIReportModal({ isOpen, onClose }: AIReportModalProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [reportData, setReportData] = useState<ReportSection[]>([]);

  const generateReport = () => {
    const sections: ReportSection[] = [
      {
        title: '执行摘要',
        content: '根据最新数据分析，企业接诉即办系统整体运行良好，投诉处理效率持续提升。本月共处理投诉1,247件，解决率95.3%，平均响应时间2.3小时，较上月提升5.2%。客户满意度达到95.3%，创历史新高。',
        type: 'summary',
        icon: 'fa-chart-line',
        color: 'text-blue-400'
      },
      {
        title: '关键发现',
        content: '1. 产品质量类投诉占比35%，为主要投诉类型，但处理满意度较高\n2. 技术部门响应速度最快，平均1.8小时响应\n3. 客服部门处理量最大，但效率仍有提升空间\n4. 重复投诉率降至2.1%，较上月下降0.8%',
        type: 'analysis',
        icon: 'fa-lightbulb',
        color: 'text-yellow-400'
      },
      {
        title: '趋势分析',
        content: '投诉总量呈现下降趋势，6月份较5月份下降12%。客户满意度持续上升，已连续6个月保持增长。处理效率稳步提升，平均解决时间从10.2小时缩短至8.7小时。',
        type: 'trend',
        icon: 'fa-trending-up',
        color: 'text-green-400'
      },
      {
        title: '风险评估',
        content: '当前系统风险等级：低风险\n主要风险点：\n- 高优先级投诉12件，需重点关注\n- 重复投诉8件，需深入分析根本原因\n- 批量问题3件，已制定预防措施',
        type: 'analysis',
        icon: 'fa-shield-alt',
        color: 'text-red-400'
      },
      {
        title: '改进建议',
        content: '1. 加强产品质量管控，从源头减少投诉\n2. 优化客服流程，提升处理效率\n3. 建立预警机制，提前识别潜在问题\n4. 加强部门协作，缩短处理周期\n5. 定期培训员工，提升服务质量',
        type: 'recommendation',
        icon: 'fa-cogs',
        color: 'text-purple-400'
      },
      {
        title: '预期效果',
        content: '实施改进措施后，预计：\n- 投诉总量可减少15-20%\n- 处理效率提升10-15%\n- 客户满意度达到97%以上\n- 运营成本降低8-12%',
        type: 'recommendation',
        icon: 'fa-target',
        color: 'text-cyan-400'
      }
    ];

    setReportData(sections);
  };

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      setCurrentSection(0);
      generateReport();
      
      // 模拟报告生成过程
      const timer = setTimeout(() => {
        setIsGenerating(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isGenerating && currentSection < reportData.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSection(prev => prev + 1);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isGenerating, currentSection, reportData.length]);

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
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                    <i className="fa-solid fa-robot text-blue-400 mr-3"></i>
                    AI智能分析报告
                  </h2>
                  <p className="text-gray-400">基于实时数据生成的智能分析报告</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fa-solid fa-robot text-blue-400 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">AI正在生成报告</h3>
                    <p className="text-gray-400">正在分析数据并生成智能建议...</p>
                    <div className="mt-4 flex space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 报告概览 */}
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">报告概览</h3>
                      <div className="text-sm text-gray-400">
                        生成时间: {new Date().toLocaleString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">1,247</div>
                        <div className="text-sm text-gray-400">总投诉量</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">95.3%</div>
                        <div className="text-sm text-gray-400">解决率</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">2.3h</div>
                        <div className="text-sm text-gray-400">平均响应</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">+5.2%</div>
                        <div className="text-sm text-gray-400">效率提升</div>
                      </div>
                    </div>
                  </div>

                  {/* 报告章节 */}
                  <div className="space-y-4">
                    {reportData.map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: index <= currentSection ? 1 : 0.3,
                          y: index <= currentSection ? 0 : 20
                        }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`bg-gray-800/50 rounded-xl p-6 border transition-all duration-300 ${
                          index <= currentSection 
                            ? 'border-gray-600/50' 
                            : 'border-gray-700/30 opacity-30'
                        }`}
                      >
                        <div className="flex items-center mb-4">
                          <div className={`w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center mr-4 ${section.color}`}>
                            <i className={`fa-solid ${section.icon}`}></i>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">{section.title}</h4>
                            <div className="text-sm text-gray-400">
                              {section.type === 'summary' && '执行摘要'}
                              {section.type === 'analysis' && '数据分析'}
                              {section.type === 'recommendation' && '改进建议'}
                              {section.type === 'trend' && '趋势分析'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>

                        {index <= currentSection && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex justify-center space-x-4 pt-6">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center">
                      <i className="fa-solid fa-download mr-2"></i>
                      导出报告
                    </button>
                    <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center">
                      <i className="fa-solid fa-share mr-2"></i>
                      分享报告
                    </button>
                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center">
                      <i className="fa-solid fa-sync mr-2"></i>
                      重新生成
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