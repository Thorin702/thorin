import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

export default function TaskDetailModal({ isOpen, onClose, task }: TaskDetailModalProps) {
  if (!isOpen || !task) return null;

  // 根据任务类型生成详细数据
  const getDetailData = () => {
    // 如果是推送任务（柔性督办），生成通用督办详情数据
    if (task.category === '柔性督办') {
      const unitName = task.impact?.split('-')[0]?.replace(/【|】/g, '') || '相关单位';
      return {
        problemOverview: `通过AI数据分析，发现${unitName}近期出现多项突出问题，需要立即关注和处理。`,
        detailedSituations: [
          {
            title: '政策咨询诉求激增',
            severity: 'high',
            description: `${unitName}服务窗口近3天接到《中小企业数字化转型补贴》相关政策咨询38件，较上周同期增长156%。企业集中询问申请条件、补贴金额、材料清单等问题。`,
            impact: '导致窗口服务压力剧增，企业等待时间延长，可能影响满意度'
          },
          {
            title: '疑难案件处理滞后',
            severity: 'medium',
            description: `发现5件跨部门协同案件已超过标准办理时限，涉及税务、市场监管、规划等多个部门，案件平均办理时长达12天，超出标准时限3天。`,
            impact: '影响企业办事效率，可能引发投诉升级'
          },
          {
            title: '重点企业服务响应不及时',
            severity: 'medium',
            description: `辖区内3家重点企业（京东方、小米智能制造、施耐德电气）连续2周未进行主动回访，企业反馈的配套设施、用地审批等问题未得到及时跟进。`,
            impact: '可能影响重点企业投资信心和营商环境评价'
          }
        ],
        rootCauses: [
          {
            category: '人员配置',
            reason: '窗口服务人员不足，现有6名工作人员难以应对激增的政策咨询需求',
            evidence: '人均日接待量从15件增至23件，增长53%'
          },
          {
            category: '知识储备',
            reason: '新政策发布后未及时组织培训，窗口人员对政策细节掌握不够，需要反复查询确认',
            evidence: '单个咨询平均耗时从8分钟增至15分钟'
          },
          {
            category: '协同机制',
            reason: '跨部门案件缺乏统一协调机制，各部门响应时间不一，信息流转不畅',
            evidence: '5个协同案件中有3个出现部门间推诿或延误'
          },
          {
            category: '服务意识',
            reason: '对重点企业的主动服务意识不强，等待企业上门而非主动走访了解需求',
            evidence: '本月主动走访次数较上月减少60%'
          }
        ],
        recommendations: [
          { 
            title: '立即增派人员支援', 
            priority: 'high',
            content: '从博兴街道、产业社区临时调配2-3名熟悉政策的业务骨干支援窗口，缓解服务压力',
            steps: [
              '今天下午完成人员调配',
              '明天上午到岗并进行业务交接',
              '持续支援至政策咨询高峰期结束（预计2周）'
            ],
            expectedEffect: '日均接待能力提升40%，企业等待时间缩短50%',
            responsible: '人力资源部门、博兴街道'
          },
          { 
            title: '紧急制作政策问答手册', 
            priority: 'high',
            content: '针对《中小企业数字化转型补贴》高频问题，立即制作一页纸FAQ和办理流程图',
            steps: [
              '今天17:00前完成FAQ初稿（政策解读部门）',
              '明天上午印制500份发放（综合部门）',
              '同步在服务港公众号、官网发布电子版'
            ],
            expectedEffect: '减少60%的重复性咨询，提升窗口人员答复效率',
            responsible: '政策解读部门、宣传部门'
          },
          { 
            title: '建立跨部门协同专班', 
            priority: 'high',
            content: '针对5个超时协同案件，立即成立专项工作组，明确牵头部门和办理时限',
            steps: [
              '明天上午召开协调会，各相关部门参加',
              '逐案明确责任部门、协办部门和完成时限',
              '建立日报制度，每日通报进度',
              '本周五前必须完成全部5个案件办理'
            ],
            expectedEffect: '本周内清零超时案件，建立长效协同机制',
            responsible: '综合协调部门、各相关业务部门'
          },
          { 
            title: '启动重点企业专项走访', 
            priority: 'medium',
            content: '立即启动重点企业走访计划，主动了解企业困难和需求',
            steps: [
              '今天制定走访计划和问题清单',
              '本周内完成3家重点企业走访',
              '建立企业问题台账和跟踪机制',
              '每两周至少走访一次重点企业'
            ],
            expectedEffect: '提升企业满意度，及时发现和解决问题',
            responsible: '服务管家团队、企业服务中心'
          }
        ]
      };
    }

    const detailDataMap: any = {
      1: { // 亦企服务港反馈：政策咨询激增
        problemOverview: '通过AI数据分析，发现亦企服务港第二服务窗口近3天政策咨询量激增67%，主要集中在《中小企业数字化转型补贴政策》相关内容，出现明显服务压力。',
        detailedSituations: [
          {
            title: '政策咨询量异常激增',
            severity: 'high',
            description: '亦企服务港第二服务窗口12月6日-9日三天累计接待政策咨询103件，其中《中小企业数字化转型补贴》相关咨询达67件，占比65%。咨询量较上周同期增长156%，远超窗口正常接待能力。',
            impact: '窗口人员加班至晚上8点仍有企业排队等候，企业平均等待时间从15分钟延长至45分钟，已有2家企业在12345热线投诉等待时间过长'
          },
          {
            title: '高频问题重复咨询严重',
            severity: 'high',
            description: '在67件咨询中，"申请条件是什么"（17次）、"补贴金额上限多少"（12次）、"需要准备哪些材料"（9次）、"审批周期多长"（7次）四个问题占比67%，存在大量重复咨询。',
            impact: '窗口人员疲于应对重复问题，无法深入解答企业个性化需求，服务质量下降'
          },
          {
            title: '窗口人员政策掌握不足',
            severity: 'medium',
            description: '政策于12月1日刚发布，窗口6名工作人员中仅2人参加过培训，其他4人对政策细节不熟悉，咨询时需反复查阅文件，单个咨询平均耗时从8分钟增至15分钟。',
            impact: '降低服务效率，企业对窗口专业性产生质疑'
          }
        ],
        rootCauses: [
          {
            category: '政策宣传不到位',
            reason: '新政策发布后未提前做好政策宣传和解读工作，导致企业集中到窗口咨询',
            evidence: '政策公众号阅读量仅230次，远低于预期覆盖的800家企业'
          },
          {
            category: '人员培训滞后',
            reason: '政策培训仅安排1次，参训人员不足，且未制作标准化问答手册',
            evidence: '67%的窗口人员对新政策不熟悉，需要反复查阅文件'
          },
          {
            category: '服务资源准备不足',
            reason: '未预判政策热度，窗口人员配置、宣传资料、FAQ等准备不充分',
            evidence: '窗口无任何宣传资料，企业只能通过咨询获取信息'
          },
          {
            category: '应急预案缺失',
            reason: '缺乏咨询高峰期应急预案，无法快速调配资源应对突发情况',
            evidence: '咨询高峰持续3天，未能及时调配其他人员支援'
          }
        ],
        recommendations: [
          { 
            title: '紧急制作政策问答手册', 
            priority: 'high',
            content: '针对《中小企业数字化转型补贴》高频问题，立即制作一页纸FAQ和办理流程图',
            steps: [
              '今天17:00前完成FAQ初稿（政策解读部门）',
              '明天上午印制500份发放到窗口',
              '同步在亦企服务港公众号、官网发布电子版',
              '制作宣传展架放置在服务大厅'
            ],
            expectedEffect: '减少60%的重复性咨询，企业等待时间缩短50%',
            responsible: '政策解读部门、宣传部门、亦企服务港',
            deadline: '今天17:00前完成'
          },
          { 
            title: '立即增派窗口人员', 
            priority: 'high',
            content: '从博兴街道、服务管家团队临时调配2名熟悉政策的业务骨干支援第二服务窗口',
            steps: [
              '今天下午16:00前完成人员调配',
              '明天上午9:00到岗并进行业务交接',
              '持续支援至政策咨询高峰期结束（预计2周）',
              '建立窗口互助机制，应对类似突发情况'
            ],
            expectedEffect: '日均接待能力提升40%，窗口服务压力缓解',
            responsible: '人力资源部门、博兴街道、服务管家',
            deadline: '今天16:00前完成'
          },
          { 
            title: '组织窗口人员紧急培训', 
            priority: 'high',
            content: '邀请财政局政策制定部门专家，对全体窗口人员进行政策集中培训',
            steps: [
              '今天下午联系财政局确定培训时间',
              '明天上午10:00-12:00集中培训',
              '制作政策要点卡片，人手一份',
              '建立内部答疑群，随时解决疑难问题'
            ],
            expectedEffect: '窗口人员政策掌握率达100%，咨询答复准确率提升',
            responsible: '培训部门、财政局、亦企服务港',
            deadline: '明天12:00前完成'
          },
        ],
      },
      2: { // 荣华街道：企业年报办理高峰
        problemOverview: '通过AI数据分析，发现荣华街道企业服务中心本周企业年报办理量激增89%，达156件，远超日常办理能力，存在积压风险。',
        detailedSituations: [
          {
            title: '年报办理量激增超预期',
            severity: 'high',
            description: '荣华街道企业服务中心本周（12月4-9日）接到企业年报办理申请156件，较上周增长89%，较去年同期增长127%。其中一般企业年报98件、个体工商户年报35件、外资企业年报18件、补报更正5件。',
            impact: '现有3名工作人员每日需处理30+件，已出现排号到下午才能办理的情况，企业满意度下降'
          },
          {
            title: '办理过程问题频发',
            severity: 'medium',
            description: '在已办理的89件中，发现23件材料不全需补充（占26%）、18件信息填写错误需更正（占20%）、12件电子签章问题（占13%）、9件系统操作不熟需协助（占10%）。',
            impact: '问题件占比达69%，导致往返次数增加，办理时间延长，窗口压力倍增'
          },
          {
            title: '重点企业年报未及时提醒',
            severity: 'medium',
            description: '辖区内28家重点企业（京东方、小米等）尚未办理年报，距离截止日期仅剩12天，存在逾期风险。',
            impact: '重点企业若逾期将影响企业信用，可能引发投诉和舆情'
          }
        ],
        rootCauses: [
          {
            category: '人员配置不足',
            reason: '荣华街道辖区企业数量1200+家，但仅配置3名年报办理人员，人均需服务400家企业',
            evidence: '年报高峰期人均日办理量达10件，远超标准5件/天的配置'
          },
          {
            category: '前期宣传引导缺失',
            reason: '年报期前未做好充分宣传和材料清单告知，企业准备不足导致问题频发',
            evidence: '69%的企业初次提交材料存在问题，需要补充或修改'
          },
          {
            category: '重点企业服务机制未落实',
            reason: '缺少对重点企业的主动提醒和上门服务，等待企业自主办理',
            evidence: '28家重点企业中仅有3家主动联系过，主动服务率仅11%'
          },
          {
            category: '应急预案不完善',
            reason: '对年报高峰期预判不足，未提前制定人员调配和延时服务预案',
            evidence: '高峰期持续5天才启动应急响应，反应滞后'
          }
        ],
        recommendations: [
          { 
            title: '紧急调配人员支援', 
            priority: 'high',
            content: '从博兴街道、产业社区调配2-3名业务骨干支援荣华街道，缓解年报办理压力',
            steps: [
              '今天下午15:00前确定支援人员名单',
              '明天上午10:00前到岗并完成业务交接',
              '支援期至本月底年报高峰期结束',
              '建立人员互助机制，应对未来类似情况'
            ],
            expectedEffect: '日均办理能力提升40%，企业等待时间缩短至1小时内',
            responsible: '人力资源部门、博兴街道、产业社区',
            deadline: '明天10:00前到位'
          },
          { 
            title: '开通重点企业绿色通道', 
            priority: 'high',
            content: '为28家未办理年报的重点企业开通绿色通道，提供预约服务和上门指导',
            steps: [
              '今天下午电话通知28家重点企业，了解办理安排',
              '提供预约办理服务，避免现场排队',
              '安排专人上门收取材料，提供一对一指导',
              '确保12天内全部重点企业完成年报'
            ],
            expectedEffect: '重点企业满意度提升，避免逾期风险',
            responsible: '服务管家团队、荣华街道企业服务中心',
            deadline: '立即执行'
          },
          { 
            title: '制作材料模板和指导手册', 
            priority: 'high',
            content: '针对高频问题（材料不全、信息错误、电子签章）制作标准模板和操作指南',
            steps: [
              '今天下午整理问题清单和解决方案',
              '明天上午制作填报模板和操作视频',
              '通过微信群、公众号推送给企业',
              '在服务大厅张贴操作指南'
            ],
            expectedEffect: '问题件占比从69%降低至30%，办理效率提升',
            responsible: '业务指导部门、荣华街道',
            deadline: '明天12:00前完成'
          },
          { 
            title: '延长窗口服务时间', 
            priority: 'medium',
            content: '临时延长窗口服务时间至晚上8点，周六日正常办公，方便企业办理',
            steps: [
              '今天发布延时服务公告',
              '明天起执行延时服务',
              '安排人员轮班值守',
              '持续至本月底年报期结束'
            ],
            expectedEffect: '覆盖更多企业时间需求，减少白天排队压力',
            responsible: '荣华街道企业服务中心',
            deadline: '明天起执行'
          },
        ],
      },
      3: { // 博兴街道：重点企业跟进
        problemOverview: '通过AI数据分析，发现博兴街道辖区内亦庄生物医药产业园3家重点企业连续2周未进行主动回访，企业反馈的问题未得到及时跟进，存在服务质量下降风险。',
        detailedSituations: [
          {
            title: '重点企业走访频次断崖下降',
            severity: 'high',
            description: '博兴街道本月对重点企业的主动走访次数仅2次，较上月的8次下降75%。辖区内亦庄生物医药产业园3家龙头企业（亦庄生物医药创新中心、北京生命科学园、康龙化成研发基地）已连续14天未走访。',
            impact: '企业认为服务关注度下降，满意度从92分降至72分，下降20分'
          },
          {
            title: '企业反馈问题悬而未决',
            severity: 'high',
            description: '亦庄生物医药创新中心反映的研发用地扩建审批进度慢（已反馈15天）、北京生命科学园提出的配套设施不完善问题（已反馈18天）、康龙化成的人才公寓需求（已反馈21天），均未得到实质性推进和反馈。',
            impact: '企业认为问题石沉大海，产生失望情绪，可能影响后续投资计划'
          },
          {
            title: '服务管家机制未有效落实',
            severity: 'medium',
            description: '虽已为重点企业配备服务管家，但实际联系频次低、问题响应慢。3家企业的服务管家本月平均联系次数不足1次/周，远低于制度要求的2次/周。',
            impact: '服务管家制度形同虚设，未能发挥应有作用'
          }
        ],
        rootCauses: [
          {
            category: '工作重心偏移',
            reason: '博兴街道近期将工作重点放在新企业招商上，对存量企业服务关注不够',
            evidence: '本月招商活动8场，但重点企业走访仅2次'
          },
          {
            category: '问题跟踪机制缺失',
            reason: '企业反馈的问题未建立台账和闭环机制，无人跟踪进展和反馈',
            evidence: '3个问题平均悬而未决18天，无任何进展通报'
          },
          {
            category: '服务考核不到位',
            reason: '对服务管家的走访频次和问题解决率缺乏有效考核，制度流于形式',
            evidence: '服务管家走访频次仅完成制度要求的40%'
          },
          {
            category: '部门协同不畅',
            reason: '企业问题涉及规划、建设、人社等多部门，缺乏统一协调推进机制',
            evidence: '3个问题中有2个涉及跨部门协同，协调难度大'
          }
        ],
        recommendations: [
          { 
            title: '立即开展企业专项走访', 
            priority: 'high',
            content: '服务管家团队本周内必须完成3家重点企业的上门走访，详细了解困难和需求',
            steps: [
              '今天下午制定走访计划和问题清单',
              '明天走访亦庄生物医药创新中心（重点了解用地扩建问题）',
              '周三走访北京生命科学园（重点了解配套设施问题）',
              '周四走访康龙化成研发基地（重点了解人才公寓需求）',
              '每次走访后当天整理企业需求清单'
            ],
            expectedEffect: '及时掌握企业真实需求，企业满意度回升至90分以上',
            responsible: '服务管家团队、博兴街道企业服务中心',
            deadline: '本周五前完成'
          },
          { 
            title: '建立企业问题跟踪台账', 
            priority: 'high',
            content: '将3家企业反馈的问题纳入专项台账，明确责任部门、解决时限和进展反馈机制',
            steps: [
              '今天建立企业问题跟踪台账Excel表',
              '逐项明确牵头部门、协办部门和完成时限',
              '建立每周通报制度，向企业反馈进展',
              '问题解决后及时销账并征求企业反馈'
            ],
            expectedEffect: '问题闭环管理，3个问题本月内必须有实质进展',
            responsible: '综合协调部门、相关业务部门',
            deadline: '明天前建立台账'
          },
          { 
            title: '启动跨部门专项协调', 
            priority: 'high',
            content: '针对用地扩建和配套设施问题，召集规划局、建设局等部门召开专题协调会',
            steps: [
              '今天下午发送协调会通知',
              '明天下午召开跨部门协调会',
              '逐项明确解决方案和时间表',
              '建立周报告制度，每周通报进展'
            ],
            expectedEffect: '打破部门壁垒，加快问题解决进度',
            responsible: '博兴街道综合协调办、规划局、建设局',
            deadline: '明天下午前完成会议'
          },
          { 
            title: '完善服务管家考核机制', 
            priority: 'medium',
            content: '加强对服务管家的走访频次、问题响应、企业满意度等指标的考核',
            steps: [
              '下周一前修订服务管家考核办法',
              '将走访频次、问题解决率纳入月度考核',
              '建立企业满意度反馈机制',
              '对不达标的服务管家进行约谈'
            ],
            expectedEffect: '服务管家制度落实到位，服务质量持续提升',
            responsible: '博兴街道、人事考核部门',
            deadline: '下周一前完成'
          },
        ],
      },
      4: { // 产业社区：创新券申请集中期
        problemOverview: '通过AI数据分析，发现产业社区本月创新券申请达45件，较上月增长29%，目前积压13件在材料审核环节，存在月底无法完成办理的风险。',
        detailedSituations: [
          {
            title: '创新券申请量持续攀升',
            severity: 'high',
            description: '产业社区6个月创新券申请量从8件增至45件，增长462%。本月45件申请中，生物医药18件、人工智能14件、集成电路8件、其他5件。按目前审批进度，预计月底还有15-20件无法完成。',
            impact: '企业创新券无法及时兑现，影响研发项目进度和企业对政策的信心'
          },
          {
            title: '审批环节严重积压',
            severity: 'high',
            description: '45件申请中，13件积压在材料审核环节（平均已等待2天）、8件等待专家评审（平均已等待3天）、6件在财政审批环节（平均已等待5天），总积压27件占比60%。',
            impact: '审批周期从正常10天延长至15-18天，企业频繁催办'
          },
          {
            title: '审核标准执行不统一',
            severity: 'medium',
            description: '材料审核环节23件中有13件被要求补充材料，占比57%。但补充要求五花八门，说明审核标准不统一，审核人员对政策理解存在偏差。',
            impact: '企业反复补充材料，增加负担和等待时间'
          }
        ],
        rootCauses: [
          {
            category: '申请量预判不足',
            reason: '未预见到创新券政策受欢迎程度，审批资源配置不足',
            evidence: '申请量6个月增长462%，但审核人员未增加'
          },
          {
            category: '审批流程效率低',
            reason: '材料审核、专家评审、财政审批三个环节串行进行，时间累加',
            evidence: '三环节平均耗时2天+3天+5天=10天，且存在等待时间'
          },
          {
            category: '审核标准不明确',
            reason: '未制定统一的材料审核清单和标准，审核人员自由裁量度大',
            evidence: '57%的申请被要求补充材料，标准不一'
          },
          {
            category: '专家资源紧张',
            reason: '专家评审环节依赖外聘专家，约时间难、评审慢',
            evidence: '8件等待评审的申请，专家评审约定时间需3-5天'
          }
        ],
        recommendations: [
          { 
            title: '紧急清理积压件', 
            priority: 'high',
            content: '安排2名审核人员专职负责创新券材料审核，3天内清理完13件积压申请',
            steps: [
              '今天下午抽调2名业务骨干专门负责',
              '明天完成至少6件材料审核',
              '后天完成剩余7件材料审核',
              '建立每日审核进度通报机制'
            ],
            expectedEffect: '材料审核环节清零积压，审核周期从2天缩短至当天',
            responsible: '产业社区审核部门',
            deadline: '3天内完成'
          },
          { 
            title: '集中组织专家评审', 
            priority: 'high',
            content: '联系3-5名技术专家，安排下周二集中评审，一次性解决积压的8件评审申请',
            steps: [
              '今天下午联系并确认专家时间',
              '明天准备评审材料并发送给专家',
              '下周二上午9:00-12:00集中评审',
              '下周二下午完成评审意见整理'
            ],
            expectedEffect: '专家评审环节一次性清零，评审周期从3-5天缩短至1天',
            responsible: '科技创新部门、专家库',
            deadline: '下周二前完成'
          },
          { 
            title: '建立审核标准化清单', 
            priority: 'high',
            content: '制定创新券材料审核标准化清单，统一审核标准，减少补充材料次数',
            steps: [
              '明天整理现有审核要求，统一标准',
              '制作《创新券申请材料清单及范例》',
              '下周一对审核人员进行培训',
              '向企业公开发布材料清单'
            ],
            expectedEffect: '补充材料率从57%降至20%，企业一次性通过率提升',
            responsible: '业务指导部门、产业社区',
            deadline: '下周一前完成'
          },
          { 
            title: '协调财政部门加快审批', 
            priority: 'medium',
            content: '与财政局沟通，建立创新券审批绿色通道，缩短财政审批时间',
            steps: [
              '本周内与财政局开会沟通',
              '请求将创新券审批纳入重点保障',
              '建立每周送审机制，批量处理',
              '争取审批时间从5天缩短至2天'
            ],
            expectedEffect: '财政审批环节提速60%，整体审批周期缩短',
            responsible: '产业社区、财政局',
            deadline: '本周内完成沟通'
          },
        ],
      },
    };

    return detailDataMap[task.id] || detailDataMap[1];
  };

  const detailData = getDetailData();

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
        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <i className="fa-solid fa-file-lines text-xl"></i>
                <h2 className="text-2xl font-bold">任务详情</h2>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' : 
                  task.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                }`}>
                  {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500">
                  {task.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{task.title}</h3>
              <p className="text-sm text-blue-100">{task.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors ml-4"
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* 内容区 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* AI诊断概述 */}
          {detailData.problemOverview && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 shadow-md border-l-4 border-blue-500 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-robot text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-800 mb-2">AI智能诊断</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{detailData.problemOverview}</p>
                </div>
              </div>
            </div>
          )}

          {/* 详细情况说明 */}
          {detailData.detailedSituations && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fa-solid fa-exclamation-circle text-red-600 mr-2"></i>
                突出问题详情
              </h4>
              <div className="space-y-4">
                {detailData.detailedSituations.map((situation: any, index: number) => (
                  <div key={index} className={`bg-white rounded-xl p-5 shadow-md border-l-4 ${
                    situation.severity === 'high' ? 'border-red-500' : 
                    situation.severity === 'medium' ? 'border-orange-500' : 'border-yellow-500'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <h5 className="text-base font-semibold text-gray-800 flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          situation.severity === 'high' ? 'bg-red-500' : 
                          situation.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}></span>
                        {situation.title}
                      </h5>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        situation.severity === 'high' ? 'bg-red-100 text-red-700' : 
                        situation.severity === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {situation.severity === 'high' ? '高风险' : situation.severity === 'medium' ? '中风险' : '低风险'}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700 leading-relaxed">{situation.description}</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <i className="fa-solid fa-triangle-exclamation text-red-600 mt-0.5"></i>
                        <div>
                          <div className="text-xs font-semibold text-red-700 mb-1">影响分析</div>
                          <p className="text-xs text-red-700">{situation.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 原因分析 */}
          {detailData.rootCauses && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fa-solid fa-search text-orange-600 mr-2"></i>
                问题根源分析
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailData.rootCauses.map((cause: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-lightbulb text-orange-600"></i>
                      </div>
                      <h5 className="font-semibold text-gray-800">{cause.category}</h5>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-2">
                      <p className="text-sm text-gray-700">{cause.reason}</p>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-gray-600">
                      <i className="fa-solid fa-chart-bar text-blue-600 mt-0.5"></i>
                      <p>数据依据：{cause.evidence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailData.issuesList && (
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fa-solid fa-exclamation-triangle text-orange-600 mr-2"></i>
                常见问题分析
              </h4>
              <div className="space-y-2">
                {detailData.issuesList.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-800">{item.issue}</span>
                      <span className="text-xs text-orange-600">占比 {item.percentage}%</span>
                    </div>
                    <span className="text-sm font-bold text-orange-700">{item.count}件</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailData.enterpriseList && (
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fa-solid fa-building text-blue-600 mr-2"></i>
                重点企业清单
              </h4>
              <div className="space-y-3">
                {detailData.enterpriseList.map((item: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    item.urgency === 'high' ? 'bg-red-50 border-red-300' : 'bg-blue-50 border-blue-300'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.urgency === 'high' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        {item.urgency === 'high' ? '紧急' : '一般'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="text-xs text-gray-500">上次走访：</span>{item.lastVisit}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      <span className="text-xs text-gray-500">反馈问题：</span>{item.issues}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailData.pendingTasks && (
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fa-solid fa-hourglass-half text-purple-600 mr-2"></i>
                待办任务分布
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {detailData.pendingTasks.map((item: any, index: number) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 mb-1">{item.stage}</div>
                    <div className="text-2xl font-bold text-purple-900">{item.count}</div>
                    <div className="text-xs text-gray-600 mt-1">平均耗时：{item.avgTime}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI处理建议 */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fa-solid fa-lightbulb-on text-green-600 mr-2"></i>
              AI智能处理建议
            </h4>
            <div className="space-y-4">
              {detailData.recommendations.map((rec: any, index: number) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-md border-l-4 border-green-500">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        rec.priority === 'high' ? 'bg-red-100' : 
                        rec.priority === 'medium' ? 'bg-orange-100' : 'bg-green-100'
                      }`}>
                        <i className={`fa-solid fa-flag ${
                          rec.priority === 'high' ? 'text-red-600' : 
                          rec.priority === 'medium' ? 'text-orange-600' : 'text-green-600'
                        }`}></i>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 text-base">{rec.title}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-700' : 
                          rec.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {rec.priority === 'high' ? '高优先级' : rec.priority === 'medium' ? '中优先级' : '低优先级'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      <i className="fa-solid fa-clock mr-1"></i>
                      {rec.deadline}
                    </span>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                    <div className="text-xs font-semibold text-blue-800 mb-2">建议措施</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{rec.content}</p>
                  </div>

                  {rec.steps && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <div className="text-xs font-semibold text-gray-700 mb-2">具体执行步骤</div>
                      <div className="space-y-2">
                        {rec.steps.map((step: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-gray-700 flex-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-xs font-semibold text-green-700 mb-1">
                        <i className="fa-solid fa-chart-line mr-1"></i>
                        预期效果
                      </div>
                      <p className="text-xs text-green-700">{rec.expectedEffect}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="text-xs font-semibold text-purple-700 mb-1">
                        <i className="fa-solid fa-users mr-1"></i>
                        责任部门
                      </div>
                      <p className="text-xs text-purple-700">{rec.responsible}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部操作按钮 */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <i className="fa-solid fa-clock mr-2"></i>
            截止时间：{task.deadline} | 影响范围：{task.impact}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
            >
              关闭
            </button>
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
              <i className="fa-solid fa-check mr-2"></i>
              标记完成
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-md">
              <i className="fa-solid fa-share mr-2"></i>
              分配任务
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

