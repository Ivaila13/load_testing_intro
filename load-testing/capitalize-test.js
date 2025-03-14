import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    // Дефинираме два различни сценария с различен брой виртуални потребители и време за изпълнение
    scenarios: {
        scenario_1: {
            executor: 'constant-vus', // Постоянен брой виртуални потребители
            vus: 5,  // 5 виртуални потребителя
            duration: '10s', // Тестът ще продължи 10 секунди
        },
        scenario_2: {
            executor: 'constant-vus',
            vus: 10, // 10 виртуални потребителя
            duration: '20s', // Тестът ще продължи 20 секунди
        },
    },
};

export default function () {
    const url = 'http://localhost:8080/capitalize'; // Замени с твоето приложение и endpoint
    const payload = JSON.stringify({
        text: 'hello world',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Изпращане на POST заявка
    const res = http.post(url, payload, params);

    // Проверки
    check(res, {
        "status is 200": (r) => r.status === 200, // Проверка дали статусът е 200
        "response time is under 500ms": (r) => r.timings.duration < 500, // Проверка за време на отговор
    });

    // Изчакване 1 секунда преди следващата заявка
    sleep(1);
}
``