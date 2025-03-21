import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 50 }, // Постепенно увеличаваме натоварването
    { duration: '3m', target: 50 }, // Поддържаме стабилно натоварване
    { duration: '1m', target: 0 },  // Постепенно намаляваме натоварването
  ],
};

export default function () {
  let res = http.get('http://localhost:8080/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}

