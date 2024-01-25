import { useEffect } from 'react';
import mitt from 'mitt';

// 创建一个事件总线
const bus = mitt();

// 自定义 hooks，用于订阅和发布事件
export function useEventBus() {
    // 订阅事件
    const on = (eventName, handler) => {
        useEffect(() => {
            bus.on(eventName, handler);
            return () => {
                bus.off(eventName, handler);
            };
        }, [eventName, handler]);
    };
    // 发布事件
    const emit = (eventName, data) => {
        bus.emit(eventName, data);
    };

    return { on, emit };
}