import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 }, // Вдига натоварването до 50 виртуални потребителя за 1 минута
    { duration: '3m', target: 50 }, // Поддържа 50 виртуални потребителя за 3 минути
    { duration: '1m', target: 0 },  // Намалява натоварването до 0 за 1 минута
  ],
};

export default function () {
  const res = http.get('http://localhost:8080/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is under 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1); // Изчаква 1 секунда преди следващата заявка
}
