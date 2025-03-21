import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },   // Започваме с 50 виртуални потребителя
    { duration: '30s', target: 100 },  // Увеличаваме на 100
    { duration: '30s', target: 200 },  // Още по-голямо натоварване - 200
    { duration: '30s', target: 300 },  // Продължаваме до 300
    { duration: '30s', target: 400 },  // Още по-нагоре
    { duration: '30s', target: 500 },  // Тук проверяваме дали ще има срив
    { duration: '1m', target: 0 },     // Възстановяваме натоварването
  ],
};

export default function () {
  const res = http.get('http://localhost:8080/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is under 1s': (r) => r.timings.duration < 1000,
  });
  sleep(1);
}
