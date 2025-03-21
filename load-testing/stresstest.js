import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Бавно увеличаваме до 10 виртуални потребителя
    { duration: '1m', target: 50 },   // Бързо качваме до 50 виртуални потребителя
    { duration: '3m', target: 100 },  // Държим натоварване от 100 потребителя за 3 минути
    { duration: '1m', target: 0 },    // Рязко спадаме до 0
  ],
};

export default function () {
  const res = http.get('http://localhost:8080/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is under 1000ms': (r) => r.timings.duration < 1000,
  });
  sleep(1);
}
