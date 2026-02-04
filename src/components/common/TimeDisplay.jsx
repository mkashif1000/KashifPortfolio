import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin } from 'react-icons/fi';
import './TimeDisplay.css';

const TimeDisplay = () => {
    const [timeData, setTimeData] = useState({
        pkTime: '',
        localTime: '',
        userTimeZone: ''
    });

    useEffect(() => {
        // Get user's time zone
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const updateTime = () => {
            const now = new Date();

            // Format Pakistan Time
            const pkTime = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'Asia/Karachi'
            }).format(now);

            // Format Local Time
            const localTime = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: userTimeZone
            }).format(now);

            setTimeData({
                pkTime,
                localTime,
                userTimeZone: userTimeZone.replace('_', ' ')
            });
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="time-display-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
            <div className="time-card glass-panel">
                <div className="time-row pk-time">
                    <div className="time-label">
                        <FiMapPin className="time-icon" />
                        <span>PAKISTAN (PKT)</span>
                    </div>
                    <div className="time-value">{timeData.pkTime}</div>
                </div>

                <div className="time-divider"></div>

                <div className="time-row local-time">
                    <div className="time-label">
                        <FiClock className="time-icon" />
                        <span>YOUR TIME ({timeData.userTimeZone.split('/')[1] || 'LOCAL'})</span>
                    </div>
                    <div className="time-value">{timeData.localTime}</div>
                </div>
            </div>
        </motion.div>
    );
};

export default TimeDisplay;
