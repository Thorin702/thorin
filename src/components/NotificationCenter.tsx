import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const notificationTypes = {
  info: { icon: 'fa-info-circle', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  warning: { icon: 'fa-exclamation-triangle', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  success: { icon: 'fa-check-circle', color: 'text-green-400', bg: 'bg-green-500/10' },
  error: { icon: 'fa-times-circle', color: 'text-red-400', bg: 'bg-red-500/10' }
};

const priorityColors = {
  low: 'border-green-500/30',
  medium: 'border-yellow-500/30',
  high: 'border-orange-500/30',
  urgent: 'border-red-500/30'
};

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate real-time notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: '投诉处理完成',
        message: '产品质量投诉 #2024001 已成功解决，客户满意度评分：5星',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'warning',
        title: '处理时效预警',
        message: '服务态度投诉 #2024002 即将超时，请尽快处理',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        priority: 'urgent'
      },
      {
        id: '3',
        type: 'info',
        title: '新投诉提交',
        message: '收到新的交付延迟投诉，已自动分配给技术部门',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
        priority: 'medium'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);

    // Simulate incoming notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? 'warning' : 'info',
        title: '实时更新',
        message: `系统检测到新的${Math.random() > 0.5 ? '投诉' : '处理进度'}更新`,
        timestamp: new Date(),
        read: false,
        priority: Math.random() > 0.8 ? 'urgent' : 'medium'
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      setUnreadCount(prev => prev + 1);

      // Show toast for urgent notifications
      if (newNotification.priority === 'urgent') {
        toast.error(newNotification.title, {
          description: newNotification.message,
          duration: 5000,
        });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <i className="fa-solid fa-bell text-xl"></i>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-12 w-96 bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <h3 className="text-lg font-semibold text-white">通知中心</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    全部已读
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <i className="fa-solid fa-bell-slash text-3xl mb-2"></i>
                  <p>暂无通知</p>
                </div>
              ) : (
                <div className="p-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`relative p-3 rounded-lg mb-2 border-l-4 transition-all hover:bg-gray-800/50 ${
                        notification.read ? 'opacity-60' : ''
                      } ${priorityColors[notification.priority]}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`text-lg ${notificationTypes[notification.type].color}`}>
                          <i className={notificationTypes[notification.type].icon}></i>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-white truncate">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-400">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          {!notification.read && (
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                标记已读
                              </button>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <i className="fa-solid fa-times text-xs"></i>
                        </button>
                      </div>

                      {/* Priority indicator */}
                      {notification.priority === 'urgent' && (
                        <div className="absolute top-2 right-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-700/50 bg-gray-800/30 rounded-b-xl">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>共 {notifications.length} 条通知</span>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  查看全部
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 