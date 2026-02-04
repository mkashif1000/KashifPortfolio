import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
            <div className="time-pill">
                <div className="time-group">
                    <span className="time-label">PKT</span>
                    <span className="time-value">{timeData.pkTime}</span>
                </div>

                <div className="time-divider"></div>

                <div className="time-group">
                    <span className="time-label">LOC</span>
                    <span className="time-value">{timeData.localTime}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default TimeDisplay;
