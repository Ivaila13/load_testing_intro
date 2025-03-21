import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // Рязко качваме натоварването до 100 потребителя
    { duration: '20s', target: 100 }, // Задържаме натоварването за кратко
    { duration: '10s', target: 0 },   // Внезапно го намаляваме
  ],
};

export default function () {
  const res = http.get('http://localhost:8080/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is under 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
