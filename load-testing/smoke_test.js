import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1, // Само 1 виртуален потребител
    duration: '10s', // Изпълнява се за 10 секунди
};

export default function () {
    let res = http.get('http://localhost:8080/');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}
